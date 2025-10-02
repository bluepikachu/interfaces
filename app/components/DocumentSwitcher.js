'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const documents = [
  {
    id: 'rauno',
    title: 'Rauno'
  },
  {
    id: 'vercel-design',
    title: 'Vercel Design'
  }
];

export default function DocumentSwitcher({ currentDoc }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const handleDocumentChange = (docId) => {
    if (docId === currentDoc) return;
    
    startTransition(() => {
      router.push(`/?doc=${docId}`);
    });
  };

  return (
    <div className="document-switcher">
      <div className="switcher-buttons">
        {documents.map((doc) => (
          <button
            key={doc.id}
            className={`switcher-button ${currentDoc === doc.id ? 'active' : ''} ${isPending ? 'loading' : ''}`}
            onClick={() => handleDocumentChange(doc.id)}
            disabled={isPending}
          >
            <span className="button-title">{doc.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}