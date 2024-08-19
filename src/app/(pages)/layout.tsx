'use client';
// Utilities
import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Components
import { Modal } from "antd";
import Loading from "@/components/Loading/Loading";
import CustomAlert from "@/components/Alert/Alert";

// Stores
import useAuthStore from "../(auth)/_services/auth.store";
import useLoadingStore from "@/components/Loading/services/loading.store";
import useAlertStore, { MessageType } from "@/components/Alert/services/alert.store";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathName = usePathname();
  const getMe = useAuthStore((state) => state.getMe);
  const resetMessage = useAlertStore((state) => state.reset);
  const setMessage = useAlertStore((state) => state.addMessage);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const redirectLogin = useCallback(() => router.push('/login'), [router]);

  const me = useCallback(async () => {
    try {
      setLoading(true);

      await getMe();
    } catch (error: any) {
      Modal.confirm({
        title: 'Warning!',
        content: 'Your session has expired. Please log in again!',
        onOk: redirectLogin,
        onCancel: redirectLogin,
      })
    } finally {
      setLoading(false);
    }
  }, [setLoading, getMe, redirectLogin]);

  useEffect(() => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        Modal.confirm({
          title: 'Warning!',
          content: 'Please login first!',
          onOk: redirectLogin,
          onCancel: redirectLogin,
        })

        return;
      }

      me();

    } catch (error: any) {
      setMessage({
        message: error.message,
        type: MessageType.error,
      });
    }
  }, [router, redirectLogin, setMessage]);

  useEffect(() => {
    resetMessage();
  }, [pathName, resetMessage]);

  return (
    <>
      <CustomAlert />
      <Loading>
        <div className="w-full min-h-screen h-full relative bg-gray-100">
          { children }
        </div>
      </Loading>
    </>
  )
}