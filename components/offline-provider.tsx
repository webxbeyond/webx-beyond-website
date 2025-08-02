'use client'
import { useEffect } from "react";

const OfflineProvider = () => {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js")
        }
    })
    return null
}

export default OfflineProvider