
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, RiskLevel, SkillStatus } from "../types";

const API_KEY = process.env.API_KEY || '';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER, description: "Authenticity score from 0-100" },
    riskLevel: { type: Type.STRING, description: "Risk level: Low, Medium, or High" },
    candidateName: { type: Type.STRING, description: "Extracted name of the candidate" },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          confidence: { type: Type.NUMBER, description: "Confidence score 0-100" },
          status: { type: Type.STRING, description: "Genuine, Exaggerated, or Fake" },
          reason: { type: Type.STRING, description: "Brief justification for this assessment" }
        },
        required: ["name", "confidence", "status", "reason"]
      }
    },
    explanation: { type: Type.STRING, description: "A detailed summary of the findings" }
  },
  required: ["score", "riskLevel", "skills", "explanation"]
};

export async function analyzeResume(
  pdfBase64: string,
  linkedinProfile: string
): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are a world-class Technical Auditor and Expert Recruiter. 
    Analyze the provided Resume (PDF) and reference the LinkedIn profile link provided.
    
    1. Extract all technical skills mentioned in the resume.
    2. Assess the authenticity of each skill based on:
       - Logical consistency within the project descriptions.
       - Context of career progression and professional history.
       - Technical depth described (e.g., does the description match real-world complexity?).
       - Presence of common 'buzzword padding' or 'tutorial hell' patterns.
    3. Use the LinkedIn profile URL as a contextual reference to cross-verify professional history and endorsements where possible through logical deduction.
    4. Calculate an overall Authenticity Score (100 is perfectly genuine, < 50 is high risk).
    5. Categorize the Risk Level (Low, Medium, High).
    
    Output must be strictly JSON according to the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: `LinkedIn Profile: ${linkedinProfile}` },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: pdfBase64
              }
            },
            { text: "Please perform the skill authenticity audit now." }
          ]
        }
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error("Failed to analyze resume. Please check your file and try again.");
  }
}
