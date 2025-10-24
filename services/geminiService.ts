
import { GoogleGenAI, Modality } from "@google/genai";
import { ImageFile } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (imageFile: ImageFile) => {
  return {
    inlineData: {
      data: imageFile.base64,
      mimeType: imageFile.mimeType,
    },
  };
};

export const runVirtualTryOn = async (
  personImage: ImageFile,
  clothingImage: ImageFile
): Promise<string> => {
  const model = 'gemini-2.5-flash-image';
  
  const prompt = "From the two images provided, take the clothing from the second image and realistically place it on the person in the first image. Ensure the clothing fits naturally. Maintain the original background and the person's pose. The final output should be just the resulting image.";

  const imageParts = [
    fileToGenerativePart(personImage),
    fileToGenerativePart(clothingImage),
  ];

  try {
    const result = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          ...imageParts,
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of result.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image was generated in the response.");
  } catch (error) {
    console.error("Error during virtual try-on:", error);
    throw new Error("Failed to generate the virtual try-on image. Please try again.");
  }
};
