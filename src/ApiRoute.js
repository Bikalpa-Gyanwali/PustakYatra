export const host = "http://localhost:5000";

// Book-related routes
export const AllBooksRoute = `${host}/api/books`;
export const BookIdInfo = `${host}/api/books`; // Remove `:id` to allow dynamic handling
export const SearchRoute = `${host}/api/searchbooks`;
export const topBooksRoute = `${host}/api/topbooks`;
export const RecommendRoute = `${host}/api/recommend`;

// Community-related routes
export const CommunityRoute = `${host}/api/community`; // To fetch all community posts
export const AddPostRoute = `${host}/api/community`; // Same route for adding posts

// Favorites-related routes
export const AddFavoriteRoute = `${host}/api/favorites/add`;
export const GetFavoritesRoute = `${host}/api/favorites`;
export const RemoveFavoriteRoute = `${host}/api/favorites`; // Will append ISBN in the actual request


// Wishlist-related routes
export const AddWishlistRoute = `${host}/api/wishlist/add`;
export const GetWishlistRoute = `${host}/api/wishlist`;
export const RemoveWishlistRoute = `${host}/api/wishlist`; // Will append title in the actual request