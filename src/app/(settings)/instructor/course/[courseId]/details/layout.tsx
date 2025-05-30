const CourseLayout = ({
  children,
  stats,
  ratings,
}: {
  children: React.ReactNode;
  stats: React.ReactNode;
  ratings: React.ReactNode;
}) => {
  return (
    <div className="my-5 space-y-5">
      {children}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-3">
        {stats}
        {ratings}
      </div>
    </div>
  );
};

export default CourseLayout;
