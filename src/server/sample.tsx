import express from 'express';
import router from './routes/index.ts';
import { generateContent } from './services/aiService.tsx';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function main() {
  const content = await generateContent("Explain how AI works");
  console.log(content);
}

await main();
