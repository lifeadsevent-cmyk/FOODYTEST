
import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

export const getGeminiRecommendation = async (userPrompt: string) => {
  // Always use the named parameter for apiKey and use process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const menuContext = JSON.stringify(MENU_ITEMS.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category,
    tags: item.tags,
    isVegetarian: item.isVegetarian,
    isGlutenFree: item.isGlutenFree
  })));

  const systemInstruction = `
    Tu es un sommelier et maître d'hôtel expert pour le restaurant "Gourmet Direct".
    Utilise le menu suivant pour faire des recommandations précises basées sur les envies ou restrictions de l'utilisateur.
    Menu: ${menuContext}
    
    Réponds de manière chaleureuse, élégante et concise en français.
    Si l'utilisateur a des allergies ou préférences (végan, sans gluten, etc.), sois très vigilant.
    Suggère toujours un accord mets-boisson si c'est pertinent.
  `;

  try {
    // Calling generateContent with the appropriate model for basic text tasks
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Accessing .text as a property, not a method
    return response.text || "Désolé, je n'ai pas pu générer de recommandation pour le moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec mon intelligence culinaire.";
  }
};
