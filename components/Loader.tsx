
import React from 'react';

const Loader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-slate-800/50 rounded-lg">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-600 border-t-cyan-400 rounded-full animate-spin"></div>
      <p className="text-cyan-300 font-medium">{message}</p>
    </div>
  );
};

export default Loader;
