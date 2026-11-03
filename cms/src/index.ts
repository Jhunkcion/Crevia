import type { Core } from '@strapi/strapi';

const INITIAL_PROJECTS = [
  {
    title: 'Brand Identity',
    client: 'North Studio',
    image: '/project-bg.png',
    excerpt: 'A playful, modern identity designed to make the brand feel memorable and premium.',
    layoutClass: 'wide_2x1' as const,
    order: 1,
  },
  {
    title: 'Campaign Launch',
    client: 'Aster Labs',
    image: '/project-bg.png',
    excerpt: 'A launch campaign focused on storytelling, motion, and audience engagement.',
    layoutClass: 'standard_1x1' as const,
    order: 2,
  },
  {
    title: 'Web Experience',
    client: 'Sora Creative',
    image: '/project-bg.png',
    excerpt: 'A polished digital experience built to turn first-time visitors into lasting clients.',
    layoutClass: 'tall_1x2' as const,
    order: 3,
  },
  {
    title: 'Product Story',
    client: 'Morrow & Co.',
    image: '/project-bg.png',
    excerpt: 'A concise product narrative that helps complex offerings feel clear and confident.',
    layoutClass: 'wide_2x1' as const,
    order: 4,
  },
  {
    title: 'Launch System',
    client: 'Fieldhouse',
    image: '/project-bg.png',
    excerpt: 'A structured rollout system that keeps strategy, design, and delivery aligned.',
    layoutClass: 'standard_1x1' as const,
    order: 5,
  },
  {
    title: 'Visual Direction',
    client: 'Luma Collective',
    image: '/project-bg.png',
    excerpt: 'A visual language built to feel bold, warm, and unmistakably contemporary.',
    layoutClass: 'standard_1x1' as const,
    order: 6,
  },
];

const INITIAL_TEAM_MEMBERS = [
  {
    name: 'John Doe',
    role: 'Creative Designer',
    division: 'studio' as const,
    bio: 'Specializing in high-concept brand identities and immersive cinematic narratives. Crafting award-winning visual experiences that merge pristine modern aesthetics with emotional storytelling.',
    photo: '/talent-john.png',
    works: ['/project-bg.png', '/project-cover.png'],
    socials: {
      instagram: 'https://instagram.com/crevia',
      tiktok: 'https://tiktok.com/@crevia',
      facebook: 'https://facebook.com/crevia',
    },
    order: 1,
  },
  {
    name: 'Jane Doe',
    role: 'Art Director',
    division: 'studio' as const,
    bio: 'Art director shaping visual systems that connect culture and people. Leading multi-disciplinary brand transformations across print, digital, and spatial media.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    works: ['/project-cover.png', '/project-bg.png'],
    socials: {
      instagram: 'https://instagram.com/crevia',
      tiktok: 'https://tiktok.com/@crevia',
      facebook: 'https://facebook.com/crevia',
    },
    order: 2,
  },
  {
    name: 'Alex Doe',
    role: 'Motion Designer',
    division: 'studio' as const,
    bio: 'Motion designer combining typography, rhythm, and kinetic storytelling to create mesmerizing motion languages for leading global brands.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    works: ['/project-bg.png', '/project-cover.png'],
    socials: {
      instagram: 'https://instagram.com/crevia',
      tiktok: 'https://tiktok.com/@crevia',
      facebook: 'https://facebook.com/crevia',
    },
    order: 3,
  },
  {
    name: 'Mike Doe',
    role: 'Visual Designer',
    division: 'studio' as const,
    bio: 'Visual designer working across identity systems and interactive digital products with an uncompromising eye for minimalist aesthetics.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    works: ['/project-cover.png', '/project-bg.png'],
    socials: {
      instagram: 'https://instagram.com/crevia',
      tiktok: 'https://tiktok.com/@crevia',
      facebook: 'https://facebook.com/crevia',
    },
    order: 4,
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Creative Technologist',
    division: 'tech' as const,
    bio: 'Architecting interactive digital products at the intersection of creative code and contemporary design systems.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    works: ['/project-bg.png', '/project-cover.png'],
    socials: {
      instagram: 'https://instagram.com/crevia',
      tiktok: 'https://tiktok.com/@crevia',
      facebook: 'https://facebook.com/crevia',
    },
    order: 5,
  },
  {
    name: 'David Kim',
    role: 'Senior Full-Stack Engineer',
    division: 'tech' as const,
    bio: 'Building robust, scalable architectures and real-time digital ecosystems for enterprise and creative platforms.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    works: ['/project-cover.png', '/project-bg.png'],
    socials: {
      instagram: 'https://instagram.com/crevia',
      tiktok: 'https://tiktok.com/@crevia',
      facebook: 'https://facebook.com/crevia',
    },
    order: 6,
  },
  {
    name: 'Elena Rostova',
    role: 'Creative Developer',
    division: 'tech' as const,
    bio: 'WebGL, shader programming, and responsive 3D web experiences delivering breakthrough visual performance.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    works: ['/project-bg.png', '/project-cover.png'],
    socials: {
      instagram: 'https://instagram.com/crevia',
      tiktok: 'https://tiktok.com/@crevia',
      facebook: 'https://facebook.com/crevia',
    },
    order: 7,
  },
  {
    name: 'Marcus Lee',
    role: 'Systems & Infrastructure Lead',
    division: 'tech' as const,
    bio: 'Specializing in cloud infrastructure, performance optimization, and distributed systems architecture.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    works: ['/project-cover.png', '/project-bg.png'],
    socials: {
      instagram: 'https://instagram.com/crevia',
      tiktok: 'https://tiktok.com/@crevia',
      facebook: 'https://facebook.com/crevia',
    },
    order: 8,
  },
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Seed Projects if none exist
    try {
      const projectCount = await strapi.documents('api::project.project').count({});
      if (projectCount === 0) {
        strapi.log.info('Seeding initial Crevia projects into SQLite database...');
        for (const item of INITIAL_PROJECTS) {
          await strapi.documents('api::project.project').create({
            data: item,
            status: 'published',
          });
        }
        strapi.log.info(`Seeded ${INITIAL_PROJECTS.length} projects successfully.`);
      }
    } catch (error) {
      strapi.log.warn('Could not seed projects:', error);
    }

    // 2. Seed Team Members if none exist
    try {
      const memberCount = await strapi.documents('api::team-member.team-member').count({});
      if (memberCount === 0) {
        strapi.log.info('Seeding initial Crevia team members into SQLite database...');
        for (const item of INITIAL_TEAM_MEMBERS) {
          await strapi.documents('api::team-member.team-member').create({
            data: item,
            status: 'published',
          });
        }
        strapi.log.info(`Seeded ${INITIAL_TEAM_MEMBERS.length} team members successfully.`);
      }
    } catch (error) {
      strapi.log.warn('Could not seed team members:', error);
    }

    // 3. Configure Public read permissions for API access
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const publicActions = [
          'api::project.project.find',
          'api::project.project.findOne',
          'api::team-member.team-member.find',
          'api::team-member.team-member.findOne',
        ];

        for (const action of publicActions) {
          const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { action, role: publicRole.id },
          });

          if (!existing) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: { action, role: publicRole.id },
            });
          }
        }
      }
    } catch (error) {
      strapi.log.warn('Could not set public permissions:', error);
    }
  },
};
