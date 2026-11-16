import type { ImageMetadata } from 'astro';
import galleryData from '../data/gallery.json';

export interface GalleryEntry {
  file: string;
  title: string;
  caption: string;
  category: string;
  width: number;
  height: number;
  home: boolean;
}

export interface Photo extends GalleryEntry {
  image: ImageMetadata;
}

export const categories = [
  { id: 'all', label: 'All photos' },
  { id: 'spawn', label: 'Spawn' },
  { id: 'builds', label: 'Builds & bases' },
  { id: 'border', label: 'World border' },
  { id: 'mapart', label: 'Map art' },
] as const;

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/gallery/*.{png,webp}', {
  eager: true,
});

export const gallery: Photo[] = (galleryData as GalleryEntry[]).map((photo) => {
  const image = images[`../assets/gallery/${photo.file}`]?.default;

  if (!image) {
    throw new Error(`Missing gallery image: ${photo.file}`);
  }

  return { ...photo, image };
});

export const homePhotos = gallery.filter((photo) => photo.home);

export function categoryName(category: string) {
  return categories.find(({ id }) => id === category)?.label ?? category;
}

export function categoryCount(category: string) {
  return category === 'all'
    ? gallery.length
    : gallery.filter((photo) => photo.category === category).length;
}
