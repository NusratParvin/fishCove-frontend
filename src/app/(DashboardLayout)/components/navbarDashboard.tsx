"use client";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Avatar,
  NavbarBrand,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import image from "@/src/assets/images/Fish-logo-template-on-transparent-background-PNG.png";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, useCurrentUser } from "@/src/redux/features/auth/authSlice";
import { logoutCookies } from "@/src/services/AuthService";

const NavbarDashboard = () => {
  const isUser = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      const result = await logoutCookies();

      if (result.success) {
        dispatch(logout());
        toast.success("Logged out successfully!", {
          id: toastId,
        });

        router.push("/");
      } else {
        toast.error("Failed to log out", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred during logout", { id: toastId });
    }
  };

  const handleDashboardClick = () => {
    router.push("/");
  };

  return (
    // <Navbar className="h-12 bg-customBlue/30 flex flex-row justify-between">
    //   <NavbarContent className="w-1/2">
    //     <NavbarBrand>
    //       <Button
    //         isIconOnly
    //         variant="light"
    //         className="md:hidden"
    //         // onClick={toggleSidebar}
    //       >
    //         {/* <Menu /> */}
    //       </Button>
    //       <div className="">
    //         <Link className="flex items-center justify-center " href="/">
    //           <Image
    //             alt="logo"
    //             className="w-6 h-6"
    //             height={12}
    //             src={image}
    //             width={12}
    //           />
    //           <p className="font-normal font-raleway text-xl text-[#FF7F50] tracking-tighter">
    //             <span className="italic font-semibold">fish</span>Cove
    //           </p>
    //         </Link>
    //       </div>{" "}
    //     </NavbarBrand>
    //   </NavbarContent>
    //   <NavbarContent justify="end" className="w-1/2 border-4">
    //     <NavbarItem>
    //       <Button color="primary" variant="flat">
    //         Logout
    //       </Button>
    //     </NavbarItem>
    //   </NavbarContent>
    // </Navbar>

    <div className="bg-customBlue/30 p-0 grid grid-cols-2 justify-between items-center fixed top-0 z-50 w-screen ">
      {/* Left side content */}
      <Navbar className="md:ps-10 ps-1 bg-blue-100/10" height={46}>
        <NavbarContent justify="start">
          <NavbarBrand>
            <Link className="flex items-center space-x-2 " href="/">
              <Image
                alt="logo"
                className="w-6 h-6"
                height={16}
                src={image}
                width={16}
              />
              <p className="font-normal font-raleway text-2xl  text-[#FF7F50] tracking-tighter">
                <span className="italic font-semibold">fish</span>Cove
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
      </Navbar>
      <Navbar className="md:pe-10 pe-1 bg-blue-100/10" height={46}>
        {/* Right side content */}
        <NavbarContent
          className="flex items-center justify-end space-x-0"
          justify="end"
        >
          {/* User Profile Dropdown */}
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={isUser?.name}
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
                  <p className="font-semibold">{isUser?.role}</p>
                </DropdownItem>
                <DropdownItem key="dashboard" onClick={handleDashboardClick}>
                  Back to Homepage
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
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default NavbarDashboard;
