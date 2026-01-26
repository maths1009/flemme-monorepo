import { defineConfig } from '@julr/vite-plugin-validate-env';
import { z } from 'zod';

export default defineConfig({
  schema: {
    VITE_GOOGLE_ANALYTICS_ID: z.string(),
  },
  validator: 'standard',
});
