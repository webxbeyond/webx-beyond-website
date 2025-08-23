"use client"
import { useEffect, useRef, useState } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [percent, setPercent] = useState(1)
  const targetRef = useRef(1)
  const percentRef = useRef(1)

  useEffect(() => {
    if (typeof window === 'undefined') return

  const images: HTMLImageElement[] = Array.from(document.images || []) as HTMLImageElement[]
    const totalImages = images.length
    let imagesDone = 0

    let totalFetchsSeen = 0
    let fetchsDone = 0
    let loadTriggered = false

    // image listeners
    const onImageSettled = () => {
      imagesDone += 1
      updateTarget()
    }
    images.forEach((img) => {
      if (img.complete) onImageSettled()
      else {
        img.addEventListener('load', onImageSettled, { once: true })
        img.addEventListener('error', onImageSettled, { once: true })
      }
    })

  // wrap fetch to detect network requests
  const origFetch = window.fetch.bind(window) as typeof fetch
  window.fetch = async (...args: Parameters<typeof fetch>) => {
      totalFetchsSeen += 1
      updateTarget()
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = await (origFetch as any).apply(window, args)
        return res
      } finally {
        fetchsDone += 1
        updateTarget()
      }
    }

    // load event
    const onLoad = () => {
      loadTriggered = true
      updateTarget()
    }
    window.addEventListener('load', onLoad)

    // compute target percentage from observed progress
    function updateTarget() {
      const imgWeight = 0.6
      const fetchWeight = 0.3
      const loadWeight = 0.1

      const imgProg = totalImages > 0 ? imagesDone / totalImages : 1
      const fetchProg = totalFetchsSeen > 0 ? fetchsDone / totalFetchsSeen : 1
      const loadProg = loadTriggered ? 1 : 0

      const prog = imgWeight * imgProg + fetchWeight * fetchProg + loadWeight * loadProg
      targetRef.current = Math.max(1, Math.min(100, Math.floor(prog * 100)))
    }

    updateTarget()

    // smoothing interval to animate percent toward target
    const id = window.setInterval(() => {
      const t = targetRef.current
      setPercent((p) => {
        if (p >= 100) {
          percentRef.current = 100
          return 100
        }
        const delta = Math.max(1, Math.ceil((t - p) / 6))
        const next = Math.min(100, p + delta)
        percentRef.current = next
        return next
      })
    }, 80)

    // hide when complete; ensure minimum visible duration
    const minVisibleMs = 100
    const startTime = performance.now()
    const completeCheck = window.setInterval(() => {
      const doneCondition = percentRef.current >= 100 || (loadTriggered && imagesDone >= totalImages && fetchsDone >= totalFetchsSeen)
      if (doneCondition) {
        const elapsed = performance.now() - startTime
        const remaining = Math.max(0, minVisibleMs - elapsed)
        // ensure we show 100% before hiding
        setPercent(100)
        percentRef.current = 100
        setTimeout(() => {
          setVisible(false)
        }, remaining + 200)
        clearInterval(id)
        clearInterval(completeCheck)
      }
    }, 120)

    return () => {
      window.fetch = origFetch
      window.clearInterval(id)
      window.clearInterval(completeCheck)
      window.removeEventListener('load', onLoad)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // keep rendering hidden once not visible
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center backdrop-blur-sm bg-white/40 dark:bg-black/40 transition-opacity">
      <div className="w-full max-w-2xl px-4">
        <div className="mx-auto w-full rounded bg-white/60 dark:bg-black/60 p-4 shadow">
          <div className="mb-2 text-center text-sm font-medium">লোড হচ্ছে — অনুগামীতা: {percent}%</div>
          <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
