import { useSelector } from "react-redux";
import { allPost, Post, stateStruct } from "../interfaces/user_interface";

import AllCommentShow from "./AllCommentShow";

import PerComment from "./PerComment";
import { all } from "axios";

type RecentCommentProps = {
  allComment: any;
  setAllComment: any;
  postData: allPost;
};

export default function RecentComment({
  allComment,
  setAllComment,
  postData,
}: RecentCommentProps) {
  // console.log(postInfo)
  // console.log(allComment, "ALLCOMMETN");

  return (
    <div>
      <div className="_timline_comment_main">
        <div className="_previous_comment">
          {postData.show ? (
            <div>
              <button
                onClick={postData.handleShowCmnt}
                type="button"
                className="_previous_comment_txt"
              >
                Hide all {allComment.length} comments
              </button>
              {/* <AllCommentShow key={"idxComment"} {...props} /> */}
            </div>
          ) : (
            <button
              onClick={postData.handleShowCmnt}
              type="button"
              className="_previous_comment_txt"
            >
              {allComment.length === 0 ? (
                <p>No comments yet</p>
              ) : allComment.length > 3 ? (
                <p>View {allComment.length - 3} previous comments</p>
              ) : (
                <p>Recent comments</p>
              )}
            </button>
          )}
        </div>
        {(allComment?.length ?? 0) > 0 && !postData.show
          ? allComment.map((val, indx) => {
              if (indx <= 2) {
                return (
                  <div className="p-1">
                    <PerComment
                      comment_id={allComment[indx].commentId || ""}
                      CommentText={allComment[indx].commentText || ""}
                      commentor_name={allComment[indx].userName || ""}
                      commentor_img={
                        allComment[indx].commentor_img ||
                        "https://i.pravatar.cc/48?u=115"
                      }
                      Replies={allComment[indx].Replies || []}
                      post_id={postData.postId}
                      commentor_id={allComment[indx].commentor_id || ""}
                      like_comment_userList={
                        allComment[indx].like_comment_userList || []
                      }
                    />
                  </div>
                );
              }
            })
          : allComment.map((val, indx) => {
              {
                return (
                  <div className="p-1">
                    <PerComment
                      comment_id={allComment[indx].commentId || ""}
                      CommentText={allComment[indx].commentText || ""}
                      commentor_name={allComment[indx].userName || ""}
                      commentor_img={
                        allComment[indx].commentor_img ||
                        "https://i.pravatar.cc/48?u=115"
                      }
                      Replies={allComment[indx].Replies || []}
                      post_id={postData.postId}
                      commentor_id={allComment[indx].commentor_id || ""}
                      like_comment_userList={
                        allComment[indx].like_comment_userList || []
                      }
                    />
                  </div>
                );
              }
            })}
      </div>
    </div>
  );
}
