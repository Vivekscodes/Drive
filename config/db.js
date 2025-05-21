```javascript
const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/drive';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch(error => console.error("MongoDB connection error:", error));
```