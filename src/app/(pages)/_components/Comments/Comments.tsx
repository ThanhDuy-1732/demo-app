// Utilities
import { PropsWithChildren, useCallback } from "react";

// APIs
import { CommentsData } from "../../posts/_services/post.api";

// Components
import AddComment from "./components/AddComment";
import ListComments from "./components/ListComment";
import PaginationCustom from "../Pagination/Pagination";

export type CommentsProps = {
  comments: CommentsData,
  getComment: ({ limit, skip }: { limit: number, skip: number }) => void,
}

const Comments: React.FC<PropsWithChildren<CommentsProps>> = ({ comments, getComment }) => {
  const handleChangePageComment = useCallback(({ limit, skip }: { limit: number, skip: number }) => {
    getComment({ limit, skip });
  }, []);

  return (
    <>
      <div className="w-full flex flex-col">
        <AddComment />
        <ListComments data={comments} />
        <div className="self-end mt-2">
          <PaginationCustom limit={comments.limit} total={comments.total} skip={comments.skip} changePage={handleChangePageComment} />
        </div>
      </div>
    </>
  )
}

export default Comments;