import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Certificate {
  course: {
    title: string;
    image: {
      url: string;
    };
    slug: string;
  };
  certificateUrl: string;
  issuedAt: string;
}
interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  return (
    <Card className="max-w-[350px] bg-card rounded border dark:border-none hover:shadow-lg transition-shadow">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={certificate?.course?.image?.url}
          alt="course image"
          fill
          className="w-full h-[200px] rounded-t object-cover"
        />
        <Link href={`/course/${certificate?.course?.slug}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
            <span className="text-white font-medium">View course</span>
          </div>
        </Link>
      </div>
      <CardContent className="p-3">
        <h3>{certificate?.course?.title}</h3>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        {/* <div className="flex gap-3 justify-between items-center p-3"> */}
        <p className="text-gray-400 text-sm">
          Issued: {new Date(certificate?.issuedAt).toLocaleDateString()}
        </p>
        <Link
          href={certificate?.certificateUrl}
          target="_blank"
          className="bg-primary px-4 py-2 rounded text-white"
        >
          Download
        </Link>
        {/* </div> */}
      </CardFooter>
    </Card>
  );
};

export default CertificateCard;
