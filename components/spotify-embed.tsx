"use client"

interface SpotifyEmbedProps {
  url: string
  width: string | number
  height: string | number
}

export function SpotifyEmbed({ url, width, height }: SpotifyEmbedProps) {
  // Convert regular Spotify URL to embed URL
  const embedUrl = url.replace("spotify.com", "spotify.com/embed")

  return (
    <iframe
      src={embedUrl}
      width={width}
      height={height}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      style={{ borderRadius: "12px" }}
      title="Spotify Embed"
    ></iframe>
  )
}
