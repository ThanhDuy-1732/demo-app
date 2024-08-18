'use client';
// Components
import { Spin } from "antd";

// Stores
import useLoadingStore from "./services/loading.store";

export default function Loading({
  children,
}: {
  children: React.ReactNode
}) {
  const loading = useLoadingStore((state) => state.loading);

  return (
    <Spin spinning={loading} tip="Loading..." className="!fixed !h-screen !max-h-screen">
      {children}
    </Spin>
  )
}