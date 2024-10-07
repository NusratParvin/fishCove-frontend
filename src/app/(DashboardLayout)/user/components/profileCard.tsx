"use client";
import { Avatar, Card, Divider } from "@nextui-org/react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

import { useCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";

const UserProfileCard = () => {
  const user = useAppSelector(useCurrentUser);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <h2 className="text-red-500">No user data available</h2>
      </div>
    );
  }

  return (
    <Card className="flex flex-col justify-center w-[200px] p-4 rounded-sm bg-transparent text-black/80">
      {/* User Avatar */}
      <Avatar
        alt={user?.name}
        className="mx-auto rounded-full"
        size="lg"
        src={user?.profilePhoto}
      />

      <Divider className="my-2 divide-gray-100" />

      <div className="text-center">
        <h2 className="font-semibold text-sm">{user?.name}</h2>
        <h2 className="px-5 text-gray-600 text-xs">
          {user?.address || "No address available"}
        </h2>
      </div>

      <Divider className="my-2 dark:divide-gray-300" />

      <div className="flex justify-center pt-2 space-x-4 mb-2">
        <Link aria-label="Facebook" href="/">
          <Facebook className="text-customBlue/80 w-4 h-4" />
        </Link>
        <Link aria-label="Twitter" href="/">
          <Twitter className="text-customBlue/80 w-4 h-4" />
        </Link>
        <Link aria-label="Linkedin" href="/">
          <Linkedin className="text-customBlue/80 w-4 h-4" />
        </Link>
        <Link aria-label="Instagram" href="/">
          <Instagram className="text-customBlue/80 w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
};

export default UserProfileCard;
