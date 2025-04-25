import { useState } from "react";
import { CommentWPostId } from "../../interfaces/user_interface";

import AllReply from "../replyComponents/AllReply";

import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import ReplySection from "../replyComponents/ReplySection";

export default function PerComment(props: CommentWPostId) {
  const { commentor_img, commentor_name, CommentText, Replies } = props;
  const [reply, setReply] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  function handleReply() {
    setReply(!reply);
  }

  function handleLike() {
    setLiked(!liked);
  }

  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-100 bg-gray-100 rounded-2xl">
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
        <div className="mt-2 flex flex-row gap-2">
          <button
            onClick={handleLike}
            className={`text-sm font-medium hover:underline ${
              liked ? "text-blue-600" : "text-blue-600"
            }`}
          >
            {liked ? (
              <div className="flex flex-row">
                <LikeFilled /> <h1>Liked</h1>
              </div>
            ) : (
              <div className="flex flex-row">
                <LikeOutlined /> <h1>Like</h1>
              </div>
            )}
          </button>

          {Replies.length > 0 ? (
            <button
              onClick={handleReply}
              className="text-blue-600 text-sm hover:underline font-bold"
            >
              {Replies.length} Replies
            </button>
          ) : (
            <button
              onClick={handleReply}
              className="text-blue-600 text-sm hover:underline font-bold"
            >
              Reply
            </button>
          )}
        </div>
        {reply && (
          <>
            <AllReply replies={props.Replies} />
            <ReplySection {...props} />
          </>
        )}
      </div>
    </div>
  );
}
