// client/src/lib/mongodb.ts → But wait: client shouldn’t connect to DB directly!
// ✅ Correction: This should be in `server/src/lib/mongodb.ts`
// For now, create a stub for client-side type safety only:
export const connectToDatabase = async () => {
  // This is a stub. Real DB connection is server-side.
  console.warn('⚠️ connectToDatabase called on client — should only be used in API routes');
};