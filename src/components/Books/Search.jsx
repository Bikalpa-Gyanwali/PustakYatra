// import React, { useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { SearchRoute } from '../../ApiRoute';
// import { useNavigate} from 'react-router-dom';

// const SearchContainer = styled.div`
//     position: relative;
//     width: 300px;
// `;

// const SearchInput = styled.input`
//     width: 100%;
//     padding: 8px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// `;

// const Dropdown = styled.div`
//     position: absolute;
//     top: 100%;
//     width: 100%;
//     max-height: 200px;
//     border: 1px solid #ccc;
//     background-color: white;
//     overflow-y: auto;
//     z-index: 10;
// `;

// const DropdownItem = styled.div`
//     padding: 8px;
//     cursor: pointer;
//     &:hover {
//         background-color: #f1f1f1;
//     }
// `;

// const SearchBar = () => {
//     const navigate = useNavigate();
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);

//     const handleInputChange = async (e) => {
//         const value = e.target.value;
//         setQuery(value);

//         if (value.length > 2) { // Start searching after 3 characters
//             try {
//                 const response = await axios.get(`${SearchRoute}?query=${encodeURIComponent(value)}&limit=10`);

//                 setResults(response.data);
//                 setShowDropdown(true);
//             } catch (error) {
//                 console.error("Error fetching search results:", error);
//             }
//         } else {
//             setShowDropdown(false);
//         }
//     };

//     const handleResultClick = (bookId) => {
//         if (!bookId) {
//           console.error('bookId is not defined');
//           return;
//         }
//         navigate(`/books/${bookId}`);
//       };

//     return (
//         <SearchContainer>
//             <SearchInput
//                 type="text"
//                 value={query}
//                 onChange={handleInputChange}
//                 placeholder="Search books..."
//             />
//             {showDropdown && (
//                 <Dropdown>
//                     {results.map((book) => (
//                         <DropdownItem key={book._id} onClick={() => handleResultClick(book._id)}>
//                             {book.Title}
//                         </DropdownItem>
//                     ))}
//                 </Dropdown>
//             )}
//         </SearchContainer>
//     );
// };

// export default SearchBar;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { SearchRoute } from '../../ApiRoute';


const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) { // Start searching after 3 characters
            try {
                const response = await axios.get(`${SearchRoute}?query=${encodeURIComponent(value)}&limit=10`);
                console.log('Search Response:', response.data); // Log the response

                if (response.data && Array.isArray(response.data)) {
                    setResults(response.data);
                    setShowDropdown(true);
                } else {
                    console.error('Unexpected response format:', response.data);
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
            console.error('bookId is not defined');
            return;
        }
        navigate(`/books/${bookId}`);
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search books..."
            />
            {showDropdown && results.length > 0 && (
                <Dropdown>
                    {results.map((book) => (
                        <DropdownItem key={book._id} onClick={() => handleResultClick(book._id)}>
                            {book.Title} {/* Displaying Title */}
                        </DropdownItem>
                    ))}
                </Dropdown>
            )}
        </SearchContainer>
    );
};

export default SearchBar;


// Styled-components for UI (replace with your CSS as needed)
const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
  
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px;
    background-color: #e0e0e0; 
    border: 1px solid #ccc; 

`;

const Dropdown = styled.div`
    position: absolute;
    width: 100%;
    background: #f7f3f3;
    border: 1px solid #030000;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
`;

const DropdownItem = styled.div`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;
