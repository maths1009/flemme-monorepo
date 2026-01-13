import * as fs from 'node:fs';
import * as path from 'node:path';

import { ERDBuilder } from 'typeorm-erd';
import { AppDataSource } from '../src/data-source';

const CODE_BLOCK = '```';

const MERMAID_TEMPLATE = (erd: string) => `${CODE_BLOCK}mermaid\n${erd}\n${CODE_BLOCK}`;

async function generate() {
  await AppDataSource.initialize();

  // biome-ignore lint/suspicious/noTsIgnore: typeorm-erd types are incompatible with TypeORM v0.3 DataSource
  //@ts-ignore
  const mermaid = new ERDBuilder('mermaid', AppDataSource);
  await mermaid.initialize();
  const mermaidDiagram = mermaid.render();

  const template = `${MERMAID_TEMPLATE(mermaidDiagram)}`;

  await fs.promises.writeFile(path.join(__dirname, '../docs/database.md'), template);

  // biome-ignore lint/suspicious/noConsole: script output
  console.log('✅ ERD generated');
  process.exit(0);
}

generate();
