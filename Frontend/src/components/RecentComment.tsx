import { useSelector } from "react-redux";
import { allPost, Post, stateStruct } from "../interfaces/user_interface";

import AllCommentShow from "./AllCommentShow";

import PerComment from "./PerComment";
import { all } from "axios";
import { nanoid } from "@reduxjs/toolkit";
import { CookingPot } from "lucide-react";
import { useState } from "react";

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
  const [showAllComment, setShowAllComment] = useState<boolean>(false);

  // console.log(postInfo)
  // console.log(allComment, "ALLCOMMETN");

  return (
    <div>
      <div className="_timline_comment_main">
        <div className="_previous_comment">
          {showAllComment && allComment.lenght >= 3 ? (
            <div>
              <button
                onClick={() => {
                  setShowAllComment(!showAllComment);
                }}
                type="button"
                className="_previous_comment_txt"
              >
                Hide all {allComment.length} comments
              </button>
              {/* <AllCommentShow allComment = {allComment} postData = {postData} /> */}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowAllComment(!showAllComment);
              }}
              type="button"
              className="_previous_comment_txt"
            >
              {allComment.length === 0 ? (
                <p>No comments yet</p>
              ) : allComment.length > 3 && !showAllComment ? (
                <p>View {allComment.length - 3} previous comments</p>
              ) : (
                <p>Recent Comments</p>
              )}
            </button>
          )}
        </div>
        {(allComment?.length ?? 0) > 0 && !showAllComment
          ? allComment.map((val, index) => {
              if (index <= 2) {
                return (
                  <div
                    className="p-1"
                    key={allComment[index].commentId || nanoid()}
                  >
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
                );
              } else return;
            })
          : allComment.map((val, index) => {
              return (
                <div
                  className="p-1"
                  key={allComment[index].commentId || nanoid()}
                >
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
              );
            })}
      </div>
    </div>
  );
}
