import { useSession } from "next-auth/react";
import React from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import IconHoverEffect from "./IconHoverEffect";

type HeartButtonType = {
  handleToggleLike: () => void;
  isLoading: boolean;
  likedByMe: boolean;
  likeCount: number;
};

const HeartButton = ({
  likedByMe,
  likeCount,
  handleToggleLike,
  isLoading,
}: HeartButtonType) => {
  const userSession = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;

  if (userSession.status == "unauthenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        {likeCount}
      </div>
    );
  }

  return (
    <button
      className={`group ml-2 flex items-center gap-1 self-start transition-colors duration-200 ${
        likedByMe
          ? "text-red-500"
          : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
      }`}
      onClick={handleToggleLike}
      disabled={isLoading}
    >
      <IconHoverEffect red>
        <HeartIcon
          className={`transition-colors duration-200 ${
            likedByMe
              ? "fill-red-500"
              : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
          }`}
        />
      </IconHoverEffect>
      <span>{likeCount}</span>
    </button>
  );
};

export default HeartButton;
