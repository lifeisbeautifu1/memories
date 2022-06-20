import express from 'express'
import 'express-async-errors';
import 'dotenv/config';
import connectDB from './db/connectDB.js'
import posts from './routes/posts.js'
import users from './routes/users.js';
import auth from './middleware/auth.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

const PORT = process.env.PORT || 5000;

app.use('/posts', auth, posts);
app.use('/users', users);
app.use(errorHandler);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}



start();