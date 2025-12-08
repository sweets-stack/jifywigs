export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const post = {
    title: 'How to Care for Your Human Hair Wig',
    date: 'Dec 1, 2025',
    author: 'Aunty Jify',
    content: `
      <h2>Washing Your Wig</h2>
      <p>Always use sulfate-free shampoo designed for human hair wigs. Fill a basin with cold water and add a small amount of shampoo. Gently swirl the wig in the water for 1-2 minutes. Rinse thoroughly with cold water.</p>
      
      <h2>Conditioning</h2>
      <p>Apply a small amount of conditioner from mid-length to ends. Avoid the roots/lace area. Leave for 3-5 minutes, then rinse thoroughly.</p>
      
      <h2>Drying</h2>
      <p>Gently squeeze out excess water (never wring). Place on a wig stand and let air dry completely. Never use heat tools on high settings.</p>
      
      <h2>Styling</h2>
      <p>Use heat tools on low-medium settings only. Always apply heat protectant spray before styling. For curly wigs, use curl-defining products sparingly.</p>
      
      <h2>Storage</h2>
      <p>Store on a wig stand or mannequin head when not in use. Keep away from direct sunlight and dust.</p>
    `
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <time className="text-sm text-gray-500">{post.date}</time>
        <h1 className="text-3xl font-bold mt-2">{post.title}</h1>
        <p className="text-gray-600 mt-2">By {post.author}</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <img
          src="https://placehold.co/800x400/EEE/999?text=Wig+Care+Guide"
          alt="Wig care"
          className="w-full rounded-lg mb-8"
        />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="#" className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <h3 className="font-medium">Top 5 Wig Styles for the Holiday Season</h3>
          </a>
          <a href="#" className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <h3 className="font-medium">The Difference Between Frontal and Closure Wigs</h3>
          </a>
        </div>
      </div>
    </div>
  );
}