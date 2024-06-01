import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";

import { Routes } from "@/config";
import { auth } from "@/server/auth";
import logo from "@/public/logo.svg";
import { joinStrings } from "@/utils/helpers";

import { Button } from "../ui/button";

import { UserInfo } from "./user-info";

const { Home, Login } = Routes.Auth;

/*
 * Header component in all pages.
 **/
export default async function Navigation() {
  const session = await auth();

  return (
    <header className="w-full">
      <nav>
        <ul className="py-8 flex justify-between items-center">
          <li>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </li>
          <li>
            {session?.user ? (
              <UserInfo user={session?.user} />
            ) : (
              <Button asChild>
                <Link
                  className="flex gap-2"
                  href={joinStrings([Home, Login], "/")}
                >
                  <LogIn size={16} />
                  Login
                </Link>
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
