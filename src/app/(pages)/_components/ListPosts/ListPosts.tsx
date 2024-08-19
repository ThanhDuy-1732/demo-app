// Utilities
import { PropsWithChildren, useCallback, useMemo } from "react";

// APIs
import { PostsData } from "../../posts/_services/post.api";

// Components
import Content from "../Post/Post";
import PaginationCustom from "../Pagination/Pagination";

export type ListPostProps = {
  data: PostsData;
  goTo: (id: number) => string;
  search: ({ limit, skip }: { limit: number, skip: number }) => Promise<void> | void;
}

const ListPost: React.FC<PropsWithChildren<ListPostProps>> = ({ data, search, goTo }) => {

  const posts = useMemo(() => data.posts || [], [data]);

  const handleChangePage = useCallback(({ limit, skip }: { limit: number, skip: number }): void => {
    search({ limit, skip })
  }, [search]);

  return (
    <>
      <div className="w-full max-w-[50rem] min-w-80 flex flex-col gap-2 px-2 lg:px-0 mb-2">
        <div className="flex gap-4 flex-col">
          { 
            posts.length ?
            posts.map((post) => {
              return(
                <Content key={post.id} post={post} goTo={goTo} />
              )
            }) :
            <div className="text-center">No data!</div>
          }
        </div>
        <div className="self-end">
          <PaginationCustom 
            skip={data.skip} 
            limit={data.limit} 
            total={data.total} 
            changePage={handleChangePage}
          />
        </div>
      </div>
    </>
  )
}

export default ListPost;