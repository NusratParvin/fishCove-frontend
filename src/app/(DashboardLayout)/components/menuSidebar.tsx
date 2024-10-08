"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import UserProfileCard from "../user/components/profileCard";
import ModalButton from "../user/components/modalButton";

import { adminLinks, userLinks } from "./sidebar/constants";

import { useCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";

export default function MenuSidebar() {
  const user = useAppSelector(useCurrentUser);

  const menuItems = user?.role === "ADMIN" ? adminLinks : userLinks;

  return (
    <div className="flex flex-col h-screen w-full py-4 px-6 bg-secondary/20 border-r border-divider">
      {/* User Avatar */}
      <div className="w-full mt-16 ">
        <UserProfileCard />
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col my-4">
        {menuItems.map((link) => (
          <Button
            key={link.href}
            fullWidth
            as={Link}
            className="justify-start font-medium text-base h-10"
            href={link.href}
            startContent={link.icon}
            variant="light"
          >
            {link.label}
          </Button>
        ))}
      </nav>

      {user?.role === "USER" && <ModalButton />}
    </div>
  );
}
