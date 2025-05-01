export interface Author {
  name: string
  avatar: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  author: Author
  categories: string[]
  content: string
}

export interface Playlist {
  id: string
  title: string
  description: string
  coverImage: string
  spotifyUrl: string
  tags: string[]
}
