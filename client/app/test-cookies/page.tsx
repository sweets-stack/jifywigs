'use client';

import { useEffect, useState } from 'react';

export default function TestCookiesPage() {
  const [cookies, setCookies] = useState('');
  const [localStorageData, setLocalStorageData] = useState('');

  useEffect(() => {
    // Get all cookies
    setCookies(document.cookie);
    
    // Get localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setLocalStorageData(`Token: ${token ? 'YES' : 'NO'}, User: ${user ? 'YES' : 'NO'}`);
  }, []);

  const setTestCookie = () => {
    document.cookie = 'test=value; path=/; max-age=3600';
    setCookies(document.cookie);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cookie Debug Page</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Cookies:</h2>
        <pre className="bg-gray-100 p-2 rounded">{cookies}</pre>
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">LocalStorage:</h2>
        <pre className="bg-gray-100 p-2 rounded">{localStorageData}</pre>
      </div>
      
      <button 
        onClick={setTestCookie}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Set Test Cookie
      </button>
      
      <div className="mt-4">
        <a href="/admin" className="text-blue-600 hover:underline">Try admin page</a>
      </div>
    </div>
  );
}