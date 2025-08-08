// File: src/app/artists/components/artists.ts
export interface Artist {
  id: number
  name: string
  bio: string
}

export const artists: Artist[] = [
  {
    id: 1,
    name: "Lorem Artisan",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    name: "Ipsum Creator",
    bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    name: "Dolor Designer",
    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
]
