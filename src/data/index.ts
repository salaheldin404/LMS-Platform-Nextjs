import {
  LuBriefcase,
  LuPalette,
  LuMegaphone,
  LuCamera,
  LuMusic,
  LuHeartPulse,
  LuBrainCircuit,
} from "react-icons/lu";
import { BsTerminal } from "react-icons/bs";

export const categoriesData = [
  {
    value: "52 Courses",
    label: "Business",
    icon: LuBriefcase,
    iconColor: "#3b82f6", // text-blue-500
    bgColor: "#bfdbfe", // bg-blue-200
  },
  {
    value: "22 Courses",
    label: "IT & Software",
    icon: BsTerminal,
    iconColor: "#f97316", // text-orange-500
    bgColor: "#fed7aa", // bg-orange-200
  },
  {
    value: "35 Courses",
    label: "Design",
    icon: LuPalette,
    iconColor: "#a855f7", // text-purple-500
    bgColor: "#e9d5ff", // bg-purple-200
  },
  {
    value: "40 Courses",
    label: "Marketing",
    icon: LuMegaphone,
    iconColor: "#22c55e", // text-green-500
    bgColor: "#bbf7d0", // bg-green-200
  },
  {
    value: "18 Courses",
    label: "Photography",
    icon: LuCamera,
    iconColor: "#ef4444", // text-red-500
    bgColor: "#fecaca", // bg-red-200
  },
  {
    value: "25 Courses",
    label: "Music",
    icon: LuMusic,
    iconColor: "#eab308", // text-yellow-500
    bgColor: "#fef08a", // bg-yellow-200
  },
  {
    value: "30 Courses",
    label: "Health",
    icon: LuHeartPulse,
    iconColor: "#ec4899", // text-pink-500
    bgColor: "#fbcfe8", // bg-pink-200
  },
  {
    value: "28 Courses",
    label: "Development",
    icon: LuBrainCircuit,
    iconColor: "#14b8a6", // text-teal-500
    bgColor: "#99f6e4", // bg-teal-200
  },
];
