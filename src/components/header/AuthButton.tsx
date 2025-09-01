"use client";
import Link from "next/link";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { IUser } from "@/types/user";

import { useClientSession } from "@/hooks/useClientSession";

import { logout } from "@/server/actions/auth";
import { logout as logoutAction } from "@/lib/store/auth-slice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dypa1tbbf/image/upload/v1725929616/default-profile_taxhcr.png";

interface IProps {
  session: IUser | null;
}
const AuthButton = ({ session }: IProps) => {
  const { data: currentSession } = useClientSession(session);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutAction());
      window.location.href = "/";
    } catch (error) {
      console.log(error, "error from logout");
    }
  };

  return (
    <div className="flex gap-3 items-center">
      {!currentSession && (
        <div className="flex gap-3 items-center">
          <Link href="/auth/login">
            <button className="bg-muted text-primary dark:text-white  px-5 py-2 rounded-[2px] w-full">
              Sign in
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="bg-primary px-5 py-2 text-white rounded-[2px]">
              Create account
            </button>
          </Link>
        </div>
      )}

      {currentSession && (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative w-[70px] h-[70px]">
                <Image
                  src={currentSession.profilePicture?.url || DEFAULT_AVATAR}
                  alt="avatar"
                  width={70}
                  height={70}
                  className="rounded-full cursor-pointer object-cover w-full h-full"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {currentSession.role === "teacher" && (
                  <DropdownMenuItem className="cursor-pointer">
                    <Link
                      href={`/profile/${currentSession._id}`}
                      className="w-full h-full"
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem className="cursor-pointer">
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href={`/setting`} className="w-full h-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

// AuthButton.displayName = "AuthButton";

export default AuthButton;
