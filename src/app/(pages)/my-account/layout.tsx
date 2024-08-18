'use client';
import useAuthStore from "@/app/(auth)/_services/auth.store";
// Components
import UserInfo from "../_components/UserInfo/UserInfo";
import useAccountStore from "./_services/my-account.store";
import { useEffect } from "react";
import { MeData } from "@/app/(auth)/_services/auth.http";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const me: MeData = useAuthStore((state) => state.me as MeData);
  const setUserId = useAccountStore((state) => state.setUserId);

  useEffect(() => {
    setUserId(me?.id || 0);
  }, [setUserId, me]);

  return (
    <>
      <UserInfo showSearch={false} />
      { children }
    </>
  )
}