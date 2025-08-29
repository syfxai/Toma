
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the recipe."
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the dish."
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "An ingredient from the list."
      },
      description: "List of ingredients required for the recipe, including quantities."
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A single step in the instructions."
      },
      description: "Step-by-step instructions to prepare the dish."
    },
    servings: {
        type: Type.STRING,
        description: "How many people this recipe serves."
    },
    prepTime: {
        type: Type.STRING,
        description: "Estimated preparation and cook time for the recipe."
    }
  },
  required: ["recipeName", "description", "ingredients", "instructions", "servings", "prepTime"]
};

export const generateRecipe = async (ingredients: string): Promise<Recipe> => {
  if (!ingredients.trim()) {
    throw new Error("Please enter at least one ingredient.");
  }

  const prompt = `Generate a single, creative and delicious recipe primarily using the following ingredients: ${ingredients}. You can add a few common pantry staples if necessary (like oil, salt, pepper, water). The recipe should be well-balanced. If the provided ingredients are insufficient for a coherent recipe, create a recipe that uses most of them and suggest 1-2 additional ingredients in the description.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    // Basic validation to ensure the response matches the expected structure
    if (
      !recipeData.recipeName || 
      !Array.isArray(recipeData.ingredients) || 
      !Array.isArray(recipeData.instructions)
    ) {
      throw new Error("Received an invalid recipe format from the API.");
    }

    return recipeData as Recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    // Provide a more user-friendly error message
    if (error instanceof Error && error.message.includes('json')) {
         throw new Error("Failed to get a valid recipe from the AI. Please try rephrasing your ingredients.");
    }
    throw new Error("An unexpected error occurred while generating the recipe. Please try again later.");
  }
};
