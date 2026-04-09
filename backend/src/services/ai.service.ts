import { GoogleGenAI } from '@google/genai';
import { ApiError } from '../middleware/error';

// Initialize the Google Generative AI client using the user's key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class AIService {
  
  /**
   * Generates a fully structured ATS-ready Resume JSON from raw user profile data.
   */
  static async generateResumeJson(profileData: any) {
    if (!process.env.GEMINI_API_KEY) {
      throw new ApiError(500, "GEMINI_API_KEY environment variable is not set.");
    }

    const prompt = `You are an expert technical recruiter and ATS specialist.
Given the following user profile, generate a highly optimized resume in JSON format.
Make sure the action verbs are strong.

User Profile:
${JSON.stringify(profileData, null, 2)}

Return ONLY valid JSON following this schema:
{
  "name": "Full Name",
  "headline": "Target Role",
  "summary": "Professional Summary",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [{ "company": "", "title": "", "period": "", "description": "" }]
}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2, // Low temperature for factual consistency
        }
      });
      
      const content = response.text;
      return JSON.parse(content ?? '{}');
    } catch (error: any) {
      console.error("Gemini Error:", error);
      throw new ApiError(500, "Failed to generate AI Resume");
    }
  }

  /**
   * Semantically scores a job description against a user profile (0-100%).
   */
  static async scoreJobMatch(jobDescription: string, userProfileInfo: string): Promise<number> {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("No GEMINI_API_KEY found, falling back to basic matching.");
      return this.fallbackKeywordMatch(jobDescription, userProfileInfo);
    }

    const prompt = `You are a strict ATS job matching engine.
Evaluate how well the applicant fits the job purely based on the provided skills and experience.
Return ONLY a single integer from 0 to 100 representing the compatibility match score percentage. Do not include any text or symbols like '%'.

Applicant Profile:
${userProfileInfo}

Job Details:
${jobDescription}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'text/plain',
          temperature: 0.1,
        }
      });
      
      const score = parseInt(response.text?.trim() || '0', 10);
      return isNaN(score) ? 50 : score;
    } catch (error) {
      console.error("Gemini Match Error:", error);
      return this.fallbackKeywordMatch(jobDescription, userProfileInfo);
    }
  }

  /**
   * Simple String intersection fallback if AI is unavailable.
   */
  private static fallbackKeywordMatch(text1: string, text2: string): number {
    const set1 = new Set(text1.toLowerCase().split(/[\\s,.-]+/));
    const set2 = new Set(text2.toLowerCase().split(/[\\s,.-]+/));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    
    // Very naive scoring
    const score = Math.min(Math.floor((intersection.size / 10) * 100), 100);
    return score;
  }
}
