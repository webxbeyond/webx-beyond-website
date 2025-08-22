"use client";

import React, { useMemo, useState } from "react";
import * as bip39 from "bip39";
import { HDKey } from "@scure/bip32";
import * as ethUtil from "ethereumjs-util";
import { QRCodeCanvas } from "qrcode.react"; // Optional QR feature

// Helper: copy to clipboard
const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (_) {}
};

// Helper: mask sensitive strings
const mask = (v: string, visible: boolean, start = 8, end = 6) => {
  if (visible || v.length <= start + end + 3) return v;
  return `${v.slice(0, start)}…${v.slice(-end)}`;
};

// Validate path like m/44'/60'/0'/0/0
const isValidPath = (p: string) => /^m(\/(\d+)'?)+$/.test(p.trim());

// Build a standard derivation path
const buildPath = (coin: number, account: number, change: 0 | 1, index: number) =>
  `m/44'/${coin}'/${account}'/${change}/${index}`;

// Ethereum address from node
const ethAddressFromNode = (node: HDKey) => {
  if (!node.publicKey) return undefined;
  const pubKeyBuf = Buffer.from(node.publicKey);
  const addr = ethUtil.publicToAddress(pubKeyBuf, true).toString("hex");
  return "0x" + addr;
};

// Master fingerprint
const masterFingerprintHex = (node: HDKey) =>
  "0x" + node.fingerprint.toString(16).padStart(8, "0");

// Export JSON file
const downloadJSON = (filename: string, data: unknown) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export default function HDWalletCalculator() {
  const [mnemonic, setMnemonic] = useState("");
  const [strength, setStrength] = useState<128 | 160 | 192 | 224 | 256>(128);
  const [passphrase, setPassphrase] = useState("");
  const [coin, setCoin] = useState<number>(60);
  const [account, setAccount] = useState<number>(0);
  const [change, setChange] = useState<0 | 1>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(5);
  const [customPath, setCustomPath] = useState("m/44'/60'/0'/0/0");
  const [useCustomPath, setUseCustomPath] = useState<boolean>(false);

  // Security toggles
  const [showSeed, setShowSeed] = useState(false);
  const [showXprv, setShowXprv] = useState(false);
  const [showPrivKeys, setShowPrivKeys] = useState(false);

  // Results
  const [seedHex, setSeedHex] = useState("");
  const [master, setMaster] = useState<{ xprv: string; xpub: string; fingerprint: string } | null>(null);
  const [derived, setDerived] = useState<
    Array<{ index: number; path: string; priv?: string; pub: string; address?: string }>
  >([]);
  const [error, setError] = useState<string>("");

  const computedPath = useMemo(
    () => (useCustomPath ? customPath : buildPath(coin, account, change, startIndex)),
    [useCustomPath, customPath, coin, account, change, startIndex]
  );

  const handleGenerateMnemonic = () => {
    setError("");
    try {
      const m = bip39.generateMnemonic(strength);
      setMnemonic(m);
    } catch {
      setError("Mnemonic তৈরি করা যায়নি।");
    }
  };

  const validateAll = () => {
    if (!mnemonic.trim()) return "সিড ফ্রেইজ লিখুন বা Generate করুন।";
    if (!bip39.validateMnemonic(mnemonic.trim())) return "সিড ফ্রেইজটি সঠিক নয়।";
    const pathToCheck = useCustomPath ? customPath : buildPath(coin, account, change, startIndex);
    if (!isValidPath(pathToCheck)) return "ডেরিভেশন পাথটি সঠিক নয়।";
    if (count < 1 || count > 100) return "একসাথে 1 থেকে 100 টি ঠিকানা ডেরাইভ করতে পারেন।";
    if (account < 0 || startIndex < 0) return "ইন্ডেক্স/অ্যাকাউন্ট অবশ্যই ধনাত্মক হবে।";
    return "";
  };

  const calculate = () => {
    setError("");
    setDerived([]);
    setMaster(null);
    setSeedHex("");

    const err = validateAll();
    if (err) {
      setError(err);
      return;
    }

    try {
      const seedBuf = bip39.mnemonicToSeedSync(mnemonic.trim(), passphrase);
      const seedHexLocal = Buffer.from(seedBuf).toString("hex");
      setSeedHex(seedHexLocal);

      const root = HDKey.fromMasterSeed(seedBuf);
      const xprv = root.privateExtendedKey;
      const xpub = root.publicExtendedKey;
      const fingerprint = masterFingerprintHex(root);
      setMaster({ xprv, xpub, fingerprint });

      const list: Array<{ index: number; path: string; priv?: string; pub: string; address?: string }> = [];
      const basePath = useCustomPath ? customPath.trim() : `m/44'/${coin}'/${account}'/${change}`;
      const start = useCustomPath
        ? parseInt(basePath.split("/").slice(-1)[0].replace("'", "")) || startIndex
        : startIndex;

      for (let i = 0; i < count; i++) {
        const idx = useCustomPath ? start + i : startIndex + i;
        const p = useCustomPath ? basePath : `${basePath}/${idx}`;
        const child = root.derive(p);
        const pubHex = child.publicKey ? Buffer.from(child.publicKey).toString("hex") : "";
        const privHex = child.privateKey ? Buffer.from(child.privateKey).toString("hex") : undefined;

        let address: string | undefined = undefined;
        if ((useCustomPath ? customPath : basePath).includes("/60'")) {
          address = ethAddressFromNode(child);
        }
        list.push({ index: idx, path: p, priv: privHex, pub: pubHex, address });
      }
      setDerived(list);
    } catch (e) {
      console.error(e);
      setError("ক্যালকুলেশন সম্ভব হয়নি। আপনার ইনপুটগুলো আবার চেক করুন।");
    }
  };

  const handleDownload = () => {
    const data = {
      meta: {
        note: "Educational use only. Do NOT use real funds.",
        createdAt: new Date().toISOString(),
        standard: "BIP32/BIP39/BIP44",
      },
      inputs: {
        mnemonicWords: mnemonic.trim().split(/\s+/).length,
        passphraseUsed: Boolean(passphrase),
        coin,
        account,
        change,
        startIndex,
        count,
        pathMode: useCustomPath ? "custom" : "knobs",
        customPath: useCustomPath ? customPath : undefined,
      },
      results: {
        seed: seedHex,
        master,
        derived,
      },
    };
    downloadJSON(`hdwallet-${Date.now()}.json`, data);
  };

  const resetAll = () => {
    setMnemonic("");
    setPassphrase("");
    setSeedHex("");
    setMaster(null);
    setDerived([]);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-200 bg-white rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold">HD Wallet ক্যালকুলেটর — BIP32/39/44</h2>
        <div className="flex gap-2">
          <button onClick={handleDownload} className="px-3 py-2 text-sm rounded-xl border hover:bg-gray-50">Export JSON</button>
          <button onClick={resetAll} className="px-3 py-2 text-sm rounded-xl border hover:bg-gray-50">Reset</button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">“Simplifying complexity, one concept at a time.” আপনার Mnemonic + (ঐচ্ছিক) Passphrase দিন, প্রিসেট বা কাস্টম পাথ বেছে নিন, তারপর এক ক্লিকে একাধিক ঠিকানা ডেরাইভ করুন. 🔐</p>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-medium">Mnemonic (সিড ফ্রেইজ)</label>
          <textarea
            className="w-full p-2 border rounded-xl text-sm"
            placeholder="১২–২৪টি শব্দ…"
            rows={3}
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <select
              className="p-2 border rounded-xl text-sm"
              value={strength}
              onChange={(e) => setStrength(parseInt(e.target.value, 10) as any)}
            >
              <option value={128}>12 words (128-bit)</option>
              <option value={160}>15 words (160-bit)</option>
              <option value={192}>18 words (192-bit)</option>
              <option value={224}>21 words (224-bit)</option>
              <option value={256}>24 words (256-bit)</option>
            </select>
            <button onClick={handleGenerateMnemonic} className="px-3 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700">Generate</button>
          </div>

          <label className="block text-sm font-medium">Passphrase (ঐচ্ছিক)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-xl text-sm"
            placeholder="BIP39 passphrase (optional)"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
          />

          <div className="flex items-center gap-3 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={showSeed} onChange={(e) => setShowSeed(e.target.checked)} /> Seed দেখান</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={showXprv} onChange={(e) => setShowXprv(e.target.checked)} /> xprv দেখান</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={showPrivKeys} onChange={(e) => setShowPrivKeys(e.target.checked)} /> চাইল্ড প্রাইভেট দেখান</label>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Path mode:</label>
            <button
              className={`px-3 py-2 text-sm rounded-xl border ${!useCustomPath ? "bg-gray-100" : "hover:bg-gray-50"}`}
              onClick={() => setUseCustomPath(false)}
            >Presets</button>
            <button
              className={`px-3 py-2 text-sm rounded-xl border ${useCustomPath ? "bg-gray-100" : "hover:bg-gray-50"}`}
              onClick={() => setUseCustomPath(true)}
            >Custom</button>
          </div>

          {!useCustomPath ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">Coin (SLIP-44)</label>
                <select className="w-full p-2 border rounded-xl text-sm" value={coin} onChange={(e) => setCoin(parseInt(e.target.value, 10))}>
                  <option value={60}>60 — Ethereum (ETH)</option>
                  <option value={61}>61 — Ethereum Classic (ETC)</option>
                  <option value={966}>966 — Base (ETH derivation)</option>
                  <option value={9006}>9006 — BSC (ETH derivation)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Account</label>
                <input type="number" min={0} className="w-full p-2 border rounded-xl text-sm" value={account} onChange={(e) => setAccount(parseInt(e.target.value || "0", 10))} />
              </div>
              <div>
                <label className="block text-sm font-medium">Change</label>
                <select className="w-full p-2 border rounded-xl text-sm" value={change} onChange={(e) => setChange(parseInt(e.target.value, 10) as 0 | 1)}>
                  <option value={0}>0 — External (receiving)</option>
                  <option value={1}>1 — Internal (change)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Start Index</label>
                <input type="number" min={0} className="w-full p-2 border rounded-xl text-sm" value={startIndex} onChange={(e) => setStartIndex(parseInt(e.target.value || "0", 10))} />
              </div>
              <div>
                <label className="block text-sm font-medium">How many?</label>
                <input type="number" min={1} max={100} className="w-full p-2 border rounded-xl text-sm" value={count} onChange={(e) => setCount(parseInt(e.target.value || "1", 10))} />
              </div>
              <div className="flex items-end">
                <div className="text-xs text-gray-600">Path preview: <span className="font-mono">{buildPath(coin, account, change, startIndex)}</span></div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium">Custom derivation path</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-xl text-sm ${customPath && !isValidPath(customPath) ? "border-red-400" : ""}`}
                placeholder="m/44'/60'/0'/0/0"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">উদাহরণ: <span className="font-mono">m/44'/60'/0'/0/0</span>।
                শুধুমাত্র হার্ডেন্ড (') ও নন-হার্ডেন্ড ইন্ডেক্স সমর্থিত।</p>
            </div>
          )}

          <button
            className="w-full px-4 py-2 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            onClick={calculate}
          >ক্যালকুলেট করুন</button>

          {error && <div className="text-red-600 text-sm">{error}</div>}
        </div>
      </div>

      {/* Results */}
      {(seedHex || master) && (
        <div className="mt-6 space-y-4">
          {seedHex && (
            <div>
              <div className="font-semibold mb-1">১) Seed (BIP39)</div>
              <div className="text-xs text-gray-600 mb-2">Mnemonic + Passphrase → PBKDF2-HMAC-SHA512 → Seed</div>
              <div className="bg-gray-50 border rounded-xl p-3 font-mono text-xs break-all">
                {mask(seedHex, showSeed)}
              </div>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 text-xs rounded-lg border" onClick={() => copy(seedHex)}>Copy</button>
                <button className="px-3 py-1 text-xs rounded-lg border" onClick={() => setShowSeed((v) => !v)}>{showSeed ? "Hide" : "Reveal"}</button>
              </div>
            </div>
          )}

          {master && (
            <div>
              <div className="font-semibold mb-1">২) Master Key (BIP32)</div>
              <div className="text-xs text-gray-600 mb-2">Seed → Master Private/Public (xprv/xpub)</div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-50 border rounded-xl p-3 text-xs break-all"><span className="font-semibold">xpub:</span> {master.xpub}</div>
                <div className="bg-gray-50 border rounded-xl p-3 text-xs break-all"><span className="font-semibold">xprv:</span> {mask(master.xprv, showXprv)}</div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
                <span>Fingerprint: <span className="font-mono">{master.fingerprint}</span></span>
                <button className="px-2 py-1 rounded-lg border" onClick={() => copy(master.xpub)}>Copy xpub</button>
                <button className="px-2 py-1 rounded-lg border" onClick={() => copy(master.xprv)}>Copy xprv</button>
                <button className="px-2 py-1 rounded-lg border" onClick={() => setShowXprv((v) => !v)}>{showXprv ? "Hide xprv" : "Reveal xprv"}</button>
              </div>
            </div>
          )}

          {derived.length > 0 && (
            <div>
              <div className="font-semibold mb-2">৩) Derived (BIP44)</div>
              <div className="text-xs text-gray-600 mb-2">Derivation Path → Child Private/Public (+ ETH address if coin=60)</div>

              <div className="overflow-x-auto border rounded-xl">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-2">#</th>
                      <th className="text-left p-2">Path</th>
                      <th className="text-left p-2">Public Key</th>
                      <th className="text-left p-2">Private Key</th>
                      <th className="text-left p-2">Address</th>
                      <th className="text-left p-2">QR</th>
                      <th className="text-left p-2">Copy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {derived.map((row) => (
                      <tr key={row.path} className="odd:bg-white even:bg-gray-50">
                        <td className="p-2 align-top font-mono">{row.index}</td>
                        <td className="p-2 align-top font-mono whitespace-nowrap">{row.path}</td>
                        <td className="p-2 align-top font-mono break-all">{row.pub}</td>
                        <td className="p-2 align-top font-mono break-all">{row.priv ? mask(row.priv, showPrivKeys) : "—"}</td>
                        <td className="p-2 align-top font-mono break-all">{row.address || "—"}</td>
                        <td className="p-2 align-top">
                          {row.address ? <QRCodeCanvas value={row.address} size={48} includeMargin /> : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="p-2 align-top">
                          <div className="flex gap-1">
                            {row.address && <button className="px-2 py-1 rounded border" onClick={() => copy(row.address!)}>Addr</button>}
                            <button className="px-2 py-1 rounded border" onClick={() => copy(row.pub)}>Pub</button>
                            {row.priv && <button className="px-2 py-1 rounded border" onClick={() => copy(row.priv!)}>Priv</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <b>ব্যাখ্যা:</b><br />
            <b>Seed:</b> Mnemonic + Passphrase → PBKDF2-HMAC-SHA512 (2048 রাউন্ড) → 64-byte seed.<br />
            <b>Master (xprv/xpub):</b> Seed → BIP32 master extended keys, 4-byte fingerprint সহ।<br />
            <b>Derivation:</b> BIP44: <span className="font-mono">m/44'/coin'/account'/change/index</span>। ETH-এর জন্য coin=<span className="font-mono">60</span>।<br />
            <b>Address (ETH):</b> Uncompressed public key → Keccak-256 → শেষ 20 বাইট → <span className="font-mono">0x</span> ঠিকানা।<br />
            <span className="text-red-600">নোট: শিক্ষামূলক ডেমো। আসল সিড/ফান্ড কখনোই এখানে ব্যবহার করবেন না। সবকিছু লোকালেই প্রসেস হয়।</span>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500">
        Pro-tip: Batch size 5–20 দিয়ে দ্রুত লুকআপ টেবিল বানান। “Export JSON” এ ক্লিক করে রেজাল্ট ডাউনলোড করুন। Welcome to the cutting edge 🌐
      </div>
    </div>
  );
}
