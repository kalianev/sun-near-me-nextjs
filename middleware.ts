import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SpotifyService } from '@/lib/spotify-api';

export async function middleware(request: NextRequest) {
  // Only handle API routes that need Spotify authentication
  if (!request.nextUrl.pathname.startsWith('/api/spotify')) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('spotify_access_token');
  const refreshToken = request.cookies.get('spotify_refresh_token');

  // If no tokens exist, redirect to survey page
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/playlists/survey', request.url));
  }

  // If we have a refresh token but no access token, try to refresh
  if (!accessToken && refreshToken) {
    try {
      const data = await SpotifyService.refreshAccessToken(refreshToken.value);
      
      const response = NextResponse.next();
      
      // Set the new access token
      response.cookies.set('spotify_access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: data.expires_in,
        path: '/',
      });

      // If we got a new refresh token, update it
      if (data.refresh_token) {
        response.cookies.set('spotify_refresh_token', data.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });
      }

      return response;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // If refresh fails, clear cookies and redirect to survey
      const response = NextResponse.redirect(new URL('/playlists/survey', request.url));
      response.cookies.delete('spotify_access_token');
      response.cookies.delete('spotify_refresh_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/spotify/:path*',
}; 