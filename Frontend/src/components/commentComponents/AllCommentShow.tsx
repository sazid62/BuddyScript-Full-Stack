import { Post } from "../../interfaces/user_interface";
import PerComment from "./PerComment";

export default function AllCommentShow(props: Post) {
  const { Comments } = props;

  return (
    <div className="flex flex-col gap-2">
      {Comments.map((elem, index) => {
        return <PerComment key={index} {...elem} post_id={props.post_id} />;
      })}
    </div>
  );
}
