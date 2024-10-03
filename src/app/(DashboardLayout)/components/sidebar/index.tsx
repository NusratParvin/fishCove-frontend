"use client";
import SuggestedAuthor from "../../user/components/suggestedAuthor";
import SuggestedArticles from "../../user/components/suggestedArticles";

import { useAppSelector } from "@/src/redux/hooks";
import { useCurrentUser } from "@/src/redux/features/auth/authSlice";

const Sidebar = () => {
  const user = useAppSelector(useCurrentUser);

  return (
    <div className="flex flex-col bg-secondary/20 border-none">
      <div className=" ">
        <SuggestedAuthor />
      </div>
      <div>
        <SuggestedArticles />
      </div>
    </div>
  );
};

export default Sidebar;
