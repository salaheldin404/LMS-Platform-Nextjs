import Image from "next/image";

const TeamSplitImages = () => {
  return (
    <div className="hidden md:flex  gap-4 justify-center items-center p-4 xl:p-8 xl:pl-[50px]">
      {/* Left Group Image */}
      <div className="relative w-[200px] h-[300px] lg:w-[300px] lg:h-[400px]">
        <Image
          src="/team-left.png"
          alt="Team Group"
          fill
          className="object-cover rounded"
        />
      </div>

      {/* Right Individual Image */}
      <div className="relative w-[150px] h-[300px] lg:h-[400px]">
        <Image
          src="/team-right.png"
          alt="Smiling Woman"
          fill
          className="object-cover rounded"
        />
      </div>
    </div>
  );
};

export default TeamSplitImages;
