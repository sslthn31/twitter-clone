import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import IconHoverEffect from "./IconHoverEffect";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";

const SideNav = () => {
  const session = useSession();
  const user = session.data?.user;
  console.log(user, "user");
  const handleLogout = (): void => {
    signOut();
  };
  const handleLogin = (): void => {
    signIn();
  };
  return (
    <div className="sticky top-0 px-2 py-5">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscHome className="h-8 w-8" />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/profile/${user?.id}`}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscAccount className="h-8 w-8" />
                  <span className="hidden text-lg md:inline">Profile</span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
        {user ? (
          <button onClick={handleLogout}>
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscSignOut className="h-8 w-8 fill-red-700" />
                <span className="hidden text-lg text-red-700 md:inline">
                  Log Out
                </span>
              </span>
            </IconHoverEffect>
          </button>
        ) : (
          <button onClick={handleLogin}>
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscSignIn className="h-8 w-8 fill-green-700" />
                <span className="hidden text-lg text-green-700 md:inline">
                  Log In
                </span>
              </span>
            </IconHoverEffect>
          </button>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
