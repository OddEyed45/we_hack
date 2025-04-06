import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js'; // Added .js extension for ES modules
import { generateContent } from './services/aiService.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function main() {
  try {
    const content = await generateContent("Explain how AI works");
    console.log(content);
  } catch (error) {
    console.error('Error generating content:', error);
  }
}

main(); // Removed `await` since `main` is not being called inside an async function