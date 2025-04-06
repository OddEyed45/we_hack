import { GoogleGenAI } from "@google/genai";

console.log("Google Application Credentials:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

async function generateContent(contents) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });
    console.log("API Response:", response);
    return response.text;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to generate content");
  }
}

export { generateContent };