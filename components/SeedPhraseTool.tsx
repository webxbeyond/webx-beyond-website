"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react"; // For copy icon
import * as bip39 from "bip39";

export default function SeedPhraseTool() {
  const [mnemonic, setMnemonic] = useState("");
  const [seed, setSeed] = useState("");
  const [entropy, setEntropy] = useState("");
  const [input, setInput] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [mnemonicLength, setMnemonicLength] = useState(12);
  const [error, setError] = useState("");
  const [showSeed, setShowSeed] = useState(false);

  const generate = () => {
    try {
      const strength = mnemonicLength * 32 / 3; // 128 for 12 words, 256 for 24
      const phrase = bip39.generateMnemonic(strength);
      setMnemonic(phrase);
      setInput(phrase);
      const derivedSeed = bip39.mnemonicToSeedSync(phrase, passphrase).toString("hex");
      setSeed(derivedSeed);
      setEntropy(bip39.mnemonicToEntropy(phrase));
      setError("");
    } catch (err) {
      setError("Error generating mnemonic");
    }
  };

  const decode = () => {
    if (bip39.validateMnemonic(input)) {
      setMnemonic(input);
      setSeed(bip39.mnemonicToSeedSync(input, passphrase).toString("hex"));
      setEntropy(bip39.mnemonicToEntropy(input));
      setError("");
    } else {
      setError("❌ Invalid mnemonic phrase");
      setMnemonic("");
      setSeed("");
      setEntropy("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ mnemonic, seed, entropy })], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "seed-data.json";
    link.click();
  };

  return (
    <div className="border border-gray-200 bg-gray-50 rounded-lg p-6 my-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">🔐 সিড ফ্রেইজ টুল</h2>

      {/* Options */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          value={mnemonicLength}
          onChange={(e) => setMnemonicLength(Number(e.target.value))}
          className="border rounded p-2"
        >
          {[12, 15, 18, 21, 24].map((len) => (
            <option key={len} value={len}>{len} শব্দ</option>
          ))}
        </select>
        <input
          type="text"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="ঐচ্ছিক পাসফ্রেইজ"
          className="flex-1 border rounded p-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-4">
        <button onClick={generate} className="px-4 py-2 font-bold bg-blue-600 text-white rounded hover:bg-blue-700">
          সিড ফ্রেইজ জেনারেট করুন
        </button>
        <button onClick={decode} className="px-4 py-2 font-bold bg-green-600 text-white rounded hover:bg-green-700">
          ডিকোড করুন
        </button>
        <button onClick={exportData} className="px-4 py-2 font-bold bg-gray-600 text-white rounded hover:bg-gray-700">
          এক্সপোর্ট করুন
        </button>
      </div>

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="এখানে আপনার সিড ফ্রেইজ লিখুন"
        className="w-full p-3 text-lg border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-200"
      />

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Results */}
      {mnemonic && (
        <div className="mb-2 bg-white p-3 rounded shadow">
          <b>সিড ফ্রেইজ:</b>
          <div className="flex justify-between">
            <div className="break-words max-w-full">{mnemonic}</div>
            <Copy onClick={() => copyToClipboard(mnemonic)} className="cursor-pointer text-blue-500" />
          </div>
        </div>
      )}

      {seed && (
        <div className="mb-2 bg-white p-3 rounded shadow">
          <b>সিড (hex):</b>
          <div className="flex justify-between">
            <div className="break-words max-w-full">{showSeed ? seed : "••••••••••••"}</div>
            <div className="flex gap-2">
              <button onClick={() => setShowSeed(!showSeed)} className="text-sm text-blue-600">
                {showSeed ? "Hide" : "Show"}
              </button>
              <Copy onClick={() => copyToClipboard(seed)} className="cursor-pointer text-blue-500" />
            </div>
          </div>
        </div>
      )}

      {entropy && (
        <div className="mb-2 bg-white p-3 rounded shadow">
          <b>এন্ট্রপি:</b>
          <div className="flex justify-between">
            <div className="break-words max-w-full">{entropy}</div>
            <Copy onClick={() => copyToClipboard(entropy)} className="cursor-pointer text-blue-500" />
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        ⚠️ এই টুলটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। আপনার আসল সিড ফ্রেইজ এখানে ব্যবহার করবেন না।
      </div>
    </div>
  );
}
