import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,

  typescript: {
    strict: true,
  },

  // autoImports: {
  //   imports: [
  //     {
  //       from: 'vue-query',
  //       name: 'useQuery, useInfiniteQuery',
  //     },
  //   ],
  // },
});
