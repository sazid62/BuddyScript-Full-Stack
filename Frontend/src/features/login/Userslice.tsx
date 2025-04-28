import { createSlice, current, nanoid } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { Comment, Post, userStruct } from "../../interfaces/user_interface";
import axios, { all } from "axios";
import conf from "../../conf/conf";

// Define initial empty state
const initialState = {
  user_info: JSON.parse(
    localStorage.getItem("userinfo") ||
      '[{"":"1","email":"sajid@gmail.com","password":"1234","img":"https://i.pravatar.cc/48?u=118834"}]'
  ),
  currentuser: {
    id: "",
    email: "",
    img:
      "https://i.pravatar.cc/48?u=115" +
      String(Math.floor(Math.random() * 1000)),
  },
  AllUserPost: [],
  ShowComment: false,
  allPost: [], // New structure for posts
};

// Create the slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action) => {
      const { userId, email } = action.payload;
      state.currentuser.id = userId || "";
      state.currentuser.email = email || "";
    },
    initializeAllPost: (state, action) => {
      state.allPost = action.payload;
    },
    AddUser: (state, action) => {
      const { email, id, img } = action.payload;
      state.currentuser.email = email;
      state.currentuser.id = id;
      state.currentuser.img = img;
    },
    logOutUser: (state) => {
      state.allPost = [];

      (state.AllUserPost = []),
        (state.ShowComment = false),
        (state.currentuser = {
          id: "",
          email: "",
          img:
            "https://i.pravatar.cc/48?u=115" +
            String(Math.floor(Math.random() * 1000)),
        });
    },
    AddReact: (state, action) => {
      if (state.currentuser.id === "") {
        Swal.fire({
          title: "please login to react!!",
          icon: "info",
        });
        return;
      }
      const { postId, userId } = action.payload;

      const postIndex = state.allPost.findIndex(
        (post) => post.postId === postId
      );

      if (postIndex !== -1) {
        const post = state.allPost[postIndex];

        // Toggle like status
        if (!post.liked) {
          // Add like
          post.totalLikes = (post.totalLikes || 0) + 1;
          post.liked = true;

          // Add current user to last10users if not already there
          const userExists = post.last10users?.some(
            (user) => user.userId === userId
          );
          if (!userExists && state.currentuser) {
            post.last10users = post.last10users || [];
            post.last10users.unshift({
              userId: state.currentuser.id,
              email: state.currentuser.email,
            });
            // Keep only 10 users
            if (post.last10users.length > 10) {
              post.last10users.pop();
            }
          }
        } else {
          // Remove like
          post.totalLikes = Math.max(0, (post.totalLikes || 0) - 1);
          post.liked = false;

          // Remove current user from last10users
          if (post.last10users) {
            post.last10users = post.last10users.filter(
              (user) =>
                user.userId !== userId && user.email !== state.currentuser.email
            );
          }
        }
      }
    },
    AddCommentCount: (state, action) => {
      const { postId } = action.payload;
      const postIndex = state.allPost.findIndex(
        (post) => post.postId === postId
      );

      if (postIndex !== -1) {
        const post = state.allPost[postIndex];
        post.commentCount = (post.commentCount || 0) + 1;
      }

      console.log("SLICE");
    },

    AddPost: (state, action) => {
      if (state.currentuser.id === "") {
        Swal.fire({
          title: "please login to create post!!",
          icon: "info",
        });
        return;
      }

      // The post will be added via API and retrieved later
      // This is just for UI feedback
      Swal.fire({
        title: "Posted",
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    DeletePost: (state, action) => {
      const { postId } = action.payload;

      // Find the post
      const postIndex = state.allPost.findIndex(
        (post) => post.postId === postId
      );

      if (postIndex !== -1) {
        const post = state.allPost[postIndex];

        // Check if current user is authorized to delete
        if (post.userId === state.currentuser.id) {
          // Remove the post from the array
          state.allPost.splice(postIndex, 1);

          Swal.fire({
            title: "Post deleted successfully!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "You are not authorized!",
            icon: "error",
          });
        }
      }
    },

    HidePost: (state, action) => {
      const { postId } = action.payload;

      const postIndex = state.allPost.findIndex(
        (post) => post.postId === postId
      );

      if (postIndex !== -1) {
        const post = state.allPost[postIndex];

        if (post.userId === state.currentuser.id) {
          // Toggle hidden status
          post.isHidden = !post.isHidden;
        } else {
          Swal.fire({
            title: "You are not authorized!!",
            icon: "error",
          });
        }
      }
    },

    EditPost: (state, action) => {
      const { postId, newText } = action.payload;

      const postIndex = state.allPost.findIndex(
        (post) => post.postId === postId
      );

      if (postIndex !== -1) {
        const post = state.allPost[postIndex];

        if (post.userId === state.currentuser.id) {
          // Update the post text
          post.postText = newText;
        } else {
          Swal.fire({
            title: "You are not authorized",
            icon: "error",
          });
        }
      }
    },

    // Keep the comment like functionality but adapt it to the new structure if needed
    AddLikeToComment: (state, action) => {
      if (state.currentuser.id === "") {
        Swal.fire({
          title: "Please login to like a comment!",
          icon: "info",
        });
        return;
      }

      // Since comments are fetched separately, this might need to be implemented
      // in the comment-specific components or with a different approach
    },
  },
});

export const {
  initializeUser,
  logOutUser,
  AddUser,
  AddCommentCount,
  AddPost,
  AddReact,
  AddReply,
  DeletePost,
  HidePost,
  EditPost,
  AddLikeToComment,
  initializeAllPost,
} = userSlice.actions;
export default userSlice.reducer;
