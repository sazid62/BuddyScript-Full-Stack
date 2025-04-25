import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftSide from "../components/middleComponents/SideComponents/LeftSide";
import RightSide from "../components/middleComponents/SideComponents/RightSide";
import MiddleFeed from "../components/MiddleFeed";

export default function HomePage() {
  const navigate = useNavigate();



  
  useEffect(() => {
    // const currentUser = localStorage.getItem("current_user");
    // if (!currentUser || currentUser === "null") {
    //   navigate("/");
    // }
  }, [navigate]);

  return (
    <div className="flex gap-4 mx-60">
      <LeftSide />
      <MiddleFeed />
      <RightSide />
    </div>
  );
}
