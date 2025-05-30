import { FiLoader } from "react-icons/fi";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white/30 dark:bg-black/30 z-10">
      <FiLoader className="animate-pulse absolute left-1/2 top-1/2 text-[30px] -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default Loading;
