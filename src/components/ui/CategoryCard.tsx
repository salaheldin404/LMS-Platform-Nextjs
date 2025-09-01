import { IconType } from "react-icons/lib";

interface Category {
  value: string;
  label: string;
  icon: IconType;
  iconColor: string;
  bgColor: string;
}
const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <div
      key={category.value}
      className={`flex items-center gap-4  px-3 py-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
      style={{ backgroundColor: category.bgColor }}
    >
      <div className={`w-16 h-16  flex items-center justify-center bg-white`}>
        <category.icon style={{ color: category.iconColor }} size={32} />
      </div>
      <div>
        <h4 className="text-black font-medium">{category.label}</h4>
        <p className="text-sm text-muted-foreground dark:text-black">
          {category.value}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
