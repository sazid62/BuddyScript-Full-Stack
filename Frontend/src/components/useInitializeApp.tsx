import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAllPost, initializeUser } from "../features/login/Userslice";
import { useNavigate } from "react-router-dom";
import { retry } from "@reduxjs/toolkit/query";
import { current } from "@reduxjs/toolkit";

// This function should not be called directly in useEffect
// It's properly formatted as a custom React hook that can be called at the top level of a component
export const useInitializeApp = (shouldInitialize) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!shouldInitialize) return;
    const initApp = async () => {
      try {
        const userResponse = await fetch("http://localhost:3333/islogin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const userData = await userResponse.json();
        if (userData.errors && window.location.pathname == "/home") {
          navigate("/");
          return;
        }
        if (!userData.errors && window.location.pathname !== "/home") {
          navigate("/home");
          return;
        }
        if (!userData.errors && window.location.pathname === "/home") {
          // initialize user
          dispatch(
            initializeUser({
              userId: userData.userId || "",
              email: userData.email || "",
            })
          );

          // fetch posts
          const postsResponse = await fetch(
            `http://localhost:3333/${userData.email}/posts`,
            {
              method: "GET",
            }
          );
          const allPost = await postsResponse.json();
          dispatch(initializeAllPost(allPost.data));
          navigate("/home");
          return 1;
        } else return 0;
      } catch (error) {
        dispatch(
          initializeUser({
            userId: "",
            email: "",
          })
        );

        return 0;
      }
    };

    initApp();
  }, []); // Empty dependency array means this effect runs only once when the component mounts
  // return 1;
};

export function logoutFromServer() {
  fetch("http://localhost:3333/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LOGOUT");
    });
}

export async function fetchAllLiker(postId: number) {
  try {
    const response = await fetch(
      `http://localhost:3333/posts/${postId}/likes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.data.latest_users;
  } catch (err) {
    return [];
  }
}
