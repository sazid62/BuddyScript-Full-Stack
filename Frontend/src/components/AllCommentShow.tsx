// There are extra parentheses that shouldn't be there
import { nanoid } from "@reduxjs/toolkit";
import { Post } from "../interfaces/user_interface";
import PerComment from "./PerComment";
import { all } from "axios";

export default function AllCommentShow({
  allComment,
  postData,
}: {
  allComment: any[];
  postData: any;
}) {
  return (
    <div className="flex flex-col gap-2">
      {allComment.map((val, index) => (
        <div className="p-1" key={allComment[index].commentId || nanoid()}>
          <PerComment
            comment_id={allComment[index].commentId || ""}
            CommentText={allComment[index].commentText || ""}
            commentor_name={allComment[index].userName || ""}
            commentor_img={
              allComment[index].commentor_img ||
              "https://i.pravatar.cc/48?u=115"
            }
            Replies={allComment[index].Replies || []}
            post_id={postData.postId}
            commentor_id={allComment[index].commentor_id || ""}
            like_comment_userList={
              allComment[index].like_comment_userList || []
            }
            totalReplies={allComment[index].totalReplies || 0}
          />
        </div>
      ))}
    </div>
  );
}
