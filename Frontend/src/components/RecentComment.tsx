import { useSelector, useDispatch } from "react-redux";
import { allPost, stateStruct } from "../interfaces/user_interface";
import PerComment from "./PerComment";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import conf from "../conf/conf";
import { AddCommentCount } from "../features/login/Userslice";

type RecentCommentProps = {
  allComment: any[];
  setAllComment: React.Dispatch<React.SetStateAction<any[]>>;
  postData: allPost;
};

export default function RecentComment({
  allComment,
  setAllComment,
  postData,
}: RecentCommentProps) {
  const [showAllComment, setShowAllComment] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEndOfComments, setIsEndOfComments] = useState<boolean>(false);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<boolean>(false);
  const dispatch = useDispatch();

  // Function to fetch more comments
  const fetchMoreComments = useCallback(async () => {
    if (loadingRef.current || isEndOfComments) return;

    loadingRef.current = true;
    setIsLoading(true);

    try {
      const nextPage = currentPage + 1;

      const response = await fetch(`${conf.apiUrl}/posts/comments`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postData.postId,
          pageNumber: nextPage,
        }),
      });

      const data = await response.json();

      if (data.data.length === 0) {
        setIsEndOfComments(true);
      } else {
        setAllComment((prevComments) => [...prevComments, ...data.data]);
        dispatch(AddCommentCount(postData.postId));
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to fetch more comments:", error);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [currentPage, isEndOfComments, postData.postId, setAllComment, dispatch]);

  // Handle scroll events for infinite loading
  useEffect(() => {
    const container = commentsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollPosition = scrollTop + clientHeight;
      const threshold = scrollHeight - 100; // 100px from bottom

      // Check if user has scrolled near the bottom
      if (
        scrollPosition >= threshold &&
        !loadingRef.current &&
        !isEndOfComments
      ) {
        fetchMoreComments();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchMoreComments, isEndOfComments]);

  // Animation variants
  const loaderVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const endCommentsVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="_timline_comment_main">
      <div
        ref={commentsContainerRef}
        className="comments-container"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingRight: "8px",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent",
        }}
      >
        {/* Custom scrollbar styling */}
        <style>
          {`
            .comments-container::-webkit-scrollbar {
              width: 6px;
            }
            .comments-container::-webkit-scrollbar-track {
              background: transparent;
            }
            .comments-container::-webkit-scrollbar-thumb {
              background-color: #888;
              border-radius: 3px;
            }
            .comments-container::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}
        </style>

        {allComment.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No comments yet</p>
        ) : (
          <>
            <p className="font-bold text-lg mb-3">
              Comments ({postData.commentCount})
            </p>

            <div className="space-y-4">
              {allComment.map((comment) => (
                <motion.div
                  className="comment-item"
                  key={comment.commentId || nanoid()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <PerComment
                    comment_id={comment.commentId || ""}
                    CommentText={comment.commentText || ""}
                    commentor_name={comment.userName || ""}
                    commentor_img={
                      comment.commentor_img || "https://i.pravatar.cc/48?u=115"
                    }
                    Replies={comment.Replies || []}
                    post_id={postData.postId}
                    commentor_id={comment.commentor_id || ""}
                    like_comment_userList={comment.like_comment_userList || []}
                    totalReplies={comment.totalReplies || 0}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* End of comments indicator */}
        {isEndOfComments && allComment.length > 0 && (
          <motion.div
            className="text-center text-sm text-gray-500 py-4"
            initial="initial"
            animate="animate"
            variants={endCommentsVariants}
          >
            <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-full">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              You've reached the end of comments
            </div>
          </motion.div>
        )}
      </div>

      {/* Bounce animation */}
      <style jsx global>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
