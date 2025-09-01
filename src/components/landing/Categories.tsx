import CategoryCard from "../ui/CategoryCard";
import { categoriesData } from "@/data";
const Categories = () => {
  return (
    <section className="py-20 ">
      <div className="container">
        <h1 className="font-bold text-4xl text-center ">Browse top category</h1>
        <div className="grid  md:grid-cols-3 lg:grid-cols-4  gap-4 mt-4">
          {categoriesData.map((category) => (
            <CategoryCard key={category.value} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
