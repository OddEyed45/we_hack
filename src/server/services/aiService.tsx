import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

export async function generateContent(contents: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });
    return response.text;
  } catch (error) {
    throw new Error('Failed to generate content');
  }
}