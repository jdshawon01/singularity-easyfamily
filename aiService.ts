import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export class AIService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
  }

  async chat(message: string, context?: string): Promise<string> {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY' || this.apiKey === 'API_KEY_ADDED') {
      return 'Please configure your Singularity ∞ AI API key in the environment variables.';
    }

    try {
      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            {
              role: 'system',
              content: `You are Singularity ∞ AI, an intelligent family assistant integrated into the Singularity ∞ Family management app. You are a world-class expert in family management, finance, health, and productivity. Your goal is to provide actionable, insightful, and helpful responses.
              - ALWAYS use Markdown for formatting your responses. Use headings (###, ####), bold, italics, lists, and links to make the information clear and readable.
              - When providing financial advice, be practical and empathetic.
              - When suggesting recipes, list ingredients and provide step-by-step instructions.
              - When giving health tips, be encouraging and supportive.
              - You can generate code snippets if asked, for example, for a budget calculation in Python.
              - You can render mathematical formulas using LaTeX syntax if needed.
              - At the end of your main response, if appropriate, add a section like this:
              SUGGESTIONS:
              - A relevant next question
              - Another related action
              - A third suggestion
              - Current Date: ${new Date().toDateString()}.
              ${context ? `\n\nHere is the current context from the app section the user is in:\n${context}` : ''}`
            },
            {
              role: 'user',
              content: message
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Singularity Infinity Family',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('AI Service Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('AI Error Response:', error.response.data);
        if (error.response.status === 429) {
          return "It looks like the AI is receiving too many requests right now from the free service. Please wait a moment and try again. For more consistent access, consider adding your own personal OpenRouter API key.";
        }
        return `Sorry, I encountered an error: ${error.response.data?.error?.message || 'Unknown API error.'}`;
      }
      return 'Sorry, I am currently unavailable. Please try again later.';
    }
  }
}

export const aiService = new AIService();
