import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-[100px] lg:pt-[150px] ">
      <h2>Not Found</h2>
      <p>No course found with this ID</p>
      <Link href={`/`}>Return Home</Link>
    </div>
  );
}
