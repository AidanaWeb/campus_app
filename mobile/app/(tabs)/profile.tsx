import React from "react";
import SocialDetailScr from "../social/[id]";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SignupScr from "../social/signup";

export default function profile() {
  const user = useSelector((state: RootState) => state.user.info);

  if (!user) {
    return <SignupScr />;
  }

  return <SocialDetailScr id={user.id} />;
}
