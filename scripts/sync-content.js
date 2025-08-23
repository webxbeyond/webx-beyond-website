// Note: This JavaScript version assumes a browser environment with fetch API for file reading
// and that 'algoliasearch' is available via a CDN or module bundler.

// Import algoliasearch (assuming it's available globally or via a module bundler)
import { algoliasearch } from 'algoliasearch';

// File path configuration for different React frameworks
const filePath = {
  next: '.next/server/app/static.json.body',
  'tanstack-start': '.output/public/static.json',
  'react-router': 'build/client/static.json',
}['next'];

// Fetch and process the static.json file
fetch(filePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }
    return response.text();
  })
  .then(content => {
    const records = JSON.parse(content);
    
    // Initialize Algolia client
    const client = algoliasearch('id', 'key');

    // Update the index settings and sync search indexes
    client
      .initIndex('document')
      .saveObjects(records)
      .then(() => console.log('Search index synced successfully'))
      .catch(err => console.error('Error syncing search index:', err));
  })
  .catch(err => console.error('Error reading file:', err));