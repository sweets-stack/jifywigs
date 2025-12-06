'use client';

import { useAuth } from '../../../contexts/AuthContext';

export const UserDebug = () => {
  const { user, isAdmin, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50">
      <div>User: {user?.name}</div>
      <div>Role: {user?.role}</div>
      <div>Is Admin: {isAdmin ? 'YES' : 'NO'}</div>
      <div>ID: {user?._id?.substring(0, 8)}...</div>
      <button 
        onClick={() => console.log('User data:', user)}
        className="mt-2 text-blue-300 hover:text-blue-100"
      >
        Log to Console
      </button>
    </div>
  );
};