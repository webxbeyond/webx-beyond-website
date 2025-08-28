"use client";
import React, { useEffect, useState } from "react";
import { totp } from "otplib";

/**
 * Configure otplib to match Google Authenticator defaults
 */
totp.options = {
  step: 30,
  digits: 6,
  window: 1, // tolerate ±1 step drift
};

function sanitizeInput(input: string) {
  // remove spaces and make uppercase
  return input.replace(/\s+/g, "").toUpperCase();
}

function isValidBase32(str: string) {
  // Accept A-Z and 2-7 and optional padding =
  // Minimum length check (16) - adjust if you need stricter/looser rules
  if (!str) return false;
  if (!/^[A-Z2-7]+=*$/.test(str)) return false;
  // strip padding to check actual length
  const stripped = str.replace(/=+$/g, "");
  return stripped.length >= 16;
}

function tryParseOtpauthUri(uri: string): string | null {
  // Accept strings that start with otpauth://
  try {
    // Some clipboard values include spaces or newlines; trim them
    const trimmed = uri.trim();
    if (!trimmed.toLowerCase().startsWith("otpauth://")) return null;

    // URL can parse non-http schemes too
    const u = new URL(trimmed);
    // e.g. otpauth://totp/Label?secret=ABC123&issuer=Foo
    const params = new URLSearchParams(u.search);
    const secret = params.get("secret");
    if (!secret) return null;
    return secret;
  } catch (e) {
    // Could be a non-standard string; try a fallback RegExp
    const m = uri.match(/[?&]secret=([A-Za-z2-7=]+)/i);
    return m ? m[1] : null;
  }
}

export default function TOTPViewerEnhanced() {
  const [rawInput, setRawInput] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBase32Valid, setIsBase32Valid] = useState(false);
  const [canGenerate, setCanGenerate] = useState(false);

  const step = 30;

  // react to raw input changes: either secret or otpauth uri
  useEffect(() => {
    if (!rawInput) {
      setSecret("");
      setError(null);
      setIsBase32Valid(false);
      return;
    }

    // If user pasted an otpauth:// URI, extract secret
    const maybeSecret = tryParseOtpauthUri(rawInput);
    if (maybeSecret) {
      const s = sanitizeInput(maybeSecret);
      setSecret(s);
      setRawInput(s); // replace displayed input with the extracted secret (so user sees the secret)
      return;
    }

    // otherwise treat rawInput as a raw Base32 secret candidate
    const candidate = sanitizeInput(rawInput);
    setSecret(candidate);
  }, [rawInput]);

  // validation + generate code + time left
  useEffect(() => {
    if (!secret) {
      setCode("");
      setTimeLeft(step);
      setError(null);
      setIsBase32Valid(false);
      setCanGenerate(false);
      return;
    }

    const valid = isValidBase32(secret);
    setIsBase32Valid(valid);
    if (!valid) {
      setCode("");
      setError("ভুল Base32 সিক্রেট। A–Z, 2–7, ঐচ্ছিক = প্যাডিং থাকতে হবে এবং কমপক্ষে ১৬ অক্ষর।");
      setCanGenerate(false);
    } else {
      setError(null);
    }

    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = step - (now % step);
      setTimeLeft(remaining);

      if (!valid) return;

      try {
        const generated = totp.generate(secret);
        setCode(generated);
        setCanGenerate(true);
      } catch (e) {
        console.error("TOTP generate failed:", e);
        setCode("");
        setError("কোড জেনারেট করা যায়নি। আপনার সিক্রেট চেক করুন।");
        setCanGenerate(false);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [secret]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawInput(e.target.value);
  };

  const handleClear = () => {
    setRawInput("");
    setSecret("");
    setCode("");
    setCopied(false);
    setError(null);
    setIsBase32Valid(false);
    setCanGenerate(false);
  };

  const copyToClipboard = async () => {
    if (!code || !!error) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Clipboard write failed", e);
    }
  };

  const borderColor = secret ? (isBase32Valid ? (canGenerate ? "#2e7d32" : "#f9a825") : "#d32f2f") : "#ccc";
  const statusText = !secret
    ? "Base32 সিক্রেট লিখুন অথবা otpauth:// URI পেস্ট করুন"
    : isBase32Valid
    ? canGenerate
      ? "সিক্রেট সঠিক — TOTP জেনারেট হয়েছে ✅"
      : "সিক্রেট সঠিক মনে হচ্ছে — কিন্তু জেনারেশন ব্যর্থ (সিক্রেট চেক করুন)"
    : "ভুল Base32 সিক্রেট — শুধুমাত্র A–Z এবং 2–7 অনুমোদিত ❌";

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 20,
        margin: "24px auto",
        background: "#fafafa",
      }}
    >
      <h3>🔑 TOTP ভিউয়ার</h3>

      <input
        aria-label="সিক্রেট অথবা otpauth URI"
        type="text"
        value={rawInput}
        onChange={handleInputChange}
        placeholder="Base32 সিক্রেট লিখুন অথবা otpauth:// URI পেস্ট করুন"
        style={{
          width: "100%",
          padding: "8px 12px",
          fontSize: 16,
          marginBottom: 8,
          borderRadius: 6,
          border: `2px solid ${borderColor}`,
          outline: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: isBase32Valid ? "#2e7d32" : "#d32f2f" }}>{statusText}</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
            উদাহরণ সিক্রেট: <code style={{ background: "#fff", padding: "2px 6px", borderRadius: 4 }}>JBSWY3DPEHPK3PXP</code>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleClear}
            style={{
              padding: "6px 12px",
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            🧹 ক্লিয়ার
          </button>

          <button
            onClick={copyToClipboard}
            disabled={!code || !!error}
            style={{
              padding: "6px 12px",
              background: copied ? "green" : "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: code && !error ? "pointer" : "not-allowed",
              opacity: code && !error ? 1 : 0.6,
            }}
          >
            {copied ? "✔ কপি হয়েছে" : "📋 কপি করুন"}
          </button>
        </div>
      </div>

      <div
        style={{
          fontSize: 36,
          fontFamily: "monospace",
          margin: "8px 0",
          textAlign: "center",
          minHeight: 48,
        }}
      >
        {code || "------"}
      </div>

      <div style={{ marginTop: 6 }}>
        <div
          style={{
            height: 8,
            width: "100%",
            background: "#eee",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(timeLeft / step) * 100}%`,
              background: timeLeft > 5 ? "#1976d2" : "red",
              transition: "width 0.2s linear",
            }}
          />
        </div>
        <div style={{ fontSize: 12, color: "#555", textAlign: "right", marginTop: 6 }}>
          মেয়াদ শেষ হবে: {timeLeft} সেকেন্ড
        </div>
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
        টিপ: আপনি একটি সম্পূর্ণ otpauth URI (কিছু অ্যাপ থেকে এক্সপোর্ট করা মতো) পেস্ট করতে পারেন এবং সিক্রেট স্বয়ংক্রিয়ভাবে এক্সট্রাক্ট হয়ে যাবে।
      </div>
    </div>
  );
}
