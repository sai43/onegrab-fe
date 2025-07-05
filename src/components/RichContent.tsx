import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import slugify from 'slugify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface RichContentProps {
  content: string | null | undefined;
  notes?: string | null | undefined;
  fallback?: string;
}

interface Heading {
  text: string;
  slug: string;
  level: number;
}

const RichContent: React.FC<RichContentProps> = ({
  content,
  notes,
  fallback = 'Content coming soon 🚧',
}) => {
  const markdownContent = content?.trim() || notes?.trim() || '';
  const [isDarkCodeTheme, setIsDarkCodeTheme] = useState(true);
  const [toc, setToc] = useState<Heading[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!markdownContent) return;

    const tree = unified().use(remarkParse).parse(markdownContent);
    const headings: Heading[] = [];
    const slugCount: Record<string, number> = {};

    function walk(node: any) {
      if (node.type === 'heading' && node.depth <= 3) {
        const text = node.children
          .filter((child: any) => child.type === 'text' || child.type === 'inlineCode')
          .map((child: any) => child.value)
          .join('');
        let slug = slugify(text, { lower: true, strict: true });

        // Ensure uniqueness by adding suffix if repeated
        if (slugCount[slug]) {
          slugCount[slug] += 1;
          slug += `-${slugCount[slug]}`;
        } else {
          slugCount[slug] = 1;
        }

        headings.push({ text, slug, level: node.depth });
      }
      if (node.children) {
        node.children.forEach(walk);
      }
    }

    walk(tree);
    setToc(headings);
  }, [markdownContent]);

  useEffect(() => {
    if (!toc.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0,
      }
    );

    toc.forEach((heading) => {
      const el = document.getElementById(heading.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!markdownContent) {
    return <p className="text-gray-500 italic">{fallback}</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* TOC */}
      {toc.length > 0 && (
        <aside className="hidden lg:block lg:w-1/4">
          <nav className="sticky top-24 space-y-2 text-sm">
            <p className="font-bold mb-2">On this page</p>
            {toc.map((heading, index) => (
              <a
                key={`${heading.slug}-${index}`}
                href={`#${heading.slug}`}
                className={`block pl-${heading.level === 3 ? 4 : 2} transition ${
                  activeSlug === heading.slug
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </aside>
      )}

      {/* Main content */}
      <article className="prose prose-zinc lg:prose-lg dark:prose-invert max-w-none flex-1">
        <button
          onClick={() => setIsDarkCodeTheme(!isDarkCodeTheme)}
          className="mb-4 px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Toggle Code Theme: {isDarkCodeTheme ? 'Dark' : 'Light'}
        </button>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2({ node, children, ...props }) {
              const text = String(children);
              let slug = slugify(text, { lower: true, strict: true });

              // Ensure unique slug using node position
              const position = node?.position?.start?.line || Math.random();
              slug += `-${position}`;

              return (
                <h2 id={slug} {...props} className="group scroll-mt-20">
                  {children}
                  <a
                    href={`#${slug}`}
                    className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400"
                  >
                    #
                  </a>
                </h2>
              );
            },
            h3({ node, children, ...props }) {
              const text = String(children);
              let slug = slugify(text, { lower: true, strict: true });

              const position = node?.position?.start?.line || Math.random();
              slug += `-${position}`;

              return (
                <h3 id={slug} {...props} className="group scroll-mt-20">
                  {children}
                  <a
                    href={`#${slug}`}
                    className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400"
                  >
                    #
                  </a>
                </h3>
              );
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              if (!inline && match) {
                return (
                  <SyntaxHighlighter
                    style={isDarkCodeTheme ? oneDark : oneLight}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: '0.5rem',
                      padding: '1rem',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                );
              }
              return (
                <code
                  className={className}
                  style={{
                    backgroundColor: 'rgba(135, 131, 120, 0.15)',
                    padding: '0.2em 0.4em',
                    borderRadius: '0.3em',
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            a({ href, children, ...props }) {
              return (
                <a
                  href={href}
                  className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              );
            },
            img({ src, alt, ...props }) {
              return (
                <img
                  src={src || ''}
                  alt={alt || ''}
                  loading="lazy"
                  className="rounded shadow-md my-4 mx-auto"
                  {...props}
                />
              );
            },
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default RichContent;
