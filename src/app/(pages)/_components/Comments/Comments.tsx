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
  saveComment: (comment: string) => void;
  getComment: ({ limit, skip }: { limit: number, skip: number }) => void,
}

const Comments: React.FC<PropsWithChildren<CommentsProps>> = ({ comments, getComment, saveComment }) => {
  const handleChangePageCommentClick = useCallback(({ limit, skip }: { limit: number, skip: number }): void => {
    getComment({ limit, skip });
  }, [getComment]);

  return (
    <>
      <div className="w-full flex flex-col">
        <AddComment saveComment={saveComment} />
        <ListComments data={comments} />
        <div className="self-end mt-2">
          <PaginationCustom limit={comments.limit} total={comments.total} skip={comments.skip} changePage={handleChangePageCommentClick} />
        </div>
      </div>
    </>
  )
}

export default Comments;