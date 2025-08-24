import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { algoliasearch } from 'algoliasearch';
import { sync } from 'fumadocs-core/search/algolia';
import * as fs from 'node:fs';

// the path of pre-rendered `static.json`, choose one according to your React framework
const filePath = {
  next: '.next/server/app/static.json.body',
  'tanstack-start': '.output/public/static.json',
  'react-router': 'build/client/static.json',
}['next'];

const content = fs.readFileSync(filePath);

const records = JSON.parse(content.toString());

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;

const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
console.log('ALGOLIA ENV:', { appId, apiKey, indexName });
if (!appId || !apiKey || !indexName) {
  throw new Error('Algolia environment variables are missing. Check your .env.local file.');
}
const client = algoliasearch(appId, apiKey);

// update the index settings and sync search indexes
void sync(client, {
  indexName,
  documents: records,
});

// Run this script to sync node scripts/sync-content.ts