'use client';
// Utilities
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Components
import CustomAlert from "@/components/Alert/Alert";
import Loading from "@/components/Loading/Loading";
import useAlertStore from "@/components/Alert/services/alert.store";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname();
  const resetMessage = useAlertStore((state) => state.reset);

  useEffect(() => {
    resetMessage();
  }, [pathName, resetMessage]);

  return (
    <>
      <CustomAlert />
      <Loading>
        <div className="flex w-xl min-w-80 max-w-xl p-10 mx-auto lg:my-40 my-20 items-center border-2 border-gray-200 rounded-lg bg-gray-50">
          {children}
        </div>
      </Loading>
    </>
  )
}