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
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { siteConfig } from "@/src/config/site";
import { useGetUserInfoQuery } from "@/src/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentUser } from "@/src/redux/features/auth/authSlice";
import { TUserRole } from "@/src/types";

// import { ThemeSwitch } from "@/src/components/theme-switch";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isUser = useAppSelector(useCurrentUser);

  // console.log(isUser);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/user");
  };

  return (
    <div className="relative">
      <NextUINavbar
        className="bg-transparent fixed top-0 left-0 w-full z-20"
        isBlurred={false}
        maxWidth="xl"
        position="sticky"
      >
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

          {isUser ? (
            <div>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={isUser.name}
                    size="sm"
                    src={
                      isUser?.profilePhoto ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{isUser.email}</p>
                  </DropdownItem>
                  <DropdownItem key="profile" onClick={handleProfileClick}>
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <NavbarMenuItem>
              <Link
                className="hover:text-primary/70 hover:font-semibold transition-colors text-4xl my-3 text-[#FF7F50]"
                href={"/login"}
              >
                Login{" "}
              </Link>
            </NavbarMenuItem>
            // <Button onClick={() => router.push("/login")}>Login</Button>
          )}

          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu className="bg-[#F4E3D7] md:w-1/3 w-full md:left-2/3 fixed top-0 z-20 max-h-screen">
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
