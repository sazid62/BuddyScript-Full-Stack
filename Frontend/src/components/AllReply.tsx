import { Reply } from "../interfaces/user_interface";
import PerReply from "./PerReply";
type AllReplyProps = {
  allReplies: Reply[];
  setAllReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
};

{
  /* ok */
}
export default function AllReply({ allReplies, setAllReplies }: AllReplyProps) {
  setAllReplies(allReplies);

  return (
    <div className="ml-3 my-2 flex flex-col gap-1">
      {allReplies.length >= 1 &&
        allReplies.map((reply) => <PerReply {...reply} />)}
    </div>
  );
}
