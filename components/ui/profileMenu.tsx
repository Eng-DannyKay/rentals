import React from "react";
import { Separator } from "./separator";
import Image from "next/image";
import {
  UserProfileIcon,
  LoveIcon,
  ApplicationMenuIcon,
  LogoutIcon,
} from "@/assets/imageIndex";

interface ProfileMenuProps {
  readonly onProfile?: () => void;
  readonly onInterests?: () => void;
  readonly onApplications?: () => void;
  readonly onLogout?: () => void;
  readonly logoutLoading?: boolean;
}

export default function ProfileMenu({
  onProfile,
  onInterests,
  onApplications,
  onLogout,
  logoutLoading = false,
}: ProfileMenuProps) {
  const menuItems = [
    {
      label: "Profile",
      icon: (
        <Image src={UserProfileIcon} alt="Profile" width={20} height={20} />
      ),
      action: onProfile,
    },
    {
      label: "My Interests",
      icon: <Image src={LoveIcon} alt="Interests" width={20} height={20} />,
      action: onInterests,
    },
    {
      label: "My Applications",
      icon: (
        <Image
          src={ApplicationMenuIcon}
          alt="Applications"
          width={20}
          height={20}
        />
      ),
      action: onApplications,
    },
  ];

  return (
    <div className="w-52 rounded-xl border border-gray-200 shadow-md bg-white p-2">
      <ul className="space-y-1">
        {menuItems.map((item, idx) => (
          <React.Fragment key={item.label}>
            <li>
              <button
                type="button"
                onClick={item.action}
                className="w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-md text-[#45535F] hover:bg-gray-100 transition text-left focus:outline-none focus:bg-gray-200"
              >
                {item.icon}
                <span className="text-sm ">{item.label}</span>
              </button>
            </li>
            {idx < menuItems.length - 1 && <Separator />}
          </React.Fragment>
        ))}
        <Separator className="my-2" />
        <li>
          <button
            type="button"
            onClick={onLogout}
            disabled={logoutLoading}
            className="w-full flex cursor-pointer items-center gap-3 px-3 py-3 rounded-md text-[#B7192C] hover:bg-red-50 transition text-left focus:outline-none focus:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {logoutLoading ? (
              <div className="w-5 h-5 border-2 border-[#B7192C] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Image src={LogoutIcon} alt="Logout" width={20} height={20} />
            )}
            <span className="text-sm ">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
