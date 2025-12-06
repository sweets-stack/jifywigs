// client/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // REMOVE html and body tags - let RootLayout handle them
    <div className="min-h-screen max-md: bg-gradient-to-br from-gray-50 to-gray-100">
      {children}
    </div>
  );
}