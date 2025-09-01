import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl">
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-300">Error 404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            Oops! page not found
          </h2>
          <p className="text-gray-600 mt-4 max-w-md">
            Something went wrong. It looks like your requested page could not be
            found. It’s possible the link is broken or the page has been
            removed.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/80"
          >
            Go Back
          </Link>
        </div>

        {/* Image/Graphic Section */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/404-Error2.gif" // Replace with your actual image path
            alt="A lost person looking at a map illustration"
            width={600}
            height={600}
            className="w-full max-w-md h-auto "
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
