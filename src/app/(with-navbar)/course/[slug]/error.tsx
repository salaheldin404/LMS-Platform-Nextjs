"use client"; // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="main-section text-center mt-4">
      <h2>{error.message || "Something went wrong!"}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
