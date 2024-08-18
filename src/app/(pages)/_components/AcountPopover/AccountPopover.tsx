import { MeData } from "@/app/(auth)/_services/auth.http";
import useAuthStore from "@/app/(auth)/_services/auth.store"
import { Avatar, Popover, Space, Button } from "antd"
import { PropsWithChildren, ReactNode, useCallback, useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { AvatarSize } from "antd/es/avatar/AvatarContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

type AvatarProps = {
  size: AvatarSize,
  icon?: ReactNode,
  src?: ReactNode,
}

type AvatarImageProps = {
  url: string;
}

const AvatarImage: React.FC<PropsWithChildren<AvatarImageProps>> = ({ url }) => {
  const [ avatarProps, setAvatarProps ] = useState<AvatarProps | {}>({});

  useEffect(() => {
    const props = { size: 'large' };

    if (url) {
      setAvatarProps({
        ...props,
        src: <Image alt="Avatar" src={url} height={50} width={50} />,
      })
      return;
    }

    setAvatarProps({
      ...props,
      icon: <UserOutlined />
    })
  }, [url]);

  return (
    <Avatar className="cursor-pointer" {...avatarProps} />
  )
}

const Account: React.FC = () => {
  const router = useRouter();

  const handleViewProfileClick = useCallback(() => {
    router.push('/my-account');
  }, [router]);

  const handleMyPostsClick = useCallback(() => {
    router.push('/my-account/posts')
  }, [router]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button type="dashed" onClick={handleViewProfileClick}>View Profile</Button>
        <Button type="dashed" onClick={handleMyPostsClick}>My posts</Button>
      </div>
    </>
  )
}

const AccountPopover: React.FC = () => {
  const me = useAuthStore((state) => state.me);
  const [url, setUrl] = useState<string>('');


  useEffect(() => {
    setUrl((me as MeData)?.image || '');
  }, [me]);

  return (
    <Popover content={<Account />} trigger="hover">
      <Space direction="vertical" size={16}>
        <AvatarImage url={url} />
      </Space>
    </Popover>
  )
}

export default AccountPopover;