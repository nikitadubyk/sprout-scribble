"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";

import { Button } from "../ui/button";

interface UserInfoProps {
  user?: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div>
      {user?.name} <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};
