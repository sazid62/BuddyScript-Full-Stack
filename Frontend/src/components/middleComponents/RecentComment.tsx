import { useSelector } from "react-redux";
import { Post, stateStruct } from "../../interfaces/user_interface";
import AllCommentShow from "../commentComponents/AllCommentShow";
import PerComment from "../commentComponents/PerComment";


interface PostExtends extends Post {
  show: boolean;
  handleShowCmnt: () => void;
}

export default function RecentComment(props: PostExtends) {
  const postInfo = useSelector((state: stateStruct) => state.AllUserPost).find(
    (elem) => elem.post_id === props.post_id
  );

  return (
    <div>
      <div className="_timline_comment_main">
        <div className="_previous_comment">
          {props.show ? (
            <>
              <AllCommentShow key={"idxComment"} {...props} />
              <button
                onClick={props.handleShowCmnt}
                type="button"
                className="_previous_comment_txt"
              >
                Hide comments
              </button>
            </>
          ) : (
            <button
              onClick={props.handleShowCmnt}
              type="button"
              className="_previous_comment_txt"
            >
              View {postInfo?.Comments.length} previous comments
            </button>
          )}
        </div>
        {(postInfo?.Comments?.length ?? 0) > 0 && !props.show ? (
          <PerComment
            comment_id={postInfo?.Comments[0].comment_id || ""}
            CommentText={postInfo?.Comments[0].CommentText || ""}
            commentor_name={postInfo?.Comments[0].commentor_name || ""}
            commentor_img={postInfo?.Comments[0].commentor_img || ""}
            Replies={postInfo?.Comments[0].Replies || []}
            post_id={props.post_id}
            commentor_id={postInfo?.Comments[0].commentor_id || ""}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}