import Image from "next/image";

interface ICollageImageProps {
  src: string;
  alt: string;
  className: string;
}
const CollageImage = ({ src, alt, className }: ICollageImageProps) => (
  <div
    className={`relative overflow-hidden rounded-xl shadow-lg group ${className}`}
  >
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
    <div className="absolute bottom-0 left-0 p-4">
      <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
        {alt}
      </p>
    </div>
  </div>
);

// const ImageCollage = () => {
//   return (
//     <div className="p-4 w-full md:basis-[60%]">
//       <div className="max-w-6xl grid grid-cols-3 gap-4">
//         {/* Top Left */}
//         <div className="relative w-full h-64">
//           <Image
//             src="/about-1.png"
//             alt="Office Space"
//             fill
//             className="object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Top Center */}
//         <div className="relative w-full h-64">
//           <Image
//             src="/about-2.png"
//             alt="Team Discussion"
//             fill
//             className="object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Top Right */}
//         <div className="relative w-full h-64">
//           <Image
//             src="/about-3.png"
//             alt="Man on Phone"
//             fill
//             className="object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Middle Left */}
//         <div className="relative w-full h-64">
//           <Image
//             src="/about-4.png"
//             alt="Reports and Plant"
//             fill
//             className="object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Middle Center (Spans 2 columns) */}
//         <div className="relative w-full h-64 col-span-2">
//           <Image
//             src="/about-5.png"
//             alt="Team Meeting"
//             fill
//             className="object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Bottom Left */}
//         <div className="relative w-full h-64">
//           <Image
//             src="/about-6.png"
//             alt="Coworkers with Laptop"
//             fill
//             className="object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Bottom Right */}
//         <div className="relative w-full h-64">
//           <Image
//             src="/about-7.png"
//             alt="Woman Smiling"
//             fill
//             className="object-cover rounded-lg shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// The main component for the image collage layout
const ImageCollage = () => {
  // Array of image data to make it easier to manage
  const images = [
    {
      src: "/about-1.webp",
      alt: "Team Collaboration",
      className: "md:col-span-2 lg:row-span-2",
    },
    {
      src: "/about-2.webp",
      alt: "Strategic Planning",
      className: "",
    },
    {
      src: "/about-3.webp",
      alt: "Office Presentation",
      className: "",
    },
    {
      src: "/about-4.webp",
      alt: "Group Discussion",
      className: "md:col-span-2",
    },
    {
      src: "/about-8.webp",
      alt: "Creative Workspace",
      className: "",
    },
    {
      src: "/about-5.webp",
      alt: "Business Deal",
      className: "",
    },
    {
      src: "/about-6.webp",
      alt: "Modern Office",
      className: "lg:col-span-2 lg:row-span-2",
    },
    {
      src: "/about-7.webp",
      alt: "Team Success",
      className: "lg:col-span-2",
    },
  ];
  return (
    <div className="w-full max-w-6xl md:basis-[60%]">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4">
        {images.map((image, index) => (
          <CollageImage
            key={index}
            src={image.src}
            alt={image.alt}
            className={image.className}
          />
        ))}
      </div>
    </div>
  );
};
export default ImageCollage;
