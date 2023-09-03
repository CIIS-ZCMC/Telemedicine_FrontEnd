import SystemLogo from "../assets/zcmc_logo.png";
import {
  FaUsers,
  FaUserFriends,
  FaHospitalUser,
  FaRegHospital,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import { BsArchive } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { TbFileReport } from "react-icons/tb";
import { RiFileListFill } from "react-icons/ri";
import { create } from "zustand";

import Dashboard from "../Pages/Dashboard/Dashboard";
import Doctors from "../Pages/Doctor/Doctor";
import User from "../Pages/User/User";
import Patients from "../Pages/Patient";
import Cases from "../Pages/Case";
import Archived from "../Pages/Archived";
import Hospital from "../Pages/Hospital/Hospital";
import Specialization from "../Pages/Specialization/Specialization";
import Report from "../Pages/Report/Report";
import History from "../Pages/History/History";

const morning = [
  "Good morning",
  "Rise and shine!",
  "A new day begins",
  "Wishing you a bright morning",
  "Start your day with positivity",
  "Enjoy the morning breeze",
  "May your morning be filled with joy",
  "Embrace the day with open arms",
  "Make today amazing",
  "Sending you morning blessings",
  "Wake up and seize the day",
  "Have a fantastic morning",
  "Wishing you a productive day ahead",
  "Let the morning sunshine energize you",
  "Good morning! It's a brand new opportunity",
  "May your coffee be strong and your day be wonderful",
  "Sending you warm wishes for a wonderful morning",
  "Embrace the beauty of a fresh morning",
  "A perfect morning to start afresh",
  "Enjoy the tranquility of the morning hours",
  "Greet the day with a smile",
  "Wishing you a peaceful and productive morning",
  "Take a deep breath and enjoy the morning serenity",
  "Good morning! Let the day unfold with endless possibilities",
  "May your morning be filled with laughter and happiness",
  "Start your day with gratitude and positivity",
  "Wishing you a blessed and joyful morning",
  "Enjoy the stillness and calmness of the morning",
  "Wake up with determination and go to bed with satisfaction",
  "Good morning! May your day be as wonderful as you are",
  "Embrace the morning dew and the beauty of nature",
  "Sending you positive vibes for a fabulous morning",
];

const noon = [
  "Good noon",
  "Wishing you a delightful noon",
  "Enjoy your lunch break",
  "Take a moment to relax and recharge",
  "May your afternoon be filled with productivity",
  "Sending you positive energy for a successful day",
  "Enjoy a peaceful and refreshing afternoon",
  "Make the most of your afternoon hours",
  "Wishing you a bright and sunny afternoon",
  "Stay focused and make progress",
  "Embrace the midday hustle",
  "Sending you warm wishes for a productive afternoon",
  "Keep up the great work! The afternoon is yours",
  "Take a break and refresh your mind",
  "Enjoy a well-deserved lunch and recharge",
  "Wishing you a creative and inspiring afternoon",
  "Stay motivated and keep pushing forward",
  "May your afternoon be filled with achievements",
  "Take a deep breath and enjoy the moment",
  "You're doing great! Keep up the momentum",
  "Make the most of your time and seize opportunities",
  "Sending you positive vibes for a successful day",
  "Stay positive and make every minute count",
  "Take a moment to appreciate the progress you've made",
  "Wishing you a fulfilling and rewarding afternoon",
  "Enjoy the afternoon sunshine and stay motivated",
  "Keep shining bright! Success is just around the corner",
  "Make your afternoon as awesome as you are",
  "Sending you best wishes for a productive day",
  "Stay focused and make the most of your afternoon",
  "Embrace the challenges and keep moving forward",
];

const afternoon = [
  "Good afternoon",
  "Enjoy the rest of your day",
  "Stay positive and keep smiling",
  "Wishing you a joyful and productive afternoon",
  "Take a break and rejuvenate your mind",
  "Sending you positive vibes for an amazing afternoon",
  "Make the most of every opportunity",
  "Stay motivated and inspired",
  "May your afternoon be filled with accomplishments",
  "Embrace the afternoon with confidence",
  "Enjoy a peaceful and serene afternoon",
  "Take a moment to appreciate the beauty around you",
  "Sending you warm wishes for a successful day",
  "Stay focused and keep working towards your goals",
  "Wishing you a creative and fulfilling afternoon",
  "Stay determined and keep pushing forward",
  "Take a deep breath and stay positive",
  "You're capable of achieving great things",
  "Make the most of your time and make it count",
  "Sending you best wishes for a wonderful afternoon",
  "Stay strong and embrace the challenges",
  "Take a moment to reflect and refocus",
  "Wishing you continued success and happiness",
  "Enjoy the afternoon sunshine and stay motivated",
  "Keep shining bright! The world needs your light",
  "Make your afternoon as amazing as you are",
  "Sending you positive energy for a productive day",
  "Stay dedicated and make the most of your afternoon",
  "Embrace the opportunities that come your way",
  "Keep moving forward with determination",
  "Wishing you a successful and rewarding afternoon",
];

const night = [
  "Good night",
  "Sweet dreams and sleep well",
  "Wishing you a peaceful night's rest",
  "May your dreams be filled with happiness",
  "Time to recharge and rejuvenate",
  "Reflect on the day and find inner peace",
  "Sending you bedtime blessings",
  "Have a restful and rejuvenating sleep",
  "Let go of the worries and embrace serenity",
  "Wishing you a night filled with sweet dreams",
  "Close your eyes and drift into a peaceful slumber",
  "May you wake up refreshed and energized",
  "Relax and unwind before a good night's sleep",
  "Sending you tranquil vibes for a peaceful night",
  "Surrender to the night and find solace",
  "Let the stars guide you to a peaceful sleep",
  "May your dreams be filled with positivity and hope",
  "Enter the world of dreams and find tranquility",
  "Wishing you a deep and restorative sleep",
  "Embrace the silence and embrace the night",
  "Sending you peaceful thoughts for a good night's rest",
  "Let go of the day and allow yourself to recharge",
  "May your sleep be filled with pleasant dreams",
  "Find comfort in the embrace of the night",
  "Wishing you a night filled with relaxation and peace",
  "Release the tension and surrender to sleep",
  "Sending you bedtime wishes for a restful night",
  "Let the night wash away the worries of the day",
  "Enter a world of dreams and endless possibilities",
  "Wishing you a night of deep sleep and sweet dreams",
  "Relax your mind and let sleep embrace you",
];

const routesDetails = [
  {
    path: "/",
    icon: <MdSpaceDashboard id="dashboard-icon" />,
    label: "Dashboard",
    element: <Dashboard />,
    access: [1, 2, 3, 4, 5],
    hasBadge: false,
    badgeValue: 0,
  },
  {
    path: "/doctors",
    icon: <FaUserMd id="dashboard-icon" />,
    label: "Doctors",
    element: <Doctors />,
    access: [1, 2, 3, 4],
    hasBadge: true,
    badgeValue: 7,
  },
  {
    path: "/users",
    icon: <FaUsers id="dashboard-icon" />,
    label: "Users",
    element: <User />,
    access: [1],
    hasBadge: true,
    badgeValue: 13,
  },
  {
    path: "/patients",
    icon: <FaUserFriends id="dashboard-icon" />,
    label: "Patients",
    element: <Patients />,
    access: [4],
    hasBadge: false,
    badgeValue: 0,
  },
  {
    path: "/case",
    icon: <FaHospitalUser id="dashboard-icon" />,
    label: "Active Case",
    element: <Cases />,
    access: [2, 3, 4, 5],
    hasBadge: true,
    badgeValue: 12,
  },
  {
    path: "/archived",
    icon: <BsArchive id="dashboard-icon" />,
    label: "Archived",
    element: <Archived />,
    access: [2, 3, 4, 5],
    hasBadge: true,
    badgeValue: 11,
  },
  {
    path: "/hospital",
    icon: <FaRegHospital id="dashboard-icon" />,
    label: "Hospital",
    element: <Hospital />,
    access: [1, 2],
    hasBadge: false,
    badgeValue: 0,
  },
  {
    path: "/specialization",
    icon: <GiSkills id="dashboard-icon" />,
    label: "Specialization",
    element: <Specialization />,
    access: [1, 2],
    hasBadge: false,
    badgeValue: 0,
  },
  {
    path: "/report",
    icon: <TbFileReport id="dashboard-icon" />,
    label: "Report",
    element: <Report />,
    access: [1],
    hasBadge: false,
    badgeValue: 0,
  },
  {
    path: "/history-logs",
    icon: <RiFileListFill id="dashboard-icon" />,
    label: "History Logs",
    element: <History />,
    access: [1],
    hasBadge: false,
    badgeValue: 0,
  },
];

const useThemeHook = create((set) => ({
  systemLogo: SystemLogo,
  owner: "Medical Center, Z.C",
  systemName: "TELEMEDICINE",
  primary: "teal",
  fontColor: "#616b71",
  pageHeader: "Dashboard",
  getFilteredRoutes: (userRole) => {
    return userRole === null
      ? routesDetails
      : routesDetails.filter((route) => route.access.includes(userRole));
  },
  contentDescription: "List of Active cases",
  setPage: (form) => set(() => ({ pageHeader: form })),
  greetings: () => {
    const currentHour = new Date().getHours();
    const randomIndex = Math.floor(Math.random() * 30);

    if (currentHour < 12) {
      return morning[randomIndex];
    } else if (currentHour < 13) {
      return noon[randomIndex];
    } else if (currentHour < 18) {
      return afternoon[randomIndex];
    } else {
      return night[randomIndex];
    }
  },
}));

export default useThemeHook;
