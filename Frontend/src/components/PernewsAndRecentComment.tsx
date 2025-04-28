import { useState } from "react";
import { allPost, Post } from "../interfaces/user_interface";
import PerNewsFeed from "./PerNewsFeed";
import { current, nanoid } from "@reduxjs/toolkit";

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
        // key={props.postId}
        handleShowCmnt={handleShowCmnt}
        {...props}
      />
    </div>
  );
}
