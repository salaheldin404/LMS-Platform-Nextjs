import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="pt-[100px] lg:pt-[150px]">
      <h2>Not Found</h2>
      <p>We can’t find the page you’re looking for</p>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
