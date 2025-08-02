import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { remarkMermaid } from '@theguild/remark-mermaid';

export const docs = defineDocs({
  dir: 'content/learn',
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMermaid],
  },
});
