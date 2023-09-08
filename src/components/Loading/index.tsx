import { FC } from "react";
import LoadingIcon from "../icons/LoadingIcon";

const Loading: FC = () => {
  return (
    <div className="w-full mt-24">
      <div className="w-32 mx-auto">
        <LoadingIcon />
      </div>
    </div>
  );
};

export default Loading;
