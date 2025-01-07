import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { SearchRoute } from "../../ApiRoute";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${SearchRoute}?query=${encodeURIComponent(value)}&limit=10`
        );
        console.log("Search Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setResults(response.data);
          setShowDropdown(true);
        } else {
          console.error("Unexpected response format:", response.data);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setShowDropdown(false);
      }
    } else {
      setShowDropdown(false);
    }
  };

  const handleResultClick = (bookId) => {
    if (!bookId) {
      console.error("bookId is not defined");
      return;
    }
    navigate(`/books/${bookId}`);
  };

  return (
    <SearchContainer>
      <SearchWrapper isFocused={isFocused}>
        <FaSearchIcon />
        <SearchInput
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search books..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </SearchWrapper>
      {showDropdown && results.length > 0 && (
        <Dropdown>
          {results.map((book) => (
            <DropdownItem
              key={book._id}
              onClick={() => handleResultClick(book._id)}
            >
              {book.Title}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SearchContainer>
  );
};

export default SearchBar;

// Styled-components for UI
const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isFocused ? "#ffffff" : "#f5f5f5")};
  border: 2px solid ${(props) => (props.isFocused ? "#1182c5" : "#ccc")};
  border-radius: 25px;
  padding: 5px 10px;
  width: ${(props) => (props.isFocused ? "500px" : "400px")};
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  padding: 8px 10px;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: #999;
  }
`;

const FaSearchIcon = styled(FaSearch)`
  color: #666;
  font-size: 1.2rem;
  margin-right: 8px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #1182c5;
  }
`;
