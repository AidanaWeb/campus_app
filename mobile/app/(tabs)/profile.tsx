import React from "react";
import SocialDetailScr from "../social/[id]";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SignupScr from "../social/signup";
import LoginScr from "../social/login";

export default function profile() {
  const user = useSelector((state: RootState) => state.user.info);

  if (!user) {
    return <LoginScr />;
  }

  return <SocialDetailScr id={user.id} />;
}
