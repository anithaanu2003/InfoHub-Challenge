export default function Spinner({ size = "8" }) {
  return (
    <div className={`w-${size} h-${size} border-4 border-t-white border-gray-300 rounded-full animate-spin mx-auto my-4`}></div>
  );
}
