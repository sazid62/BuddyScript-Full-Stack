import { useState } from "react";

import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Reply } from "../../interfaces/user_interface";


export default function PerReply(reply: Reply) {
  const [liked, setLiked] = useState<boolean>(false);

  function handleReact() {
    setLiked(!liked);
  }
  return (
    <div>
      <div
        key={reply.replier_id}
        className="flex items-start space-x-4 mb-3 bg-gray-50 p-2 rounded-2xl"
      >
        <div>
          <img
            src={reply.replier_img}
            alt={reply.replier_name}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-sm text-gray-900">
              {reply.replier_name}
            </h4>
          </div>
          <p className="text-gray-700 text-sm">{reply.ReplyText}</p>
          <div className="mt-1">
            {liked ? (
              <button
                onClick={handleReact}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                <LikeFilled style={{ fontSize: "15px" }} />
                Liked
              </button>
            ) : (
              <button
                onClick={handleReact}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                <LikeOutlined style={{ fontSize: "15px" }} />
                Like
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
