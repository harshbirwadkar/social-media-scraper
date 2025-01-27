import React, { useState } from 'react';

function Home() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('instagram'); // default to Instagram
  const [loading, setLoading] = useState(false); // to manage loading state
  const [error, setError] = useState(null); // to manage error state
  const [data, setData] = useState(null); // to store API response

  const handleScrape = async () => {
    if (!url) {
      alert('Please enter a valid URL!');
      return;
    }

    setLoading(true);
    setError(null); // reset any previous errors

    const endpoint = platform === 'instagram'
      ? 'http://localhost:5000/api/instagram/scrape'
      : 'http://localhost:5000/api/youtube/scrape';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), // Send the URL to the backend
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result); // Set the response data if the request was successful
    } catch (error) {
      setError(error.message); // Set error message in case of failure
    } finally {
      setLoading(false); // Stop loading spinner when request is finished
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Social Media Scraper</h1>

        <div className="mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-4 rounded-lg bg-transparent border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg placeholder-gray-500"
            placeholder="Enter Instagram or YouTube URL"
          />
        </div>

        <div className="flex justify-center mb-4 space-x-4">
          <button
            onClick={() => setPlatform('instagram')}
            className={`w-1/2 py-3 rounded-lg transition-all duration-300 ${
              platform === 'instagram' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-teal-600`}
          >
            Instagram
          </button>
          <button
            onClick={() => setPlatform('youtube')}
            className={`w-1/2 py-3 rounded-lg transition-all duration-300 ${
              platform === 'youtube' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-red-600`}
          >
            YouTube
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleScrape}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white text-lg font-semibold hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-600 transition-all duration-300"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Scraping...' : `Scrape ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
          </button>
        </div>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>} {/* Display error message */}

        {data && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Scraped Data:</h2>
            <div className="mt-2 bg-gray-100 p-4 rounded-lg overflow-auto max-h-64">
              {/* Added overflow-auto to handle long data */}
              <pre className="text-gray-700 text-sm">{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
