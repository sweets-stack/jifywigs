// client/app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}