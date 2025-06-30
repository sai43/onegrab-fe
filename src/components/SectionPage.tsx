// /components/SectionPage.tsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SectionPage = () => {
  const { sectionId } = useParams();
  const [section, setSection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSection = async () => {
      const token = JSON.parse(localStorage.getItem('onegrab_user') || '{}').token;
      const backendUrl = import.meta.env.VITE_API_BASE_URL;

      try {
        const res = await fetch(`${backendUrl}/api/v1/sections/${sectionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch section");

        const data = await res.json();
        setSection(data.section);
      } catch (err: any) {
        toast.error(err.message || "Error loading section");
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [sectionId]);

  if (loading) return <p>Loading section...</p>;
  if (!section) return <p>Section not found.</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">{section.attributes.title}</h2>
      <p className="mb-4 text-gray-600">{section.attributes.description}</p>

      {section.relationships.lessons.data.map((lesson: any) => (
        <div key={lesson.id} className="mb-6 p-4 border rounded-lg">
          <h3 className="text-xl font-semibold">{lesson.attributes.title}</h3>
          <p className="text-gray-500">{lesson.attributes.description}</p>

          <div className="mt-2 space-y-2">
            {lesson.relationships.topics.data.map((topic: any) => (
              <div key={topic.id} className="p-2 border rounded-md">
                <h4 className="text-lg">{topic.attributes.title}</h4>
                <p>{topic.attributes.content}</p>
                {topic.attributes.video_url && (
                  <video controls src={topic.attributes.video_url} className="w-full my-2" />
                )}
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Mark Complete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionPage;
