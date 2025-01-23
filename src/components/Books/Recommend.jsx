// import React, { useState } from "react";

// const Recommend = () => {
//   const [bookTitle, setBookTitle] = useState("");
//   const [recommendations, setRecommendations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (event) => {
//     setBookTitle(event.target.value);
//   };

//   const handleRecommendClick = () => {
//     const url = "http://127.0.0.1:5000/api/recommend"; // Replace with your actual backend URL
//     setIsLoading(true);
//     setError(null); // Clear any previous errors

//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ book_title: bookTitle }),
//     })
//       .then(async (response) => {
//         console.log("Full Response:", response);
//         if (!response.ok) {
//           const text = await response.text();
//           throw new Error(`Error ${response.status}: ${text}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Parsed Data:", data);
//         if (Array.isArray(data)) {
//           setRecommendations(data); // Update with the array directly
//         } else {
//           setError("Unexpected response format from server.");
//           setRecommendations([]);
//         }
//         setIsLoading(false);
//       })
//       .catch((fetchError) => {
//         console.error("Fetch Error:", fetchError);
//         setError(fetchError.message);
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="container mx-auto text-center mt-10 p-4">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Book Recommendation System</h1>

//       {/* Input Bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Enter a book title..."
//           value={bookTitle}
//           onChange={handleChange}
//           className="w-full max-w-lg p-4 text-lg border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//         />
//       </div>

//       {/* Button */}
//       <button
//         onClick={handleRecommendClick}
//         className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
//         disabled={isLoading}
//       >
//         {isLoading ? 'Loading...' : 'Get Recommendations'}
//       </button>

//       {/* Error Handling */}
//       {error && <div className="mt-4 text-red-500">{error}</div>}

//       {/* Recommended Books */}
//       {recommendations.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mt-4">
//           {recommendations.map((book, index) => (
//             <div key={index} className="max-w-sm bg-gray-100 shadow-lg rounded-lg overflow-hidden">
//               <img src={book[2]} alt={book[0]} className=" w-50 h-30 object-cover mx-auto" />
//               <div className="p-4">
//                 <h5 className="text-xl font-semibold text-gray-800">{book[0]}</h5>
//                 <p className="text-gray-500 mt-2">{book[1]}</p>
//                 <a href="#" className="mt-4 inline-block text-blue-500 hover:text-green-700 font-medium">
//                   View
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Recommend;

import React, { useState } from "react";

const Recommend = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [bestMatch, setBestMatch] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleRecommendClick = () => {
    const url = "http://127.0.0.1:5000/api/recommend"; // Replace with your actual backend URL
    setIsLoading(true);
    setError(null); // Clear any previous errors

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_title: bookTitle }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Error ${response.status}: ${text}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.best_match) {
          setBestMatch(data.best_match); // Update best match data
        } else {
          setBestMatch(null);
        }
        if (Array.isArray(data.recommendations)) {
          setRecommendations(data.recommendations); // Update recommendations
        } else {
          setRecommendations([]);
        }
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error("Fetch Error:", fetchError);
        setError(fetchError.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto text-center mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Book Recommendation System</h1>

      {/* Input Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter a book title..."
          value={bookTitle}
          onChange={handleChange}
          className="w-full max-w-lg p-4 text-lg border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleRecommendClick}
        className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get Recommendations'}
      </button>

      {/* Error Handling */}
      {error && <div className="mt-4 text-red-500">{error}</div>}

      {/* Best Match */}
      {bestMatch && (
        <div className="mt-10 mx-auto max-w-3xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Image */}
            <img
              src={bestMatch.image}
              alt={bestMatch.title}
              className="w-full md:w-1/3 h-80 object-cover"
            />
            {/* Book Details */}
            <div className="p-8 w-full md:w-2/3">
              <h2 className="text-3xl font-extrabold mb-4">{bestMatch.title}</h2>
              <p className="text-lg mb-4">
                <span className="font-semibold">Author:</span> {bestMatch.author}
              </p>
              <p className="text-lg mb-4">
                <span className="font-semibold">Similarity Score:</span>{" "}
                <span className="bg-white text-purple-700 font-bold px-2 py-1 rounded-lg">
                  {bestMatch.score}%
                </span>
              </p>
              <p className="mt-6 text-sm text-gray-200">
                This book is the closest match based on your search and our recommendation model.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Books */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Recommended Book</h1>
      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mt-8">
          {recommendations.map((book, index) => (
            <div key={index} className="max-w-sm bg-gray-100 shadow-lg rounded-lg overflow-hidden">
              <img src={book[2]} alt={book[0]} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h5 className="text-xl font-semibold text-gray-800">{book[0]}</h5>
                <p className="text-gray-500 mt-2">{book[1]}</p>
                <a href="#" className="mt-4 inline-block text-blue-500 hover:text-green-700 font-medium">
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>



  );
};

export default Recommend;
