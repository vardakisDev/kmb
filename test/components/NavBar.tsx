import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GrUser, GrUserAdmin } from "react-icons/gr";

const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm "
      role="navigation"
    >
      <Link href="/" passHref>
        <span className="pl-8">KMB</span>
      </Link>
      <div className="pr-8 md:block hidden">
        <Link href="/profile" passHref>
          <span className="p-4">Profile</span>
        </Link>
        <div className="inline-block relative">
          <GrUser className="mr-2" />
          <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
            <li>
              <Link href="/profile" passHref>
                <span className="px-4 py-2 block hover:bg-gray-200">
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 block hover:bg-gray-200 focus:outline-none"
                onClick={() => null}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="pr-8 md:hidden block">
        <div className="inline-block relative">
          <GrUser className="mr-2" />
          <ul className="absolute hidden text-gray-700 pt-1 group-hover:block right-0">
            <li>
              <Link href="/profile" passHref>
                <span className="px-4 py-2 block hover:bg-gray-200">
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 block hover:bg-gray-200 focus:outline-none"
                onClick={() => null}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
