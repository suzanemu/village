import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuotationData = async (promptText: string): Promise<any> => {
  const model = "gemini-2.5-flash";
  
  const response = await ai.models.generateContent({
    model: model,
    contents: `Generate a realistic construction or service quotation based on this request: "${promptText}". 
    Return realistic quantities and market rates (in BDT or generic currency). 
    If VAT or Tax is mentioned, include the rates.
    Keep descriptions professional.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          toName: { type: Type.STRING },
          toCompany: { type: Type.STRING },
          toAddress: { type: Type.STRING },
          subject: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING },
                unit: { type: Type.STRING, description: "e.g. M3, Sqft, L/S, Pcs" },
                quantity: { type: Type.NUMBER },
                unitCost: { type: Type.NUMBER },
              }
            }
          },
          vatRate: { type: Type.NUMBER, description: "Percentage for VAT if mentioned (e.g. 15 for 15%)" },
          taxRate: { type: Type.NUMBER, description: "Percentage for Tax/AIT if mentioned" },
          notes: { type: Type.STRING, description: "A list of conditions numbered 1, 2, 3..." }
        }
      }
    }
  });

  return JSON.parse(response.text || "{}");
};