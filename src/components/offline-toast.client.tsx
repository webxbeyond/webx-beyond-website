"use client"
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function OfflineToast() {
  const [isOnline, setIsOnline] = useState(true)
  const [showReconnect, setShowReconnect] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShowReconnect(true)
      // small delay so user sees the message before reload
      setTimeout(() => {
        try {
          // full reload to refresh content/state
          window.location.reload()
        } catch {
          // ignore
        }
      }, 1200)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowReconnect(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline && !showReconnect) return null

  return (
    <div className="fixed left-1/2 bottom-6 z-50 -translate-x-1/2 w-fit max-w-[92%] sm:max-w-xl">
      {!isOnline ? (
        <div className="flex items-center gap-3 rounded-lg bg-yellow-400/95 px-4 py-2 text-sm font-medium text-black shadow-lg">
          <span>আপনি অফলাইনে — ক্যাশ করা কনটেন্ট দেখানো হচ্ছে।</span>
          <RetryModalButton />
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg bg-green-500/95 px-4 py-2 text-sm font-medium text-white shadow-lg">
          <span>আপনি অনলাইনে ফিরে এসেছেন — পুনরায় লোড করা হচ্ছে...</span>
        </div>
      )}
    </div>
  )
}

function RetryModalButton() {
  const [open, setOpen] = useState(false)
  const [animateOpen, setAnimateOpen] = useState(false)

  // trigger entrance animation when opening
  useEffect(() => {
    let t: number | undefined
    if (open) {
      // allow one tick for the element to mount
      t = window.setTimeout(() => setAnimateOpen(true), 10)
    } else {
      setAnimateOpen(false)
    }
    return () => {
      if (t) window.clearTimeout(t)
    }
  }, [open])

  const close = () => {
    // play closing animation then hide
    setAnimateOpen(false)
    setTimeout(() => setOpen(false), 180)
  }

  return (
    <>
      <button
        className="ml-2 rounded bg-black/10 px-2 py-1 text-xs"
        onClick={() => {
          if (navigator.onLine) window.location.reload()
          else setOpen(true)
        }}
      >
        রিফ্রেশ
      </button>

      {open && typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${animateOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={close}
            />

            <div
              role="dialog"
              aria-modal="true"
              className={`relative z-10 w-[90%] max-w-lg rounded-lg bg-white p-4 shadow-lg transform transition-all duration-180 ease-out ${
                animateOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <h3 className="mb-2 text-lg font-semibold">এখনো অফলাইন</h3>
              <p className="mb-4 text-sm text-gray-700">মনে হচ্ছে আপনি এখনও অফলাইনে আছেন। আপনার নেটওয়ার্ক সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।</p>
              <div className="flex justify-end gap-2">
                <button
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white cursor-pointer"
                  onClick={() => {
                    if (navigator.onLine) window.location.reload()
                    else close()
                  }}
                >
                  ওকে!
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
