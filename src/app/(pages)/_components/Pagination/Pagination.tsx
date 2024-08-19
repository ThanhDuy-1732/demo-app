// Utilities
import { formatNumber } from "@/services/libs";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";

// Components
import { Pagination, PaginationProps } from "antd";

// Constants
import { DEFAULT_LIMIT_PAGE } from "@/services/constants";

export type PaginationCustomProps = {
  skip: number,
  total: number,
  limit: number,
  changePage: ({ limit, skip }: { limit: number, skip: number }) => Promise<void> | void,
}

const TotalItem: React.FC<PropsWithChildren<{ total: number }>> = ({ total }) => {
  return (
    <div className="hidden h-full lg:flex items-center justify-center">Total: { formatNumber(total) }</div>
  )
}

const PaginationCustom: React.FC<PropsWithChildren<PaginationCustomProps>> = ({ total, limit, skip, changePage }) => {
  const current: number = useMemo(() => {
    if (!limit) {
      return 1;
    }

    return (skip / limit) + 1;
  }, [skip, limit]);

  const handleChangePageClick: PaginationProps['onChange'] = useCallback((pageNumber: number) => {
    changePage({
      limit,
      skip: limit * (pageNumber - 1),
    })
  }, [changePage, limit]);

  return (
    <>
      {
        total > DEFAULT_LIMIT_PAGE ?
        <Pagination 
          total={total} 
          showQuickJumper 
          current={current}
          showSizeChanger={false}
          onChange={handleChangePageClick}
          showTotal={(total) => (<TotalItem total={total} />)} 
        /> :
        <></>
      }
    </>
  )
}

export default PaginationCustom;