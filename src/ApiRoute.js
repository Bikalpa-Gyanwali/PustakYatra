export const host = "http://localhost:5000";

// Book-related routes
export const AllBooksRoute = `${host}/api/books`;
export const BookIdInfo = `${host}/api/books/:id`;
export const SearchRoute = `${host}/api/searchbooks`;
export const topBooksRoute = `${host}/api/topbooks`;
export const RecommendRoute = `${host}/api/recommend`;

// Community-related routes
export const CommunityRoute = `${host}/api/community`; // To fetch all community posts
export const AddPostRoute = `${host}/api/community`;
