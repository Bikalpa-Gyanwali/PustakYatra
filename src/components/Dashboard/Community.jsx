import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AddPostRoute, CommunityRoute, SearchRoute } from "../../ApiRoute";
import "./Community.css";

const Community = () => {
  const username = localStorage.getItem("username"); // Ensure username is saved
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [bookName, setBookName] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(CommunityRoute);
      setPosts(response.data); // Update state with fetched posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  // Add a new post
  const handleAddPost = async () => {
    if (newPost.trim() && bookName.trim()) {
      if (!username) {
        console.error("Username is not defined");
        return;
      }

      try {
        const newPostData = {
          author: username,
          bookName,
          content: newPost,
        };

        const response = await axios.post(AddPostRoute, newPostData);
        setNewPost(""); // Clear the input fields
        setBookName("");
        fetchPosts(); // Refresh the list of posts after adding a new one
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  // Handle input changes for the search bar
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${SearchRoute}?query=${encodeURIComponent(value)}&limit=10`
        );
        setResults(response.data || []);
        setShowDropdown(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
        setShowDropdown(false);
      }
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleResultClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="community-page p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="welcome-section mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to the Community</h1>
          <p className="text-lg text-gray-600">
            Connect with fellow book enthusiasts, discuss your favorite reads, and discover new recommendations!
          </p>
        </div>

        {/* Book Search Bar */}
        <div className="search-bar mb-6">
          <div className="relative w-1/2">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search a Book"
              value={query}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-12 rounded-lg shadow-md border border-gray-300 focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 cursor-pointer" />
            {showDropdown && (
              <div className="absolute z-10 top-full left-0 w-full bg-white border rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto">
                {results.map((book) => (
                  <div
                    key={book._id}
                    onClick={() => handleResultClick(book._id)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {book.Title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create a Post */}
        <div className="create-post mb-6">
          <input
            type="text"
            className="w-full p-4 mb-4 rounded-lg border border-gray-300"
            placeholder="Enter Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <textarea
            className="w-full p-4 rounded-lg border border-gray-300"
            placeholder="Start a discussion..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button
            className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleAddPost}
          >
            Post
          </button>
        </div>

        {/* Discussions */}
        <div className="discussion-board">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Discussions</h2>
          {posts.map((post) => (
            <div
              key={post._id}
              className="post-card bg-white p-6 rounded-lg shadow-md mb-6"
            >
              <h3 className="font-bold text-lg text-gray-700">{post.author}</h3>
              <p className="text-sm text-gray-500 mb-2">Book: {post.bookName}</p>
              <p className="text-gray-600">{post.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                Posted on: {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
