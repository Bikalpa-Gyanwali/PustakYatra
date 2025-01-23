const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");

const User = require('./models/User.js');
const jwt = require('jsonwebtoken'); // Add JWT for token-based auth
const BookRoute = require('./routes/BookRoute.js');
const topBooks = require('./routes/BookRoute.js')
const BookIdInfo = require("./routes/BookRoute.js");
const community = require('./routes/community.js');
const favoritesRoutes = require("./routes/favorites.js");
const wishlistRoutes = require("./routes/wishlist.js");


dotenv.config(); // Load environment variables

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"], // Added DELETE
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/books", BookRoute);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use('/api', topBooks)
app.use('/api', community);



// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Register route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, category } = req.body;

        // Check if user with email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            const errorMsg = existingUser.email === email
                ? 'Email already exists'
                : 'Username already exists';
            return res.status(400).json({ message: errorMsg });
        }

        // Validate category
        if (!category) {
            return res.status(400).json({ message: 'Category is required' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            category // Save the category
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
});


// Login route
app.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" }); // username not found
        }

        // 2. Check if password matches using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" }); // password incorrect
        }

        // 3. Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // 4. Return successful response with user data and token
        res.status(200).json({ message: "Login successful", username: user.username, token });
    } catch (error) {
        console.error("Error in login: ", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});