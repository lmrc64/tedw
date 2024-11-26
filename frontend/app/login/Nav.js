"use client";

import Link from "next/link";

function Nav() {
  return (
    <div>
      <div className="border-b border-palette-lighter sticky top-0 z-20 bg-white w-full">
        <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
          <Link href="/">
            <div className="cursor-pointer">
              <h1 className="flex no-underline">
                <img
                  height="32"
                  width="32"
                  alt="logo"
                  className="h-8 w-8 mr-1 object-contain"
                  src="/icon.svg"
                />
                <span className="text-xl font-primary font-bold tracking-tight pt-1">
                  {process.env.siteTitle}
                </span>
              </h1>
            </div>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default Nav;
