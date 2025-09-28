"use client";
import clsx from "clsx";
import React, { Suspense, useEffect, useState } from "react";
import FilterList from "./filter";

const COLLECTIONS_DATA = [
  {
    title: "Solar Panels",
    slug: "solar-panels",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Solar Batteries",
    slug: "solar-batteries",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Inverters",
    slug: "inverters",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Security Cameras",
    slug: "security-cameras",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "LED Lights",
    slug: "led-lights",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Electrical Tools",
    slug: "electrical-tools",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Smart Home",
    slug: "smart-home",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Cables & Wires",
    slug: "cables-wires",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },

  // Additional categories
  {
    title: "Thermostats",
    slug: "thermostats",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Motion Sensors",
    slug: "motion-sensors",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Smart Plugs",
    slug: "smart-plugs",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  // { title: "Energy Meters", slug: "energy-meters", sortKey: "BEST_SELLING" as "BEST_SELLING", reverse: false },
  // { title: "EV Chargers", slug: "ev-chargers", sortKey: "BEST_SELLING" as "BEST_SELLING", reverse: false },
  // { title: "Solar Water Heaters", slug: "solar-water-heaters", sortKey: "BEST_SELLING" as "BEST_SELLING", reverse: false },
  // { title: "Smart Doorbells", slug: "smart-doorbells", sortKey: "BEST_SELLING" as "BEST_SELLING", reverse: false },
  // { title: "Home Automation Kits", slug: "home-automation-kits", sortKey: "BEST_SELLING" as "BEST_SELLING", reverse: false },
  {
    title: "Power Banks",
    slug: "power-banks",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Surge Protectors",
    slug: "surge-protectors",
    sortKey: "BEST_SELLING" as "BEST_SELLING",
    reverse: false,
  },
];

async function CollectionList() {
  const collections = await new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(COLLECTIONS_DATA);
    }, 2000);
  });

  return <FilterList list={collections} title="Collections" />;
}

const skeletonBase = "mb-3 h-4 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

// Generate a random Tailwind width class
const getRandomWidth = () => {
  const widths = [
    "w-1/2",
    "w-2/3",
    "w-3/4",
    "w-4/5",
    "w-5/6",
    "w-full",
    "w-[60%]",
    "w-[70%]",
    "w-[80%]",
  ];
  return widths[Math.floor(Math.random() * widths.length)];
};

export default function Collections() {
  const [collections, setCollections] = useState<typeof COLLECTIONS_DATA>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch
    const timer = setTimeout(() => {
      setCollections(COLLECTIONS_DATA);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="col-span-2 hidden h-[400px]  w-full flex-none py-4 lg:block z-10">
        <div
          className={clsx(skeletonBase, getRandomWidth(), activeAndTitles)}
        />
        <div
          className={clsx(skeletonBase, getRandomWidth(), activeAndTitles)}
        />
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={clsx(skeletonBase, getRandomWidth(), items)}
          />
        ))}
      </div>
    );
  }

  return <FilterList list={collections} title="Collections" />;
}
