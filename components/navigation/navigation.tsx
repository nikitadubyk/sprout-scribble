import Image from "next/image";

import { auth } from "@/server/auth";
import logo from "@/public/logo.svg";

import { UserInfo } from "./user-info";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Routes } from "@/config";

export default async function Navigation() {
  const session = await auth();

  return (
    <header className="w-full">
      <nav>
        <ul className="py-4 flex justify-between">
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
