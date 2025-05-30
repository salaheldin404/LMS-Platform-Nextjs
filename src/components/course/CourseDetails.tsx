interface CourseDetailsProps {
  title: string;
  price: number;
  category?: string;
}

const CourseDetails = ({ title, price, category }: CourseDetailsProps) => {
  return (
    <div className="py-3 px-4 border-b">
      <div className="mb-2 flex items-center gap-2 justify-between">
        <span>{category}</span>
        <span className="text-primary font-semibold text-lg">${price}</span>
      </div>
      <p className="font-medium">{title}</p>
    </div>
  );
};

export default CourseDetails;
