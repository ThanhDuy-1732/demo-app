// Utilities
import Link from "next/link";
import { PropsWithChildren, useCallback } from "react";
import { useRouter } from "next/navigation";

// Components
import { Button, Image, Modal } from "antd";
import { LoginOutlined } from '@ant-design/icons';
import InputSearch from "../InputSearch/InputSearch";
import AccountPopover from "../AcountPopover/AccountPopover";

// Stores
import useAuthStore from "@/app/(auth)/_services/auth.store";

type UserInfoProps = {
  showSearch: boolean,
  search?: (keyword: string) => Promise<void>,
}

const UserInfo: React.FC<PropsWithChildren<UserInfoProps>> = ({ showSearch, search }) => {
  const router = useRouter();
  const signOut = useAuthStore((state) => state.signOut);

  const handleSearchPosts = useCallback(async (keyword: string) => {
    search?.(keyword);
  }, [search]);

  const handleLogoutClick = useCallback(() => {
    Modal.confirm({
      title: 'Log out',
      content: 'Are you sure you want to log out?',
      onOk: () => {
        router.push('/login');
        signOut();
      }
    })
  }, []);

  return (
    <>
      <div className="sticky top-0 bg-gray-300 flex justify-between items-center gap-2 py-2 lg:py-0 z-10">
        <div className="flex-1 lg:flex items-center hidden">
          <Link href={'/posts'} className="w-fit h-[50px]">
            <Image
              src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/272914268_312242084295213_8945579943894417114_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=JGibI2NxiVoQ7kNvgH3IeMw&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYAoL52cQnn5kV4zQ9SZZXW2PkA6enPUi638ZJ-rsHSkIA&oe=66C62DF1" 
              height={50}
              preview={false}
            />
          </Link>
        </div>
        <div className="flex-2 lg:flex-1 ml-2 lg:ml-0 w-full">
          {
            showSearch &&
            <InputSearch submit={handleSearchPosts} />
          }
        </div>
        <div className="flex-1 flex justify-end items-center gap-2">
          <AccountPopover />
          <Button danger icon={<LoginOutlined />} className="mr-2" onClick={handleLogoutClick}>
            <div className="hidden lg:block">Log out</div>
          </Button>
        </div>
      </div>
    </>
  )
}

export default UserInfo;