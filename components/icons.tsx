
import React from 'react';

export const MusicNoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M11.03 2.97a.75.75 0 010 1.06l-6.22 6.22a.75.75 0 00-.22.53v5.47a.75.75 0 001.5 0v-4.64L11.03 6.53a.75.75 0 011.06 0l4.97 4.97a.75.75 0 001.06-1.06l-5.5-5.5a.75.75 0 00-1.06 0l-5.5 5.5a.75.75 0 001.06 1.06l4.69-4.69z"
      clipRule="evenodd"
    />
    <path d="M12 1.5a.75.75 0 01.75.75v8.25a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5z" />
    <path d="M12 1.5a.75.75 0 01.75.75v8.25a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5z" transform="rotate(90 12 12)" />
    <path d="M3.75 21a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
    <path d="M12 1.5a.75.75 0 01.75.75v8.25a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5z" transform="rotate(180 12 12)" />
  </svg>
);

export const MusicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.07 1.918l-7.5 4.25a2.25 2.25 0 01-2.36 0L3.32 16.17a2.25 2.25 0 01-1.07-1.918v-3.75m10.5-3L3.32 9m0 0l10.5 3m0 0l10.5-3m0 0l-10.5-3m-10.5 3l10.5-3" />
  </svg>
);
