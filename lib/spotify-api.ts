import { SpotifyApi, AccessToken } from '@spotify/web-api-ts-sdk';
import { cookies } from 'next/headers';

export interface SpotifyCredentials {
  clientId: string;
  clientSecret: string;
}

export interface PlaylistGenerationParams {
  timeOfDay: string;
  mood: string;
  environment: string;
  musicType: string;
  goal: string;
}

export class SpotifyService {
  private sdk: SpotifyApi | null = null;
  private accessToken: AccessToken | null = null;

  constructor(credentials: SpotifyCredentials, accessToken?: AccessToken) {
    if (accessToken) {
      this.accessToken = accessToken;
      this.sdk = SpotifyApi.withAccessToken(credentials.clientId, accessToken);
    } else {
      this.sdk = SpotifyApi.withClientCredentials(
        credentials.clientId,
        credentials.clientSecret
      );
    }
  }

  static getAuthUrl() {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scopes = [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-private',
      'user-read-email',
    ];

    const params = new URLSearchParams({
      client_id: clientId!,
      response_type: 'code',
      redirect_uri: redirectUri!,
      scope: scopes.join(' '),
      show_dialog: 'true', // Force user to approve the app
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  static async getAccessToken(code: string) {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      throw new Error(error.error_description || 'Failed to get access token');
    }

    return tokenResponse.json();
  }

  static async refreshAccessToken(refreshToken: string) {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      throw new Error(error.error_description || 'Failed to refresh access token');
    }

    return tokenResponse.json();
  }

  private getSeedGenres(params: PlaylistGenerationParams): string[] {
    const genreMap: Record<string, string[]> = {
      Sunrise: ['ambient', 'classical', 'new-age'],
      Morning: ['indie-pop', 'folk', 'acoustic'],
      Afternoon: ['indie', 'alternative', 'pop'],
      Sunset: ['chill', 'indie-folk', 'ambient'],
      Night: ['ambient', 'electronic', 'chill'],
    };

    const moodMap: Record<string, string[]> = {
      Energetic: ['dance', 'electronic', 'pop'],
      Calm: ['ambient', 'chill', 'classical'],
      Reflective: ['indie-folk', 'ambient', 'classical'],
      Playful: ['indie-pop', 'pop', 'dance'],
      Focused: ['ambient', 'classical', 'electronic'],
    };

    return [...genreMap[params.timeOfDay], ...moodMap[params.mood]];
  }

  private getTargetAttributes(params: PlaylistGenerationParams) {
    const attributes: Record<string, number> = {
      energy: 0.5,
      valence: 0.5,
      danceability: 0.5,
      instrumentalness: 0.5,
    };

    // Adjust energy based on time of day and mood
    if (params.timeOfDay === 'Morning' || params.mood === 'Energetic') {
      attributes.energy = 0.8;
    } else if (params.timeOfDay === 'Night' || params.mood === 'Calm') {
      attributes.energy = 0.3;
    }

    // Adjust valence (positivity) based on mood
    if (params.mood === 'Playful' || params.mood === 'Energetic') {
      attributes.valence = 0.8;
    } else if (params.mood === 'Reflective' || params.mood === 'Calm') {
      attributes.valence = 0.4;
    }

    // Adjust danceability based on goal
    if (params.goal === 'Dance') {
      attributes.danceability = 0.8;
    } else if (params.goal === 'Meditate') {
      attributes.danceability = 0.2;
    }

    // Adjust instrumentalness based on music type preference
    if (params.musicType === 'Mostly Instrumental') {
      attributes.instrumentalness = 0.8;
    } else if (params.musicType === 'Mostly Lyrics') {
      attributes.instrumentalness = 0.2;
    }

    return attributes;
  }

  async generatePlaylist(params: PlaylistGenerationParams) {
    if (!this.sdk) {
      throw new Error('Spotify SDK not initialized');
    }

    if (!this.accessToken) {
      throw new Error('Authentication required');
    }

    try {
      const seedGenres = this.getSeedGenres(params);
      const targetAttributes = this.getTargetAttributes(params);

      // Get recommendations based on parameters
      const recommendations = await this.sdk.recommendations.get({
        seed_genres: seedGenres.slice(0, 5),
        target_energy: targetAttributes.energy,
        target_valence: targetAttributes.valence,
        target_danceability: targetAttributes.danceability,
        target_instrumentalness: targetAttributes.instrumentalness,
        limit: 20,
      });

      // Get current user's profile
      const user = await this.sdk.currentUser.profile();

      // Create a new playlist
      const playlist = await this.sdk.playlists.createPlaylist(
        user.id,
        {
          name: 'Sun Near Me Playlist',
          description: `A personalized playlist for ${params.timeOfDay.toLowerCase()} ${params.mood.toLowerCase()} vibes`,
          public: false,
        }
      );

      // Add tracks to the playlist
      const trackUris = recommendations.tracks.map(track => track.uri);
      await this.sdk.playlists.addItemsToPlaylist(playlist.id, trackUris);

      return {
        id: playlist.id,
        url: playlist.external_urls.spotify,
        tracks: recommendations.tracks,
      };
    } catch (error) {
      console.error('Error generating playlist:', error);
      throw error;
    }
  }
} 