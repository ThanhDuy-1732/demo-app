// Utilities
import Link from "next/link";
import { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useCallback, useMemo } from "react";

// Components
import { Button, Image, Modal } from "antd";
import { LoginOutlined } from '@ant-design/icons';
import InputSearch from "../InputSearch/InputSearch";
import AccountPopover from "../AcountPopover/AccountPopover";

// Stores
import useAuthStore from "@/app/(auth)/_services/auth.store";

// APIs
import PostAPI, { SelectPostData } from "../../posts/_services/post.api";

type UserInfoProps = {
  showSearch: boolean,
  search?: (keyword: string) => void,
}

const UserInfo: React.FC<PropsWithChildren<UserInfoProps>> = ({ showSearch, search }) => {
  const router = useRouter();
  const params = useSearchParams();
  const signOut = useAuthStore((state) => state.signOut);

  const defaultSearchValues: string = useMemo(() => params.get('keyword') || '', [params]);

  const handleSearchPosts = useCallback((keyword: string): void => {
    search?.(keyword);
  }, [search]);

  const handleLogoutClick = useCallback((): void => {
    Modal.confirm({
      title: 'Log out',
      content: 'Are you sure you want to log out?',
      onOk: () => {
        router.push('/login');
        signOut();
      }
    })
  }, [router, signOut]);

  const handleSearchOptions = useCallback(async (keyword: string): Promise<Array<string>> => {
    try {
      const api = new PostAPI();
  
      const response: AxiosResponse<SelectPostData<'title'>> = await api.getSelectValueWithKeyword(keyword, 'title');

      return response.data?.posts?.map(post => post.title)
    } catch (error) {
      return [];
    }
  }, []);

  return (
    <>
      <div className="sticky top-0 bg-gray-300 flex justify-between items-center gap-2 py-2 lg:py-0 z-10">
        <div className="flex-1 lg:flex items-center hidden">
          <Link href={'/posts'} className="w-fit h-[50px]">
            <Image
              height={50}
              alt="Avatar"
              preview={false}
              src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/272914268_312242084295213_8945579943894417114_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=JGibI2NxiVoQ7kNvgH3IeMw&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYAoL52cQnn5kV4zQ9SZZXW2PkA6enPUi638ZJ-rsHSkIA&oe=66C62DF1" 
            />
          </Link>
        </div>
        <div className="flex-2 lg:flex-1 ml-2 lg:ml-0 w-full">
          {
            showSearch &&
            <InputSearch submit={handleSearchPosts} defaultValue={defaultSearchValues} searchOption={handleSearchOptions} />
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