import { useSession } from "next-auth/react";
import React from "react";
import Buttons from "./Buttons";

type followButtonPropsType = {
  isLoading: boolean;
  isFollowing: boolean;
  userId: string;
  onClick: () => void;
};
const FollowButton = ({
  isLoading,
  isFollowing,
  userId,
  onClick,
}: followButtonPropsType) => {
  const userSession = useSession();

  if (
    userSession.status === "unauthenticated" ||
    userSession.data?.user.id === userId
  )
    return null;
  return (
    <Buttons disabled={isLoading} onClick={onClick} small gray={isFollowing}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Buttons>
  );
};

export default FollowButton;
