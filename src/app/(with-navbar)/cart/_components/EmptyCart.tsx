import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="main-section">
      <div className="container">
        <div className="text-center py-16">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-400 border-dashed rounded-full"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">Keep shopping to find a course!</p>
          <Link
            href="/courses"
            className="px-6 py-3 rounded font-medium bg-primary text-white"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
