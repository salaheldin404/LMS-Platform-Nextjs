import Link from "next/link";

export default function NotFound() {
  return (
    <div className='pt-[100px] lg:pt-[150px] '>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
