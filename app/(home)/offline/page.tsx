export const metadata = {
    title: 'অফলাইন | ওয়েবএক্স',
    description: 'আপনি এখন অফলাইনে আছেন — আবার সংযোগ হলে স্বয়ংক্রিয়ভাবে রিলোড হবে।',
    robots: { index: false },
};

export default function OfflinePage() {
    // Importing a client component keeps this file server-only so metadata is allowed.
    const OfflineClient = require('./offline-client').OfflineClient;
    return <OfflineClient />;
}
