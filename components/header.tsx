"use client";
import { ContactIcon, Logo, ProfileAvatarIcon } from "@/assets/imageIndex";
import { useExemptedPath } from "@/hooks/useExemptedPath";
import { ChevronDownIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import ProfileMenu from "./ui/profileMenu";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { selectUserName, selectLogoutLoading } from "@/lib/features/auth/authSelector";
import { logout } from "@/lib/features/auth/authThunk";
import { showErrorToast } from "@/lib/utils";
import { toast, ToastT } from "sonner";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathName, isPathExempted } = useExemptedPath();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector(selectUserName);
  const logoutLoading = useSelector(selectLogoutLoading);


  const navItems = [
    { name: "Home", active: true, link: "/" },
    { name: "Search Cars", active: false, link: "/search" },
    { name: "Loans", active: false, link: "/loans" },
    { name: "About Us", active: false, link: "/about" },
    { name: "Contact Us", active: false, link: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const handleLogout = async () => {
       const res = await dispatch(logout()).unwrap();
       if (!showErrorToast(res)) {
         toast.success(String(res));
         setIsProfileMenuOpen(false);
         router.push("/");
       } else {
         const errorResponse = res as Partial<ToastT>;
         toast.error(errorResponse.description);
       }
  };

  return (
    <>
      {!isPathExempted && (
        <div>
          <div className="flex w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 bg-[#23292E]">
            {/* Logo */}

            <div className="flex items-center gap-[4.24px] justify-center">
              <Image
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                alt="Letter e"
                src={Logo}
                width={32}
                height={32}
              />
              <div>
                <div className="text-lg sm:text-xl md:text-2xl leading-[14.7px] [font-family:'DM_Sans',Helvetica] font-medium text-white">
                  Heels
                </div>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <NavigationMenu className="hidden md:block bg-[#2a282880] rounded-2xl backdrop-blur-[1px]">
              <NavigationMenuList className="flex items-center gap-2 lg:gap-3.5 p-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.link}>
                      <NavigationMenuLink
                        asChild
                        className={`flex h-8 lg:h-10  cursor-pointer items-center justify-center px-2 lg:p-2.5 rounded-lg hover:border-primary  hover:bg-transparent hover:rounded-none hover:border-b-2 transition-colors ${
                          pathName === item.link || (item.link === "/search" && pathName.startsWith("/search"))
                            ? "rounded-none border-b-2 border-white"
                            : "border-b-2 border-transparent rounded-none"
                        }`}
                      >
                        <span className="[font-family:'DM_Sans',Helvetica] font-semibold text-sm lg:text-base hover:text-white text-white">
                          {item.name}
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {userName ? (
                <div ref={profileRef} className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="hidden md:flex  gap-2.5 rounded-lg backdrop-blur-[2px] text-white h-10 lg:h-12 border group"
                    child={
                      <>
                        <div className="w-8 h-8 rounded-full bg-[#FFFFFF] flex items-center justify-center border-2 border-white shadow-sm">
                          <Image
                            src={ProfileAvatarIcon}
                            alt="User"
                            className="w-6 h-6"
                          />
                        </div>
                        <span className="text-base hidden lg:block font-semibold max-w-[100px] truncate">
                          {userName}
                        </span>
                        <ChevronDownIcon
                          fill="currentColor"
                          size={18}
                          className={`text-gray-300 transition-transform duration-200 ${
                            isProfileMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    }
                  ></Button>

                  {isProfileMenuOpen && (
                    <div className="absolute left-1/1  xl:left-1/3 xl:-translate-x-1/3 -translate-x-1/1 mt-2 w-56 rounded-xl shadow-2xl z-50 animate-fade-in-up">
                      <ProfileMenu
                        onProfile={() => router.push("#")}
                        onInterests={() => router.push("#")}
                        onApplications={() => router.push("#")}
                        onLogout={handleLogout}
                        logoutLoading={logoutLoading}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="cursor-pointer  hover:bg-white rounded-lg"
                >
                  <Button
                    variant="ghost"
                    className="hidden md:flex w-32 lg:w-40 gap-2.5 rounded-lg backdrop-blur-[2px] text-white h-10 lg:h-12 border group"
                    child={
                      <>
                        <div className="relative w-[15px] h-[15px]">
                          <Image
                            src={ContactIcon}
                            alt="contact"
                            className="group-hover:invert"
                          />
                        </div>
                        <span className="[font-family:'DM_Sans',Helvetica] font-medium text-sm lg:text-[15px]">
                          Sign in
                        </span>
                      </>
                    }
                  ></Button>
                </Link>
              )}
              <Button
                variant="ghost"
                className="md:hidden w-10 h-10 p-0 text-white ml-auto hover:bg-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                child={
                  <>{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</>
                }
              ></Button>
            </div>
          </div>
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-4 right-4 bg-[#2a2828cc] backdrop-blur-md rounded-2xl p-4 z-50 md:hidden">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.link}>
                    <div
                      key={item.name}
                      className={`flex h-10 items-center justify-center p-2.5 rounded-lg hover:bg-primary transition-colors ${
                        pathName === item.link || (item.link === "/search" && pathName.startsWith("/search")) ? "bg-primary" : ""
                      }`}
                    >
                      <span className="[font-family:'DM_Sans',Helvetica] font-semibold text-base text-white">
                        {item.name}
                      </span>
                    </div>
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  className="w-full gap-2.5 rounded-lg backdrop-blur-[2px] text-white h-12 border group mt-2"
                  child={
                    <>
                      <div className="relative w-[15px] h-[15px]">
                        <Image
                          src={ContactIcon}
                          alt="contact"
                          className="group-hover:invert"
                        />
                      </div>
                      <span className="[font-family:'DM_Sans',Helvetica] font-medium text-[15px]">
                        Sign in
                      </span>
                    </>
                  }
                ></Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
