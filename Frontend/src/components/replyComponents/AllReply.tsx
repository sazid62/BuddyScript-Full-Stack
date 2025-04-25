
import { Reply } from "../../interfaces/user_interface";
import PerReply from "./PerReply";


export default function AllReply({ replies }: { replies: Reply[] }) {

  

  return (
    <div className="ml-3 my-2 flex flex-col gap-1" >
      {replies &&
        replies.map((reply) => (
          <PerReply {...reply} />
        ))}
    </div>
  );
}
