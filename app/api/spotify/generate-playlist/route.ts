import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SpotifyService } from '@/lib/spotify-api';
import { AccessToken } from '@spotify/web-api-ts-sdk';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('spotify_access_token');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const spotifyService = new SpotifyService(
      {
        clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!,
      },
      {
        access_token: accessToken.value,
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: '',
      } as AccessToken
    );

    const playlist = await spotifyService.generatePlaylist(body);

    return NextResponse.json(playlist);
  } catch (error) {
    console.error('Error generating playlist:', error);
    return NextResponse.json(
      { error: 'Failed to generate playlist' },
      { status: 500 }
    );
  }
} 