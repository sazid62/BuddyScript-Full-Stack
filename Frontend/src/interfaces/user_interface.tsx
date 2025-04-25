export interface Reply {
  reply_id: string;
  replier_id: string;
  replier_img: string;
  replier_name: string;
  ReplyText: string;
}
export interface CommentLike {
  comment_liker_id: string;
}

export interface Reaction {
  reactor_id: string;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  img?: string;
}

export interface Post {
  post_id: string;
  post_time: number;
  user_id: string;
  postText: string;
  isHidden: boolean;
  countReact: Reaction[];
  Comments: Comment[];
}
export interface allPostUser {
  email: string;
  name: string;
  userId: number;
}
export interface allPost {
  postId: number;
  userId: number;
  postText: string;
  postCreatedAt: string;
  user?: allPostUser[];
}
export interface Comment {
  comment_id: string;
  commentor_id: string;
  CommentText: string;
  commentor_name: string;
  commentor_img: string;
  like_comment_userList: CommentLike[];

  Replies: Reply[];
}

export interface userStruct {
  id: string;
  email: string;
  password: string;
  img: string;
  AllUserPost: Post[];
}

export interface stateStruct {
  user_info: userStruct[];
  currentuser: userStruct;
  AllUserPost: Post[];
  allPost: allPost[];
}

export interface CommentWPostId extends Comment {
  post_id: string;
}
