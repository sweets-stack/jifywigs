// client/app/training/page.tsx
'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function TrainingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Wig Styling Academy</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Become a certified wig stylist with our professional training programs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Wig Mastery Certification',
            duration: '4 Weeks',
            price: '₦60,000',
            mode: 'Online',
            desc: 'Comprehensive course covering installation, maintenance, and client consultation.',
          },
          {
            title: 'Glueless Installation Pro',
            duration: '2 Weeks',
            price: '₦35,000',
            mode: 'Physical',
            desc: 'Hands-on training in Lagos studio. Master glueless techniques.',
          },
          {
            title: 'Wig Business Bootcamp',
            duration: '6 Weeks',
            price: '₦120,000',
            mode: 'Hybrid',
            desc: 'From styling to running a profitable wig business. Includes mentorship.',
          },
        ].map((course, i) => (
          <div key={i} className="bg-white rounded-xl border overflow-hidden">
            <div className="h-48 bg-gray-100"></div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{course.title}</h3>
                <span className="bg-jify-primary/10 text-jify-primary text-xs px-2 py-1 rounded">
                  {course.mode}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{course.desc}</p>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="font-bold text-jify-primary">{course.price}</span>
                  <div className="text-sm text-gray-500">{course.duration}</div>
                </div>
                <Button size="sm">Enroll</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}