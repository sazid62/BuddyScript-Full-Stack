import DailyStatus from "./DailyStatus";
import MessengerCircle from "./MessngerCircle";
import PostFromHere from "./PostFromHere";
import { allPost, Post, stateStruct } from "../interfaces/user_interface";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import PernewsAndRecentComment from "./PernewsAndRecentComment";

export default function MiddleFeed() {
  const post = useSelector((state: stateStruct) => state.allPost);
  useEffect(() => {
    // if (post.length) console.log(post, "HEY");
  }, [post]);
  // console.log(post, "post");

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 m-auto">
      <div className="_layout_middle_wrap _layout_middle_padding">
        <div className="_layout_middle_inner">
          <DailyStatus />

          <MessengerCircle />

          <PostFromHere />
          {post.map((elem: allPost, index) => (
            <PernewsAndRecentComment key={index} {...elem} />
          ))}
          {/* {post.map(
            (elem: Post, index) =>
              (elem.isHidden === false || elem.user_id === current_user.id) && (
                <PernewsAndRecentComment key={index} {...elem} />
              )
          )} */}
        </div>
      </div>
    </div>
  );
}
