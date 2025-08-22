"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Clipboard, Check, Download, RefreshCcw, Info } from "lucide-react";
import { Address6 } from "ip-address";

// ---------------------------------------------
// Network Toolkit — IPv4/IPv6 Subnet Calculator
// - Tabs: IPv4 Subnet, IPv4 by Needed IPs, IPv6 Calculator
// - Modern UI (Tailwind), dark mode ready
// - Copy buttons, validation, helpful messages
// - Export results to JSON/CSV
// - Donut charts for distribution visuals
// ---------------------------------------------

// IPv4 helpers
const subnetOptions = [
  { label: "/30 - 255.255.255.252", value: 30 },
  { label: "/29 - 255.255.255.248", value: 29 },
  { label: "/28 - 255.255.255.240", value: 28 },
  { label: "/27 - 255.255.255.224", value: 27 },
  { label: "/26 - 255.255.255.192", value: 26 },
  { label: "/25 - 255.255.255.128", value: 25 },
  { label: "/24 - 255.255.255.0", value: 24 },
  { label: "/23 - 255.255.254.0", value: 23 },
  { label: "/22 - 255.255.252.0", value: 22 },
  { label: "/21 - 255.255.248.0", value: 21 },
  { label: "/20 - 255.255.240.0", value: 20 },
  { label: "/19 - 255.255.224.0", value: 19 },
  { label: "/18 - 255.255.192.0", value: 18 },
  { label: "/17 - 255.255.128.0", value: 17 },
  { label: "/16 - 255.255.0.0", value: 16 },
  { label: "/15 - 255.254.0.0", value: 15 },
  { label: "/14 - 255.252.0.0", value: 14 },
  { label: "/13 - 255.248.0.0", value: 13 },
  { label: "/12 - 255.240.0.0", value: 12 },
  { label: "/11 - 255.224.0.0", value: 11 },
  { label: "/10 - 255.192.0.0", value: 10 },
  { label: "/9 - 255.128.0.0", value: 9 },
  { label: "/8 - 255.0.0.0", value: 8 }
];

function isValidIPv4(ip: string) {
  // Basic IPv4 validation
  const m = ip.match(/^([0-9]{1,3}\.){3}[0-9]{1,3}$/);
  if (!m) return false;
  return ip.split(".").every((o) => {
    const n = Number(o);
    return n >= 0 && n <= 255 && o === String(n);
  });
}
function ipToInt(ip: string) {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}
function intToIp(int: number) {
  return [24, 16, 8, 0].map((s) => ((int >>> s) & 255)).join(".");
}
function maskFromCidr(cidr: number) {
  const mask = (0xffffffff << (32 - cidr)) >>> 0;
  return intToIp(mask);
}
function wildcardFromMask(mask: string) {
  return mask
    .split(".")
    .map((octet) => (255 - parseInt(octet, 10)).toString())
    .join(".");
}
function binaryMask(mask: string) {
  return mask
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join(".");
}
function getClass(ip: string) {
  const first = parseInt(ip.split(".")[0], 10);
  if (first < 128) return "A";
  if (first < 192) return "B";
  if (first < 224) return "C";
  if (first < 240) return "D";
  return "E";
}
function isPrivate(ip: string) {
  const parts = ip.split(".").map(Number);
  if (parts[0] === 10) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  return false;
}

// UI helpers
const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(String(text));
  } catch (_) {}
};
const downloadFile = (data: string, filename: string, type: string) => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export default function NetworkToolkit() {
  const [tab, setTab] = useState<"ipv4" | "need" | "ipv6">("ipv4");

  // IPv4 state
  const [ip4, setIp4] = useState("10.10.10.10");
  const [cidr4, setCidr4] = useState(29);

  const ipv4Valid = useMemo(() => isValidIPv4(ip4), [ip4]);

  const mask = useMemo(() => maskFromCidr(cidr4), [cidr4]);
  const maskInt = useMemo(() => ipToInt(mask), [mask]);
  const wildcard = useMemo(() => wildcardFromMask(mask), [mask]);
  const binary = useMemo(() => binaryMask(mask), [mask]);
  const ipInt = useMemo(() => (ipv4Valid ? ipToInt(ip4) : 0), [ip4, ipv4Valid]);
  const networkInt = useMemo(() => (ipInt & maskInt) >>> 0, [ipInt, maskInt]);
  const broadcastInt = useMemo(() => (networkInt | (~maskInt >>> 0)) >>> 0, [networkInt, maskInt]);
  const totalHosts = useMemo(() => Math.pow(2, 32 - cidr4), [cidr4]);
  const usableHosts = useMemo(() => (totalHosts > 2 ? totalHosts - 2 : 0), [totalHosts]);
  const firstUsable = useMemo(() => (totalHosts > 2 ? intToIp(networkInt + 1) : "-"), [totalHosts, networkInt]);
  const lastUsable = useMemo(() => (totalHosts > 2 ? intToIp(broadcastInt - 1) : "-"), [totalHosts, broadcastInt]);
  const network = useMemo(() => intToIp(networkInt), [networkInt]);
  const broadcast = useMemo(() => intToIp(broadcastInt), [broadcastInt]);
  const ipClass = useMemo(() => (ipv4Valid ? getClass(ip4) : "-"), [ipv4Valid, ip4]);
  const ipType = useMemo(() => (ipv4Valid ? (isPrivate(ip4) ? "Private" : "Public") : "-"), [ipv4Valid, ip4]);

  // Export payload for IPv4
  const ipv4Result = useMemo(
    () => ({
      input: { ip: ip4, cidr: cidr4 },
      results: {
        network,
        broadcast,
        firstUsable,
        lastUsable,
        totalHosts,
        usableHosts,
        mask,
        wildcard,
        binaryMask: binary,
        ipClass,
        ipType
      }
    }),
    [ip4, cidr4, network, broadcast, firstUsable, lastUsable, totalHosts, usableHosts, mask, wildcard, binary, ipClass, ipType]
  );

  // IPv6 state
  const [ip6, setIp6] = useState("2001:db8::1");
  const [prefix6, setPrefix6] = useState(64);
  const [ipv6Error, setIpv6Error] = useState("");

  const ipv6Calc = useMemo(() => {
    try {
      setIpv6Error("");
  const addr = new Address6(`${ip6}/${prefix6}`);
  if (!Address6.isValid(`${ip6}/${prefix6}`)) throw new Error("Invalid IPv6");
      const canonical = addr.canonicalForm();
      const start = addr.startAddress().canonicalForm();
      const end = addr.endAddress().canonicalForm();
      // Number of hosts: 2^(128 - prefix)
      const hostBits = 128 - prefix6;
      // Represent big value as string
      const hosts = BigInt(1) << BigInt(hostBits);
      return {
        canonical,
        start,
        end,
        prefix: prefix6,
        hostBits,
        hostCountStr: hosts.toString()
      };
    } catch (e: any) {
      setIpv6Error("Invalid IPv6 address or prefix");
      return null;
    }
  }, [ip6, prefix6]);

  // Charts data
  const ipv4ChartData = useMemo(() => {
    // Show usable vs reserved (network+broadcast)
    const reserved = totalHosts - usableHosts;
    return [
      { name: "Usable", value: usableHosts },
      { name: "Reserved", value: reserved < 0 ? 0 : reserved }
    ];
  }, [totalHosts, usableHosts]);

  const ipv6ChartData = useMemo(() => {
    const networkBits = prefix6;
    const hostBits = 128 - prefix6;
    return [
      { name: "Network bits", value: networkBits },
      { name: "Host bits", value: hostBits }
    ];
  }, [prefix6]);

  // Export handlers
  const handleExportJSON = () => {
    const payload = tab === "ipv6" ? { input: { ip: ip6, prefix: prefix6 }, results: ipv6Calc } : ipv4Result;
    downloadFile(JSON.stringify(payload, null, 2), `netcalc-${tab}.json`, "application/json");
  };
  const handleExportCSV = () => {
    if (tab === "ipv6") {
      const r = ipv6Calc;
      if (!r) return;
      const csv = [
        ["canonical", "start", "end", "prefix", "hostBits", "hostCount"].join(','),
        [r.canonical, r.start, r.end, r.prefix, r.hostBits, r.hostCountStr].map((v) => `"${String(v)}"`).join(',')
      ].join("\n");
      downloadFile(csv, `netcalc-ipv6.csv`, "text/csv");
    } else {
      const r = ipv4Result.results;
      const csv = [
        ["ip", "cidr", "network", "broadcast", "firstUsable", "lastUsable", "totalHosts", "usableHosts", "mask", "wildcard", "binaryMask", "ipClass", "ipType"].join(','),
        [ip4, `/${cidr4}`, r.network, r.broadcast, r.firstUsable, r.lastUsable, r.totalHosts, r.usableHosts, r.mask, r.wildcard, r.binaryMask, r.ipClass, r.ipType].map((v) => `"${String(v)}"`).join(',')
      ].join("\n");
      downloadFile(csv, `netcalc-ipv4.csv`, "text/csv");
    }
  };

  // Copy feedback state
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold">Network Toolkit — IPv4/IPv6 Subnet Calculator</h2>
        <div className="flex gap-2">
          <button onClick={handleExportJSON} className="px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"><Download size={16}/> JSON</button>
          <button onClick={handleExportCSV} className="px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"><Download size={16}/> CSV</button>
          <button onClick={() => window.location.reload()} className="px-3 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"><RefreshCcw size={16}/> Reset</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {[
          { key: "ipv4", label: "IPv4 Subnet" },
          { key: "need", label: "IPv4 by Needed IPs" },
          { key: "ipv6", label: "IPv6 Calculator" }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              tab === t.key ? "bg-blue-600 text-white shadow" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "ipv4" && (
          <motion.div key="ipv4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Form */}
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div>
                <label className="block font-medium mb-1">IP ঠিকানা (IPv4)</label>
                <input
                  type="text"
                  value={ip4}
                  onChange={(e) => setIp4(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300 ${
                    ipv4Valid ? "border-gray-300" : "border-red-400"
                  }`}
                  placeholder="e.g., 192.168.1.10"
                />
                {!ipv4Valid && (
                  <div className="text-xs text-red-600 mt-1">Invalid IPv4 address</div>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">সাবনেট (CIDR)</label>
                <select
                  value={cidr4}
                  onChange={(e) => setCidr4(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
                >
                  {subnetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ResultCard
                  title="নেটওয়ার্ক তথ্য (IPv4)"
                  items={[
                    ["IP ঠিকানা", ip4],
                    ["নেটওয়ার্ক ঠিকানা", network],
                    ["ব্যবহারযোগ্য IP রেঞ্জ", `${firstUsable} - ${lastUsable}`],
                    ["ব্রডকাস্ট ঠিকানা", broadcast],
                    ["মোট হোস্ট সংখ্যা", totalHosts],
                    ["ব্যবহারযোগ্য হোস্ট সংখ্যা", usableHosts],
                    ["সাবনেট মাস্ক", mask],
                    ["ওয়াইল্ডকার্ড মাস্ক", wildcard],
                    ["বাইনারি মাস্ক", binary],
                    ["IP ক্লাস", ipClass],
                    ["CIDR নোটেশন", `/${cidr4}`],
                    ["IP টাইপ", ipType]
                  ]}
                />
              </div>
              <div className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-900">
                <h4 className="font-semibold mb-3">Subnet Distribution</h4>
                <PieChart width={280} height={220}>
                  <Pie data={ipv4ChartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80}>
                    {ipv4ChartData.map((_, i) => (
                      <Cell key={i} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-1"><Info size={14}/>Reserved = network + broadcast</p>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "need" && (
          <motion.div key="need" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SubnetByNeededIPs />
          </motion.div>
        )}

        {tab === "ipv6" && (
          <motion.div key="ipv6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div>
                <label className="block font-medium mb-1">IPv6 ঠিকানা</label>
                <input
                  type="text"
                  value={ip6}
                  onChange={(e) => setIp6(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300 ${
                    ipv6Error ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="e.g., 2001:db8::1"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Prefix (/n)</label>
                <input
                  type="number"
                  min={0}
                  max={128}
                  value={prefix6}
                  onChange={(e) => setPrefix6(Math.min(128, Math.max(0, Number(e.target.value))))}
                  className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            {ipv6Error && <div className="text-sm text-red-600 mb-3">{ipv6Error}</div>}

            {ipv6Calc && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ResultCard
                    title="নেটওয়ার্ক তথ্য (IPv6)"
                    items={[["Canonical", ipv6Calc.canonical],["শুরু ঠিকানা", ipv6Calc.start],["শেষ ঠিকানা", ipv6Calc.end],["Prefix", `/${ipv6Calc.prefix}`],["Host bits", ipv6Calc.hostBits],["Host count (2^(128-prefix))", ipv6Calc.hostCountStr]]}
                  />
                </div>
                <div className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-900">
                  <h4 className="font-semibold mb-3">Prefix Composition</h4>
                  <PieChart width={280} height={220}>
                    <Pie data={ipv6ChartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80}>
                      {ipv6ChartData.map((_, i) => (
                        <Cell key={i} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-1"><Info size={14}/>Network bits vs Host bits</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-gray-500 mt-6">Note: IPv6 has no broadcast; address counts are astronomically large — displayed as integers via BigInt.</p>
    </div>
  );
}

function ResultCard({ title, items }: { title: string; items: [string, string | number][] }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-gray-900 shadow-sm">
      <h4 className="font-semibold mb-3 text-center text-lg">{title}</h4>
      <ul className="space-y-2">
        {items.map(([label, value], idx) => (
          <li key={idx} className="flex justify-between items-center gap-3">
            <span className="text-gray-600 dark:text-gray-400">{label}:</span>
            <span className="font-mono text-blue-700 dark:text-blue-400 break-all flex items-center gap-2">
              {String(value)}
              <button
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  copy(String(value));
                  setCopiedIndex(idx);
                  setTimeout(() => setCopiedIndex(null), 1200);
                }}
                title="Copy"
              >
                {copiedIndex === idx ? <Check size={16} /> : <Clipboard size={16} />}
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubnetByNeededIPs() {
  const [ip, setIp] = useState("192.168.1.0");
  const [needed, setNeeded] = useState(5);

  const valid = isValidIPv4(ip);

  const calculateSubnet = (needed: number) => {
    let cidr = 32;
    let usable = 0;
    for (let i = 30; i >= 1; i--) {
      const hosts = Math.pow(2, 32 - i);
      const usableHosts = hosts > 2 ? hosts - 2 : 0;
      if (usableHosts >= needed) {
        cidr = i;
        usable = usableHosts;
        break;
      }
    }
    return { cidr, usable };
  };

  const { cidr, usable } = calculateSubnet(needed);
  const mask = maskFromCidr(cidr);
  const maskInt = ipToInt(mask);
  const ipInt = valid ? ipToInt(ip) : 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const network = intToIp(networkInt);
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const broadcast = intToIp(broadcastInt);
  const firstUsable = usable > 0 ? intToIp(networkInt + 1) : "-";
  const lastUsable = usable > 0 ? intToIp(broadcastInt - 1) : "-";
  const totalHosts = Math.pow(2, 32 - cidr);
  const chartData = [
    { name: "Usable", value: usable },
    { name: "Reserved", value: totalHosts - usable }
  ];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div>
          <label className="block font-medium mb-1">IP ঠিকানা (IPv4)</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300 ${
              valid ? "border-gray-300" : "border-red-400"
            }`}
            placeholder="e.g., 10.0.0.0"
          />
          {!valid && <div className="text-xs text-red-600 mt-1">Invalid IPv4 address</div>}
        </div>
        <div>
          <label className="block font-medium mb-1">প্রয়োজনীয় ব্যবহারযোগ্য IP সংখ্যা</label>
          <input
            type="number"
            value={needed}
            onChange={(e) => setNeeded(Math.max(1, Number(e.target.value)))}
            min={1}
            className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ResultCard
            title="ফলাফল (IPv4 by Need)"
            items={[["নেটওয়ার্ক ঠিকানা", network],["ব্রডকাস্ট ঠিকানা", broadcast],["ব্যবহারযোগ্য IP রেঞ্জ", `${firstUsable} - ${lastUsable}`],["সাবনেট মাস্ক", mask],["CIDR নোটেশন", `/${cidr}`],["ব্যবহারযোগ্য হোস্ট সংখ্যা", usable]]}
          />
        </div>
        <div className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-900">
          <h4 className="font-semibold mb-3">Subnet Distribution</h4>
          <PieChart width={280} height={220}>
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80}>
              {chartData.map((_, i) => (
                <Cell key={i} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
