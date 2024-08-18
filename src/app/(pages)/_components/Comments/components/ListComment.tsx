// Utilities
import { PropsWithChildren, useMemo } from "react";

// APIs
import { CommentData, CommentsData } from "@/app/(pages)/posts/_services/post.api";

// Components
import Comment from "./Comment";

const ListComments: React.FC<PropsWithChildren<{ data: CommentsData }>> = ({ data }) => {
  const comments: Array<CommentData> = useMemo(() => data.comments || [], [data.comments]);

  return (
    <>
      {
        comments.length ?
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-lg">Comments: </div>
          {
            comments.map((comment) => {
              return <Comment key={`cmt-${comment.id}`} comment={comment} />
            })
          }
        </div> :
        <>
          <div className="text-center border-2 rounded-xl border-gray-200 p-2">This post hasn't been comment yet!</div>
        </>
      }
    </>
  )
}

export default ListComments;