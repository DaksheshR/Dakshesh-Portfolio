"use client";

import { useEffect, useRef } from "react";

/**
 * Project backends hosted on Render (free tier) that sleep after 15 minutes of inactivity.
 * When a visitor opens the portfolio, these endpoints are pinged once in the background
 * to pre-warm the servers before the visitor clicks "Live Demo".
 */
const PREWARM_URLS: string[] = [
  "https://weatherapi-backend-5s5s.onrender.com",
];

export default function PrewarmBackends() {
  const executedRef = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode running useEffect twice in development
    if (executedRef.current) return;
    executedRef.current = true;

    // Session guard: ensures the ping only runs once per visitor browser session
    if (typeof window !== "undefined") {
      const sessionKey = "portfolio_prewarm_triggered";
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, "true");
    }

    // Fire non-blocking wake-up requests
    PREWARM_URLS.forEach((url) => {
      try {
        // mode: 'no-cors' allows the request to reach Render's servers to wake up
        // the instance without throwing cross-origin errors in the browser console.
        fetch(url, {
          method: "GET",
          mode: "no-cors",
          cache: "no-store",
        }).catch(() => {
          // Silently ignore — purely a wake-up signal
        });
      } catch {
        // Safe catch
      }
    });
  }, []);

  return null;
}
