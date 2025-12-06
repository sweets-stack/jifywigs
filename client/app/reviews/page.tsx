// client/app/admin/reviews/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  TrashIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { IReview } from '@jifywigs/shared/types'; // ✅ Changed from Review to IReview

// Define a local interface that extends IReview with productName
interface AdminReview extends IReview {
  productName?: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]); // ✅ Use AdminReview type
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null);

  // Load pending reviews
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch('/api/admin/reviews/pending');
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Approve review
  const approveReview = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true })
      });

      if (res.ok) {
        setReviews(prev => prev.filter(r => r._id !== id));
        alert('Review approved and published!');
      }
    } catch (error) {
      alert('Failed to approve review');
    }
  };

  // Reject review
  const rejectReview = async (id: string) => {
    if (!confirm('Are you sure you want to reject this review?')) return;
    
    try {
      const res = await fetch(`/api/admin/reviews/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: false })
      });

      if (res.ok) {
        setReviews(prev => prev.filter(r => r._id !== id));
        alert('Review rejected and deleted');
      }
    } catch (error) {
      alert('Failed to reject review');
    }
  };

  // Delete review
  const deleteReview = async (id: string) => {
    if (!confirm('Permanently delete this review?')) return;
    
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setReviews(prev => prev.filter(r => r._id !== id));
        alert('Review deleted');
      }
    } catch (error) {
      alert('Failed to delete review');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Review Moderation</h1>
            <p className="mt-2 text-gray-600">Approve or reject customer reviews</p>
          </div>
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {reviews.length} pending reviews
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending reviews</h3>
            <p className="text-gray-500">All reviews have been moderated.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr key={review._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {review.productName}
                        </div>
                        <div className="text-sm text-gray-500">{review.productId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{review.userName}</div>
                        <div className="text-sm text-gray-500">{review.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 line-clamp-2">
                          {review.comment}
                        </div>
                        {review.images && review.images.length > 0 && (
                          <div className="mt-2 flex space-x-1">
                            {review.images.slice(0, 2).map((img: string | undefined, idx: number) => ( // ✅ Changed to number type
                              <div key={idx} className="w-8 h-8 rounded border overflow-hidden">
                                <img 
                                  src={img} 
                                  alt="" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            {review.images.length > 2 && (
                              <div className="w-8 h-8 rounded border bg-gray-100 flex items-center justify-center text-xs">
                                +{review.images.length - 2}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="text-jify-primary-500 hover:text-jify-primary-700 mr-4"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => approveReview(review._id!)}
                          className="text-green-500 hover:text-green-700 mr-4"
                        >
                          <CheckCircleIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => rejectReview(review._id!)}
                          className="text-red-500 hover:text-red-700 mr-4"
                        >
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteReview(review._id!)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {selectedReview && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedReview(null)}></div>
              
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Review Details
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Product</h4>
                          <p className="text-gray-900">{selectedReview.productName}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Customer</h4>
                          <p className="text-gray-900">{selectedReview.userName}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Rating</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-5 h-5 ${i < selectedReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Comment</h4>
                          <p className="text-gray-900 whitespace-pre-line">{selectedReview.comment}</p>
                        </div>
                        
                        {selectedReview.images && selectedReview.images.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Photos</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {selectedReview.images.map((img: string | undefined, idx: number) => ( // ✅ Changed to number type
                                <div key={idx} className="aspect-square rounded overflow-hidden border">
                                  <img 
                                    src={img} 
                                    alt={`Review ${idx + 1}`} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setSelectedReview(null)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}