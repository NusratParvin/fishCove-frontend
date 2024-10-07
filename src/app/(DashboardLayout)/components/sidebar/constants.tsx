import { Home, User, Settings, Bookmark, Pen } from "lucide-react";

export const userLinks = [
  { href: "/user/newsfeed", label: "News Feed", icon: <Home size={16} /> },
  {
    href: "/user/profile",
    label: "My Profile",
    icon: <User size={16} />,
  },
  {
    href: "/user/manage-articles",
    label: "Manage Articles",
    icon: <Pen size={16} />,
  },
];

export const adminLinks = [
  {
    href: "/admin/dashboard",
    label: "Admin Dashboard",
    icon: <Home size={16} />,
  },
  {
    href: "/admin/manage-users",
    label: "Manage Users",
    icon: <User size={16} />,
  },
  {
    href: "/admin/manage-posts",
    label: "Manage Posts",
    icon: <Bookmark size={16} />,
  },
  {
    href: "/admin/settings",
    label: "Admin Settings",
    icon: <Settings size={16} />,
  },
];
