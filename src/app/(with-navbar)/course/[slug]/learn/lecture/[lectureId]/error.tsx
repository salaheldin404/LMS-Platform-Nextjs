"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error, "errorr");
  return (
    <div className="main-section  text-red-600 ">
      <h2 className="text-lg font-semibold">Some thing went wrong</h2>
      <button
        onClick={reset}
        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded"
      >
        Try Again
      </button>
    </div>
  );
}
