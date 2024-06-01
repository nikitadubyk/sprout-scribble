import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";

import { Routes } from "@/config";
import { auth } from "@/server/auth";
import logo from "@/public/logo.svg";

import { UserInfo } from "./user-info";
import { Button } from "../ui/button";

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
            <Image src={logo} alt="logo" />
          </li>
          <li>
            {session?.user ? (
              <UserInfo user={session?.user} />
            ) : (
              <Button asChild>
                <Link href={Routes.Auth.Login} className="flex gap-2">
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
