import Image from "next/image";
import React from "react";
import { VscAccount } from "react-icons/vsc";

type ProfileImageType = {
  src?: string | null;
  className?: string;
};
const ProfileImage = ({ src, className = "" }: ProfileImageType) => {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src ? (
        <Image src={src} alt="Profile Image" quality={100} fill />
      ) : (
        <VscAccount className="h-full w-full" />
      )}
    </div>
  );
};

export default ProfileImage;
