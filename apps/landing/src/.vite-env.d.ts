/// <reference types="vite/client" />

type ImportMetaEnvAugmented = import('@julr/vite-plugin-validate-env').ImportMetaEnvAugmented<
  typeof import('./config/env').default
>;

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv extends ImportMetaEnvAugmented {}
