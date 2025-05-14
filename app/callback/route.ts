import { NextResponse } from 'next/server';
import { SpotifyService } from '@/lib/spotify-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('Spotify auth error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/playlists/survey?error=${error}`
    );
  }

  if (!code) {
    console.error('No code received from Spotify');
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/playlists/survey?error=no_code`
    );
  }

  try {
    const data = await SpotifyService.getAccessToken(code);

    // Store the tokens in cookies or session
    const redirectResponse = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/playlists/survey`
    );

    // Set cookies with appropriate security settings based on environment
    const isProduction = process.env.NODE_ENV === 'production';
    
    redirectResponse.cookies.set('spotify_access_token', data.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: data.expires_in,
      path: '/',
    });

    redirectResponse.cookies.set('spotify_refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return redirectResponse;
  } catch (error) {
    console.error('Error in Spotify callback:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/playlists/survey?error=auth_failed`
    );
  }
} 