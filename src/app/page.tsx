'use client';
// Utilities
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/posts');
      return;
    }

    router.push('/login');
  }, [router]);
  return (<></>);
}
