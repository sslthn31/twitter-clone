import { VscRefresh } from "react-icons/vsc";

type LoadingAnimationType = {
  big?: boolean;
};

export const LoadingAnimation = ({ big }: LoadingAnimationType) => {
  const sizeCondition = big ? "w-16 h-16" : "w-10 h-10";
  return (
    <div className="flex justify-center p-2">
      <VscRefresh className={`animate-spin ${sizeCondition}`} />
    </div>
  );
};
