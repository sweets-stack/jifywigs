// client/app/(marketing)/blog/page.tsx
import Link from 'next/link';

const blogPosts = [
  {
    id: '1',
    title: 'How to Care for Your Human Hair Wig',
    excerpt: 'Essential tips for maintaining your wig’s quality and longevity.',
    date: 'Dec 1, 2025',
    image: 'https://placehold.co/400x200/EEE/999?text=Wig+Care',
  },
  {
    id: '2',
    title: 'Top 5 Wig Styles for the Holiday Season',
    excerpt: 'Trendy looks to rock during the festive period.',
    date: 'Nov 25, 2025',
    image: 'https://placehold.co/400x200/EEE/999?text=Holiday+Wigs',
  },
  {
    id: '3',
    title: 'The Difference Between Frontal and Closure Wigs',
    excerpt: 'Understanding which type is right for you.',
    date: 'Nov 18, 2025',
    image: 'https://placehold.co/400x200/EEE/999?text=Frontal+vs+Closure',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">JifyWigs Blog</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Tips, trends, and tutorials for wig lovers and professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <time className="text-sm text-gray-500">{post.date}</time>
              <h2 className="text-xl font-semibold mt-2 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.id}`}
                className="text-jify-primary font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}