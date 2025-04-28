import { useEffect, useState } from "react";
import { CommentWPostId, stateStruct } from "../interfaces/user_interface";
import ReplySection from "./ReplySection";
import AllReply from "./AllReply";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AddLikeToComment } from "../features/login/Userslice";
import conf from "../conf/conf";
import { nanoid } from "@reduxjs/toolkit";

export default function PerComment({...props}: any) {
  console.log(props);
  const dispatch = useDispatch();
  const {
    commentor_img,
    commentor_name,
    CommentText,
    Replies,
    comment_id,
    like_comment_userList,
    totalReplies,
  } = props;

  const [showTotalReplies, setShowTotalReplies] =
    useState<number>(totalReplies);
  const [reply, setReply] = useState<boolean>(false);
  const current_user = useSelector((state: stateStruct) => state.currentuser);
  const userLikedBefore = like_comment_userList.some(
    (user) => user.user_name === current_user.email
  );
  const [allReplies, setAllReplies] = useState([]);
  const [like, setLike] = useState<boolean>(userLikedBefore);
  useEffect(() => {
    setReply(false);
  }, [comment_id]);
  useEffect(() => {
    setShowTotalReplies(showTotalReplies);
  }, [setShowTotalReplies]);
  function handleReply() {
    if (!reply) {
      fetch(`${conf.apiUrl}/comments/${comment_id}/replies`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAllReplies(data.data);
          setShowTotalReplies(data.data.length);
        });
    }

    setReply(!reply);
  }

  // Optional: Add like functionality
  function handleLike() {
    setLike(!like);
    dispatch(
      AddLikeToComment({
        commentId: comment_id,
        userId: current_user.id,
        like: !like,
      })
    );
  }
  return (
    <div
      key={comment_id}
      className="flex items-start space-x-4 p-4 border-b border-gray-100 bg-gray-100 rounded-2xl"
    >
      <div>
        <img
          src={commentor_img}
          alt={commentor_name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <h4 className="font-semibold text-sm text-gray-900">
            {commentor_name}
          </h4>
        </div>
        <p className="text-gray-700 text-sm">{CommentText}</p>
        <div className="mt-2">
          {reply ? (
            <>
              <AllReply allReplies={allReplies} setAllReplies={setAllReplies} />
              <Button
                onClick={handleReply}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Hide Replies
              </Button>
              <ReplySection
                showTotalReplies={showTotalReplies}
                setShowTotalReplies={setShowTotalReplies}
                {...props}
                allReplies={allReplies}
                setAllReplies={setAllReplies}
                setReply={setReply}
              />
            </>
          ) : (
            <div className="flex flex-row gap-2">
              <button
                onClick={handleLike}
                className={`text-blue-600 text-sm font-medium hover:underline ${
                  like ? "font-bold" : "font-normal"
                }`}
              >
                {props.like_comment_userList.length} {like ? "liked" : "like"}
              </button>
              <button
                onClick={handleReply}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Reply
              </button>

              <button
                onClick={handleReply}
                className="text-blue-600 text-sm hover:underline font-bold"
              >
                {showTotalReplies} Replies
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
