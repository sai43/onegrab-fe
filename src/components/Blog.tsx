import React from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  url: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Learn New Skills Quickly',
    excerpt: 'Discover effective strategies to accelerate your learning and master new skills faster.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    url: '/blog/learn-skills-quickly',
  },
  {
    id: 2,
    title: 'Top 10 Online Courses for Career Growth',
    excerpt: 'A curated list of online courses that can help you boost your professional skills.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    url: '/blog/top-online-courses',
  },
  {
    id: 3,
    title: 'Tips for Balancing Work and Study',
    excerpt: 'Learn how to manage your time effectively when juggling work and education.',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    url: '/blog/balancing-work-study',
  },
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-16 bg-gray-50" aria-labelledby="blog-heading">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2
          id="blog-heading"
          className="text-3xl font-bold text-gray-900 mb-12 text-center"
        >
          Latest from Our Blog
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map(({ id, title, excerpt, imageUrl, url }) => (
            <article
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <a href={url} aria-label={`Read more about ${title}`}>
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <a
                    href={url}
                    className="hover:text-indigo-600 transition-colors duration-200"
                  >
                    {title}
                  </a>
                </h3>
                <p className="text-gray-700 mb-4">{excerpt}</p>
                <a
                  href={url}
                  className="text-indigo-600 font-semibold hover:underline"
                  aria-label={`Read full article: ${title}`}
                >
                  Read More &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
