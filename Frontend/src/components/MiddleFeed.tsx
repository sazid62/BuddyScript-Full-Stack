import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DailyStatus from "./DailyStatus";
import PostFromHere from "./PostFromHere";
import { allPost, stateStruct } from "../interfaces/user_interface";
import { useDispatch, useSelector } from "react-redux";
import PernewsAndRecentComment from "./PernewsAndRecentComment";
import conf from "../conf/conf";
import { initializeAllPost } from "../features/login/Userslice";
import { div } from "framer-motion/client";

export default function MiddleFeed() {
  const [ok, setOk] = useState(false);
  const allPosts = useSelector((state) => state.allPost) || [];
  const currentUser = useSelector((state) => state.currentuser);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isEndAllPost, setIsEndAllPost] = useState(false);
  const loadingRef = useRef(false);
  const containerRef = useRef(null);

  const handleLoadMorePosts = useCallback(async () => {
    if (loadingRef.current || isEndAllPost) return;

    loadingRef.current = true;
    setIsLoading(true);

    try {
      // If it's the first load, use page 1, otherwise increment
      const pageToFetch = allPosts.length === 0 ? 1 : currentPage + 1;

      const response = await fetch(`${conf.apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          current_user: currentUser.email,
          page_number: pageToFetch,
        }),
      });

      const data = await response.json();

      if (data.data.length === 0) {
        setIsEndAllPost(true);
      } else {
        if (allPosts.length === 0) {
          dispatch(initializeAllPost(data.data));
        } else {
          dispatch(initializeAllPost([...allPosts, ...data.data]));
        }
        setCurrentPage(pageToFetch);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [currentPage, isEndAllPost, allPosts, currentUser.email, dispatch]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && !loadingRef.current && !isEndAllPost) {
        handleLoadMorePosts();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleLoadMorePosts, isEndAllPost]);

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 m-auto">
      <div
        className="_layout_middle_wrap _layout_middle_padding"
        ref={containerRef}
        style={{ overflowY: "auto", maxHeight: "100vh", position: "relative" }}
      >
        <div className="_layout_middle_inner">
          <DailyStatus />
          <PostFromHere setOk={setOk} />

          {allPosts.map((post) => (
            <motion.div
              key={post.postId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PernewsAndRecentComment {...post} />
            </motion.div>
          ))}

          {isEndAllPost && allPosts.length > 0 && (
            <div className="p-4 font-semibold text-center text-gray-500">
              No more Posts to load
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
