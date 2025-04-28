import { nanoid } from "@reduxjs/toolkit";
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
  return (
    <div className="ml-3 my-2 flex flex-col gap-1">
      {allReplies.length >= 1 &&
        allReplies.map((reply, index) => (
          <div key={index}>
            {" "}
            <PerReply {...reply} />{" "}
          </div>
        ))}
    </div>
  );
}
