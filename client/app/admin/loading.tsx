export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jify-primary-50 to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading admin panel...</p>
      </div>
    </div>
  );
}