import React, { useState } from 'react';
import { getMockData } from 'src/app/api/media/mock';
import { GET } from 'src/app/api/media/route';

export const MediaUploader = (): JSX.Element => {
  const [count, setCount] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(event.target.value));
  };

  const handleGenerate = () => {
    const data = getMockData();
    console.log(data);
    GET();
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Upload Media</h2>
      <input
        type="number"
        min="1"
        max="100"
        value={count}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Generate Data
      </button>
    </div>
  );
};
