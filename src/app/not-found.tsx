import { baseOptions } from '@/lib/layout.shared';
import NotFoundGame from '@/components/not-found-game.client';
import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

export default function NotFound() {
  const base = baseOptions();

  return (
    <HomeLayout {...base}>
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center py-20">
        {/* Fun mini-game */}
        <NotFoundGame />

        <div className="text-center max-w-lg px-4">

          <h1 className="text-4xl font-extrabold mb-4 ">৪০৪: পেজটি পাওয়া যায়নি</h1>

          <p className="text-lg mb-4 text-fd-muted-foreground">
            <span className="font-semibold">উফ!</span> আমাদের সার্ভার একটি
            <code className="bg-black text-green-400 px-1 mx-1 rounded">ReferenceError</code> পাঠিয়েছে:
            <em>&apos;Page is not defined&apos;</em>।
            ভাবুন, আপনি এমন একটি কম্পোনেন্ট ইমপোর্ট করেছেন যা এখনও তৈরি হয়নি।
          </p>


          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <Link href="/" className="px-5 py-2 rounded-md bg-fd-accent text-fd-accent-foreground font-medium hover:opacity-90">
              প্রথম পাতা
            </Link>

            <a href="https://github.com/webxbeyond/webx-beyond-website/issues/new"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
              বাগ রিপোর্ট করুন
            </a>
          </div>

          <p className="text-sm text-fd-muted-foreground mt-2">
            টিপ: বাস্তবে <code>yarn dev</code> চালান — অনেকসময় সেটাই কাজ করে।
            না হলে আমাদের ট্যাগ করুন; আমরা সেমিকোলনকে দোষ দেবো না (প্রতিশ্রুতি)।
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}
