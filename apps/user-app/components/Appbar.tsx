"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Appbar({ user, onSignout }: AppbarProps) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex justify-between w-full select-none">
      <Link href={"/"} className="text-xl font-extrabold cursor-pointer ">
        Pay<span className="text-blue-500  ">TM</span>
      </Link>
      <div className="flex gap-2 items-center cursor-pointer">
        <div className="relative">
          <Image
            onClick={() => setOpen(!open)}
            src={user?.image || "/profile.png"}
            height={35}
            width={35}
            alt={`Profile photo ${user?.name}`}
            className="rounded-full bg-gray-200 "
          />
          {open && (
            <div className="absolute -left-10 bg-white shadow rounded mt-2">
              <button
                onClick={onSignout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

interface AppbarProps {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | null;
  onSignin: () => void;
  onSignout: () => void;
}
