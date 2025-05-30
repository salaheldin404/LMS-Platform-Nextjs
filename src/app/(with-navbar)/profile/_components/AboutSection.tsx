const AboutSection = ({ biography }: { biography?: string }) => {
  return (
    <div className="  w-full lg:w-auto lg:basis-[40%] rounded border bg-card p-4">
      <p className="text-2xl uppercase mb-3">About me</p>
      <p className="text-gray-400 text-base/8">{biography}</p>
    </div>
  );
};

export default AboutSection;
