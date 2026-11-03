import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        [id$="-hint"] {
          white-space: pre-line !important;
          line-height: 1.6 !important;
        }
      `;
      document.head.appendChild(style);
    }
  },
};
