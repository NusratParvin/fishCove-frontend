"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

import UserProfileCard from "../user/components/profileCard";
import ModalButton from "../user/components/modalButton";

import { adminLinks, userLinks } from "./sidebar/constants";

import { useCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import image from "@/src/assets/images/Fish-logo-template-on-transparent-background-PNG.png";

export default function MenuSidebar() {
  const user = useAppSelector(useCurrentUser);

  const menuItems = user?.role === "ADMIN" ? adminLinks : userLinks;

  return (
    // <div className="flex flex-col h-screen  w-full py-4 px-8 bg-secondary/20 border-r border-divider">
    //   <div className="mb-4 ">
    //     <Link className="flex items-center justify-center mb-6" href="/">
    //       <Image
    //         alt="logo"
    //         className="w-12 h-12"
    //         height={40}
    //         src={image}
    //         width={40}
    //       />
    //       <p className="font-normal font-raleway text-4xl text-[#FF7F50] tracking-tighter">
    //         <span className="italic font-semibold">fish</span>Cove
    //       </p>
    //     </Link>{" "}
    //   </div>

    //   {/* User Avatar */}
    //   <div className="">
    //     <UserProfileCard />
    //   </div>

    //   {/* Navigation Menu */}
    //   <nav className="flex flex-col my-4 ">
    //     {menuItems.map((item, index) => (
    //       <Button
    //         key={index}
    //         className="justify-start mb-2 font-semibold text-black/70"
    //         startContent={item.icon}
    //         variant="light"
    //       >
    //         {item.label}
    //       </Button>
    //     ))}
    //   </nav>

    //   <Button className="bg-highlight text-white text-base font-bold rounded-full">
    //     {user?.role === "ADMIN" ? "Admin Action" : "Post Article"}
    //   </Button>
    // </div>

    <div className="flex flex-col h-screen w-full py-4 px-6 bg-secondary/20 border-r border-divider">
      <div className="mb-4">
        <Link className="flex items-center justify-center mb-6" href="/">
          <Image
            alt="logo"
            className="w-12 h-12"
            height={40}
            src={image}
            width={40}
          />
          <p className="font-normal font-raleway text-4xl text-[#FF7F50] tracking-tighter">
            <span className="italic font-semibold">fish</span>Cove
          </p>
        </Link>
      </div>

      {/* User Avatar */}
      <div className="w-full  ">
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
