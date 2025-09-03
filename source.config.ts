import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content/learn",
  docs: {
    schema: frontmatterSchema.extend({
      index: z.boolean().default(false),
      description: z
        .string()
        .optional()
        .default(
          "ওয়েবএক্স বিয়ন্ড - বাংলা প্রযুক্তি শিক্ষা, ডেভঅপস, ক্লাউড, এআই, প্রোগ্রামিং, ও আরও অনেক কিছু"
        ),
      keywords: z
        .string()
        .optional()
        .default(
          "ওয়েবএক্স, বাংলা, প্রযুক্তি, ডেভঅপস, ক্লাউড, এআই, প্রোগ্রামিং, শিক্ষা, নেটওয়ার্ক, টিউটোরিয়াল"
        ),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    // MDX options
  },
});
