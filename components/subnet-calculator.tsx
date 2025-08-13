"use client";
import React, { useState } from "react";

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
  { label: "/8 - 255.0.0.0", value: 8 },
  { label: "/7 - 254.0.0.0", value: 7 },
  { label: "/6 - 252.0.0.0", value: 6 },
  { label: "/5 - 248.0.0.0", value: 5 },
  { label: "/4 - 240.0.0.0", value: 4 },
  { label: "/3 - 224.0.0.0", value: 3 },
  { label: "/2 - 192.0.0.0", value: 2 },
  { label: "/1 - 128.0.0.0", value: 1 },
  { label: "/0 - 0.0.0.0", value: 0 },
];

function ipToInt(ip: string) {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}
function intToIp(int: number) {
  return [24, 16, 8, 0].map(s => (int >> s) & 255).join(".");
}
function maskFromCidr(cidr: number) {
  const mask = 0xffffffff << (32 - cidr);
  return intToIp(mask >>> 0);
}
function wildcardFromMask(mask: string) {
  return mask.split(".").map(octet => (255 - parseInt(octet, 10)).toString()).join(".");
}
function binaryMask(mask: string) {
  return mask.split(".").map(octet => parseInt(octet, 10).toString(2).padStart(8, "0")).join(".");
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
function ipv4Mapped(ip: string) {
  return `::ffff:${ip.split(".").map(x => parseInt(x, 10).toString(16).padStart(2, "0")).join(".")}`;
}

export default function SubnetCalculator() {
  const [ip, setIp] = useState("10.10.10.10");
  const [cidr, setCidr] = useState(29);
  const [tab, setTab] = useState(0);

  const ipInt = ipToInt(ip);
  const mask = maskFromCidr(cidr);
  const maskInt = ipToInt(mask);
  const wildcard = wildcardFromMask(mask);
  const binary = binaryMask(mask);
  const networkInt = ipInt & maskInt;
  const network = intToIp(networkInt);
  const broadcastInt = networkInt | (~maskInt >>> 0);
  const broadcast = intToIp(broadcastInt);
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;
  const firstUsable = totalHosts > 2 ? intToIp(networkInt + 1) : "-";
  const lastUsable = totalHosts > 2 ? intToIp(broadcastInt - 1) : "-";
  const ipClass = getClass(ip);
  const ipType = isPrivate(ip) ? "Private" : "Public";

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 rounded-2xl shadow-lg bg-white">
      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
        {["সাবনেট ক্যালকুলেটর", "প্রয়োজনীয় IP সংখ্যা"].map((label, index) => (
          <button
            key={index}
            onClick={() => setTab(index)}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              tab === index ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 0 ? (
        <>
          {/* Form */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div>
              <label className="block font-medium mb-1">IP ঠিকানা</label>
              <input
                type="text"
                value={ip}
                onChange={e => setIp(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">সাবনেট (CIDR)</label>
              <select
                value={cidr}
                onChange={e => setCidr(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
              >
                {subnetOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div>
            <ResultCard title="নেটওয়ার্ক তথ্য" items={[
              ["IP ঠিকানা", ip],
              ["নেটওয়ার্ক ঠিকানা", network],
              ["ব্যবহারযোগ্য IP রেঞ্জ", `${firstUsable} - ${lastUsable}`],
              ["ব্রডকাস্ট ঠিকানা", broadcast],
              ["মোট হোস্ট সংখ্যা", totalHosts],
              ["ব্যবহারযোগ্য হোস্ট সংখ্যা", usableHosts],
              ["সাবনেট মাস্ক", mask],
              ["ওয়াইল্ডকার্ড মাস্ক", wildcard],
              ["বাইনারি মাস্ক", binary],
              ["IP ক্লাস", ipClass],
              ["CIDR নোটেশন", `/${cidr}`],
              ["IP টাইপ", ipType],
            ]} />
          </div>
        </>
      ) : (
        <SubnetByNeededIPs />
      )}
    </div>
  );
}

function ResultCard({ title, items }: { title: string; items: [string, string | number][] }) {
  return (
    <div className="p-4 border rounded-xl bg-gray-50 shadow-sm">
      <h4 className="font-semibold mb-3 text-center">{title}</h4>
      <ul>
        {items.map(([label, value], idx) => (
          <li key={idx} className="flex justify-between">
            <span className="text-gray-600">{label}:</span>
            <span className="font-mono text-blue-600">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubnetByNeededIPs() {
  const [ip, setIp] = useState("192.168.1.0");
  const [needed, setNeeded] = useState(5);

  // Calculate cidr and usable hosts based on needed
  const calculateSubnet = (needed: number) => {
    let cidr = 32, usable = 0;
    for (let i = 30; i >= 1; i--) {
      const hosts = Math.pow(2, 32 - i);
      const usableHosts = hosts > 2 ? hosts - 2 : 0;
      if (usableHosts >= needed) {
        cidr = i; usable = usableHosts; break;
      }
    }
    return { cidr, usable };
  };

  const { cidr, usable } = calculateSubnet(needed);
  const mask = maskFromCidr(cidr);
  const maskInt = ipToInt(mask);
  const ipInt = ipToInt(ip);
  const networkInt = ipInt & maskInt;
  const network = intToIp(networkInt);
  const broadcastInt = networkInt | (~maskInt >>> 0);
  const broadcast = intToIp(broadcastInt);
  const firstUsable = usable > 0 ? intToIp(networkInt + 1) : "-";
  const lastUsable = usable > 0 ? intToIp(broadcastInt - 1) : "-";

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div>
          <label className="block font-medium mb-1">IP ঠিকানা</label>
          <input
            type="text"
            value={ip}
            onChange={e => setIp(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">প্রয়োজনীয় ব্যবহারযোগ্য IP সংখ্যা</label>
          <input
            type="number"
            value={needed}
            onChange={e => setNeeded(Number(e.target.value))}
            min={1}
            className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
      <ResultCard title="ফলাফল" items={[
        ["নেটওয়ার্ক ঠিকানা", network],
        ["ব্রডকাস্ট ঠিকানা", broadcast],
        ["ব্যবহারযোগ্য IP রেঞ্জ", `${firstUsable} - ${lastUsable}`],
        ["সাবনেট মাস্ক", mask],
        ["CIDR নোটেশন", `/${cidr}`],
        ["ব্যবহারযোগ্য হোস্ট সংখ্যা", usable],
      ]} />
    </div>
  );
}
