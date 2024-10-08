'use client';
// Utilities
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

// APIs
import { MeData } from "@/app/(auth)/_services/auth.http";

// Stores
import usePostStore from "../posts/_services/post.store";
import useAccountStore from "./_services/my-account.store";
import useAuthStore from "@/app/(auth)/_services/auth.store";

// Components
import { Avatar, Button, Modal, Skeleton } from "antd";

export type Data = {
  name: string,
  custom?: boolean,
  field?: keyof MeData,
}

const MyAccount: React.FC = () => {
  const router = useRouter();
  const signOut = useAuthStore((state) => state.signOut);
  const resetPost = usePostStore((state) => state.reset);
  const me: MeData = useAuthStore((state) => state.me as MeData);
  const resetPostByAccount = useAccountStore((state) => state.reset);
  const fullName: string = useMemo(() => `${me.firstName} ${me.lastName}`, [me.firstName, me.lastName]);
  
  const dataList: Array<Data> = useMemo(() => {
    return [
      { name: 'Name', custom: true },
      { name: 'Username', field: 'username' },
      { name: 'Email', field: 'email' },
      { name: 'Phone', field: 'phone' },
      { name: 'BOD', field: 'birthDate' },
      { name: 'Age', field: 'age' },
      { name: 'Gender', field: 'gender' },
    ]
  }, []);

  const handleLogout = useCallback((): void => {
    Modal.confirm({
      title: 'Log out',
      content: 'Are you sure you want to log out?',
      onOk: () => {
        router.push('/login');
        signOut();
        resetPost();
        resetPostByAccount();
      }
    })
  }, [router, signOut, resetPost, resetPostByAccount]);

  return (
    <>
    {
      me.id ?
      (
        <>
          <div className="text-center text-2xl font-semibold my-2">My Account</div>
          <div className="w-full max-w-[50rem] min-w-80 flex mx-auto mt-2 gap-2 lg:px-0 mb-2 justify-center border-2 rounded-xl border-gray-200 p-4">
            <Avatar src={me.image} shape="circle" size={64} />
            <div className="flex flex-col gap-2">
              {
                dataList.map((value, index) => {
                  if (!value.custom && value.field) {
                    return <div key={`${value}-${index}`}>{value.name}: {me?.[value.field]}</div>
                  }

                  if (value.name === 'Name') {
                    return <div key={`${value}-${index}`}>Name: {fullName}</div>
                  }
                })
              }
            </div>
          </div>
          <div className="flex justify-center">
            <Button danger className="w-80" onClick={handleLogout}>Logout</Button>
          </div>
        </>
      ) : (
        <Skeleton />
      )
    }
    </>
  );
}

export default MyAccount;