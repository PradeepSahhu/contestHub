"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt, FaSort } from "react-icons/fa";
import { FaFilter, FaSearch } from "react-icons/fa";
import Image from "next/image";
import moment from "moment";

const platformsData = [
  {
    name: "LeetCode Weekly",
    url: "https://leetcode.com/contest/",
    logo: "/leetcode.png",
    time: "2025-03-15T22:30:00+05:30",
  },
  {
    name: "LeetCode Biweekly",
    url: "https://leetcode.com/contest/",
    logo: "/leetcode.png",
    time: "2025-03-16T20:00:00+05:30",
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/contests",
    logo: "/codeforces.png",
    time: "2025-03-17T18:00:00+05:30",
  },
  {
    name: "GeeksforGeeks",
    url: "https://practice.geeksforgeeks.org/contest",
    logo: "/geeksforgeeks.png",
    time: "2025-03-18T19:00:00+05:30",
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/contests",
    logo: "/codechef.png",
    time: "2025-03-14T21:30:00+05:30",
  },
  {
    name: "AtCoder",
    url: "https://atcoder.jp/contests/",
    logo: "/atcoder.png",
    time: "2025-03-15T13:30:00+05:30",
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/contests",
    logo: "/hackerrank.png",
    time: "2025-03-19T17:00:00+05:30",
  },
  {
    name: "HackerEarth",
    url: "https://www.hackerearth.com/challenges/",
    logo: "/hackerEarth.png",
    time: "2025-03-20T20:30:00+05:30",
  },
];

const getTimeRemaining = (contestTime) => {
  const now = moment();
  const contestMoment = moment(contestTime);
  const duration = moment.duration(contestMoment.diff(now));
  return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m`;
};

const Card = ({ platform }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(platform.time)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(platform.time));
    }, 60000);
    return () => clearInterval(interval);
  }, [platform.time]);

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-800 rounded-2xl shadow-md">
      <div className="flex items-center gap-4">
        <Image
          src={platform.logo}
          alt={platform.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{platform.name}</h2>
          <p className="text-gray-400 text-sm">
            {moment(platform.time).format("LLL")}
          </p>
          <p className="text-red-400 font-bold text-sm">
            Starts in: {timeRemaining}
          </p>
        </div>
      </div>
      <Button
        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white"
        onClick={() => window.open(platform.url, "_blank")}
      >
        Visit <FaExternalLinkAlt />
      </Button>
    </div>
  );
};

export default function Home() {
  const [platforms, setPlatforms] = useState(platformsData);
  const [ascending, setAscending] = useState(true);

  const sortContests = () => {
    const sortedPlatforms = [...platforms].sort((a, b) =>
      ascending
        ? moment(a.time).diff(moment(b.time))
        : moment(b.time).diff(moment(a.time))
    );
    setPlatforms(sortedPlatforms);
    setAscending(!ascending);
  };

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col  text-white">
      <h1 className="text-3xl font-bold text-center mb-6">
        Upcoming coding Contest
      </h1>

      <div className="flex gap-x-10">
        <Button
          className="flex w-40 px-10 gap-2 mb-4 bg-gray-700 hover:bg-gray-600 text-white"
          onClick={sortContests}
        >
          Sort by Time <FaSort />
        </Button>
        <Button
          className="flex w-40 px-10 gap-2 mb-4 bg-gray-700 hover:bg-gray-600 text-white"
          // onClick={filterContests}
        >
          Filter by Platform <FaFilter />
        </Button>
        <Button
          className="flex w-40 px-10 gap-2 mb-4 bg-gray-700 hover:bg-gray-600 text-white"
          // onClick={searchContests}
        >
          Search Contest <FaSearch />
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-4">
          {platforms.map((platform) => (
            <Card key={platform.name} platform={platform} />
          ))}
        </div>
      </div>
    </div>
  );
}
