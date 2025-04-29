import DailyStatus from "./DailyStatus";
// import MessengerCircle from "./MessengerCircle";
import PostFromHere from "./PostFromHere";
import { allPost, Post, stateStruct } from "../interfaces/user_interface";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PernewsAndRecentComment from "./PernewsAndRecentComment";
import SeeMoreButton from "./SeeMoreButton";
import conf from "../conf/conf";
import { initializeAllPost, initializeUser } from "../features/login/Userslice";

export default function MiddleFeed() {
  const [ok, setOk] = useState<boolean>(false);
  const allPosts = useSelector((state: stateStruct) => state.allPost) || [];
  const currentUser = useSelector((state: stateStruct) => state.currentuser);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isEndAllPost, setIsEndAllPost] = useState<boolean>(false);

  const handleLoadMorePosts = async () => {
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;

      const response = await fetch(`${conf.apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          current_user: currentUser.email,
          page_number: nextPage,
        }),
      });

      const data = await response.json();
      if (data.data.length === 0) {
        console.log(data.data, "data.data");
        setIsEndAllPost(true);
      }
      if (data.data && data.data.length > 0) {
        setIsEndAllPost(false);
        dispatch(initializeAllPost([...allPosts, ...data.data]));
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to fetch more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 m-auto">
      <div className="_layout_middle_wrap _layout_middle_padding">
        <div className="_layout_middle_inner">
          <DailyStatus />

          <PostFromHere setOk={setOk} />

          {isEndAllPost && (
            <div className="flex justify-center m-3 mb-10 ">
              <p className="text-gray-500">No more posts available</p>
            </div>
          )}

          {allPosts.map((post: allPost, index: number) => (
            <div key={post.postId}>
              <PernewsAndRecentComment {...post} />
            </div>
          ))}
          {isEndAllPost && (
            <div className="flex justify-center m-3 mb-10 ">
              <p className="text-gray-500">No more posts available</p>
            </div>
          )}
          {!isEndAllPost && allPosts.length > 0 && (
            <SeeMoreButton
              onClick={handleLoadMorePosts}
              loading={isLoading}
              buttonText="See More Posts"
            />
          )}

          {!isEndAllPost && allPosts.length === 0 && (
            <SeeMoreButton
              onClick={handleLoadMorePosts}
              loading={isLoading}
              buttonText="Hmm its looks Like no posts are available, want to reload?"
            />
          )}
        </div>
      </div>
    </div>
  );
}
