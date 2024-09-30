"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { siteConfig } from "@/src/config/site";

// import { ThemeSwitch } from "@/src/components/theme-switch";

export const Navbar = () => {
  return (
    <div className="relative">
      <NextUINavbar
        className="bg-transparent fixed top-0 left-0 w-full z-20"
        isBlurred={false}
        maxWidth="xl"
        position="sticky"
      >
        {/* <NextUINavbar className="bg-transparent" maxWidth="xl" position="sticky"> */}
        {/* <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center " href="/">
              <Image
                alt="fishCove logo"
                className=" mb-2"
                height={60}
                src={logo}
                width={60}
              />{" "}
              <p className="font-semibold font-ralewayDots text-3xl text-customBlue ">
                fishCove
              </p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent> */}

        <NavbarContent className=" basis-1 pl-4" justify="end">
          {/* <ThemeSwitch /> */}
          <div>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  // isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>

                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu className="bg-[#F4E3D7] md:w-1/3 w-full md:left-2/3 fixed top-0 z-10 max-h-screen">
          <div className="mx-12 mt-24 flex flex-col gap-2 text-text-default  top-0">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="hover:text-primary/70 hover:font-semibold transition-colors text-4xl my-3 text-[#FF7F50]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
};
