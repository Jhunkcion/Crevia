const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

export function getStrapiMedia(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `${STRAPI_URL}${url}`;
  return url;
}

export async function fetchStrapi<T>(endpoint: string): Promise<T | null> {
  try {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(`${STRAPI_URL}${cleanEndpoint}`, { headers });
    if (!response.ok) {
      console.warn(`Strapi fetch error (${response.status}):`, response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn(`Failed to connect to Strapi at ${STRAPI_URL}:`, error);
    return null;
  }
}

export interface StrapiTeamMember {
  id: number;
  documentId?: string;
  name: string;
  role: string;
  division: 'studio' | 'tech';
  bio?: string;
  photo?: string;
  works?: string[];
  socials?: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
    [key: string]: string | undefined;
  };
  order?: number;
}

export interface StrapiProject {
  id: number;
  documentId?: string;
  title: string;
  client?: string;
  excerpt?: string;
  layoutClass?: string;
  image?: string;
  order?: number;
}

export async function fetchTeamMembers(): Promise<StrapiTeamMember[] | null> {
  const result = await fetchStrapi<{ data: StrapiTeamMember[] }>(
    '/api/team-members?sort=id:asc'
  );
  if (!result || !Array.isArray(result.data)) return null;

  return result.data
    .map((item) => ({
    ...item,
    photo: getStrapiMedia(item.photo),
    works: Array.isArray(item.works)
      ? item.works.map((w) => getStrapiMedia(w))
      : ['/project-bg.png', '/project-cover.png'],
  }));
}

export async function fetchProjects(): Promise<StrapiProject[] | null> {
  const result = await fetchStrapi<{ data: StrapiProject[] }>(
    '/api/projects?sort=order:asc'
  );
  if (!result || !Array.isArray(result.data)) return null;

  return result.data
    .map((item) => ({
    ...item,
    image: getStrapiMedia(item.image) || '/project-bg.png',
  }));
}
