import { useState } from "react";
import { allPost, Post } from "../interfaces/user_interface";
import PerNewsFeed from "./PerNewsFeed";

export default function PernewsAndRecentComment(props: allPost, key: number) {
  const [show, setShow] = useState<boolean>(false);

  function handleShowCmnt() {
    setShow(!show);
  }
  // console.log(props, "props");
  return (
    <div>
      <PerNewsFeed
        show={show}
        handleShowCmnt={handleShowCmnt}
        {...props}
        key={key}
      />
    </div>
  );
}
