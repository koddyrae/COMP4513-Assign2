export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
      <div className="w-12 h-12 border-4 border-zinc-700 border-t-violet-500 rounded-full animate-spin mb-4"></div>
      <p className="text-zinc-400 text-sm">{message}</p>
    </div>
  );
}