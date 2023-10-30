import { defineConfig } from 'orval';

export default defineConfig({
  guide: {
    input: {
      target: './modules/api/openapi.json',
      filters: {
        tags: [
          'accounts',
        ],
      },
    },
    output: {
      mode: 'split',
      target: './openapi-config',
      schemas: './openapi-schemas',
      workspace: './modules/api/',
      indexFiles: true,
      client: 'react-query',
      prettier: true,
      mock: true,
      override: {
        mutator: {
          path: './custom-client.ts',
          name: 'customClient',
        },
      },
    },
  },
});
