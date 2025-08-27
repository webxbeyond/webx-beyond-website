"use client";
import React, { useState, useEffect } from "react";

// Character sets
const charset = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{}|;:,.<>?/~`"
};
const ambiguousChars = "O0oIl1";

function getRandomChar(chars: string): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return chars[array[0] % chars.length];
}

function generatePassword({
  length = 16,
  useLower = true,
  useUpper = true,
  useNumber = true,
  useSymbol = true,
  avoidAmbiguous = false
}: {
  length?: number;
  useLower?: boolean;
  useUpper?: boolean;
  useNumber?: boolean;
  useSymbol?: boolean;
  avoidAmbiguous?: boolean;
}): string {
  let chars = "";
  if (useLower) chars += charset.lower;
  if (useUpper) chars += charset.upper;
  if (useNumber) chars += charset.number;
  if (useSymbol) chars += charset.symbol;

  if (avoidAmbiguous) {
    chars = chars
      .split("")
      .filter(c => !ambiguousChars.includes(c))
      .join("");
  }

  if (!chars) return "";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += getRandomChar(chars);
  }
  return password;
}

function calculateEntropy(length: number, poolSize: number): string {
  return (Math.log2(poolSize) * length).toFixed(2);
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumber, setUseNumber] = useState(true);
  const [useSymbol, setUseSymbol] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = React.useCallback(() => {
    setPassword(
      generatePassword({ length, useLower, useUpper, useNumber, useSymbol, avoidAmbiguous })
    );
  }, [length, useLower, useUpper, useNumber, useSymbol, avoidAmbiguous]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const poolSize =
    (useLower ? charset.lower.length : 0) +
    (useUpper ? charset.upper.length : 0) +
    (useNumber ? charset.number.length : 0) +
    (useSymbol ? charset.symbol.length : 0);

  const entropy = poolSize > 0 ? calculateEntropy(length, poolSize) : 0;

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 20,
        margin: "24px auto",
      }}
    >
      {/* <h3>পাসওয়ার্ড জেনারেটর</h3> */}

      {/* Length Input and Slider */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 6 }}>
          দৈর্ঘ্য: <strong>{length}</strong>
        </label>
        <input
          type="range"
          min={6}
          max={200}
          value={length}
          onChange={e => setLength(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      {/* Checkboxes */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={useLower}
            onChange={e => setUseLower(e.target.checked)}
          />{" "}
          ছোট হাতের অক্ষর
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="checkbox"
            checked={useUpper}
            onChange={e => setUseUpper(e.target.checked)}
          />{" "}
          বড় হাতের অক্ষর
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="checkbox"
            checked={useNumber}
            onChange={e => setUseNumber(e.target.checked)}
          />{" "}
          সংখ্যা
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="checkbox"
            checked={useSymbol}
            onChange={e => setUseSymbol(e.target.checked)}
          />{" "}
          বিশেষ চিহ্ন
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="checkbox"
            checked={avoidAmbiguous}
            onChange={e => setAvoidAmbiguous(e.target.checked)}
          />{" "}
          অস্পষ্ট অক্ষর বাদ দিন (O, 0, l, 1)
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        style={{
          marginTop: 12,
          padding: "6px 16px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        জেনারেট করুন
      </button>

      {/* Password Display */}
      {password && (
  <div style={{ marginTop: 16 }}>
    <strong>পাসওয়ার্ড:</strong>

    {/* Determine border color by strength */}
    {(() => {
      let borderColor = "#ddd"; // default
      const e = Number(entropy);
      if (e < 50) borderColor = "red";
      else if (e < 80) borderColor = "orange";
      else if (e < 110) borderColor = "#1976d2"; // blue
      else borderColor = "green";

      return (
        <div
          style={{
            fontSize: 18,
            marginTop: 4,
            padding: "4px 8px",
            borderRadius: 8,
            border: `1px solid ${borderColor}`,
            wordBreak: "break-all",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>{password}</span>
          <button
            onClick={copyToClipboard}
            style={{
              marginLeft: 8,
              padding: "4px 8px",
              background: copied ? "green" : "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              whiteSpace: "nowrap",
              cursor: "pointer"
            }}
          >
            {copied ? "✔ কপি হয়েছে" : "📋 কপি"}
          </button>
        </div>
      );
    })()}

    <div style={{ marginTop: 8 }}>
      <strong>এন্ট্রপি:</strong> {entropy} বিটস
      <p style={{ fontSize: 13, color: "#555", marginTop: 4, lineHeight: 1.4,marginBottom: 4  }}>
        এন্ট্রপি মানে আপনার পাসওয়ার্ড কতটা অনুমান করা কঠিন।
        সাধারণত <strong>৬০ বিটের বেশি</strong> হলে সেটি নিরাপদ ধরা হয়।
        মান যত বেশি হবে, পাসওয়ার্ড তত শক্তিশালী হবে।
      </p>
    </div>
  </div>
)}

    </div>
  );
}
