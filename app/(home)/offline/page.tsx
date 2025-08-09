export const metadata = {
    title: 'অফলাইন | ওয়েবএক্স',
    description: 'আপনি এখন অফলাইনে আছেন — আবার সংযোগ হলে স্বয়ংক্রিয়ভাবে রিলোড হবে।',
    robots: { index: false },
};

import { OfflineClient } from './offline-client';

export default function OfflinePage() {
    return <OfflineClient />;
}
