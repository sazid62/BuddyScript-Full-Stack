import { Post } from "../interfaces/user_interface";
import PerComment from "./PerComment";

export default function AllCommentShow(props: Post) {
  const { Comments } = props;
  console.log(props, "ALlcomemnt");
  return (
    <div className="flex flex-col gap-2">
      {/* {Comments.map((elem) => {
        return <PerComment {...elem} post_id={props.post_id} />;
      })} */}
    </div>
  );
}
