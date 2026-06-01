/**
 * Gemini Client - Google Gemini API integration
 * Handles only API calls, no business logic
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

import type { SystemPromptConfig } from '../types';
import config from '../config/config';
import { GeminiApiError } from '../utils/errors';

const client = new GoogleGenerativeAI(config.apiKey);
const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Send message to Gemini API and get response
 */
export const sendMessageToGemini = async (
  userMessage: string,
  systemPrompt: string,
): Promise<string> => {
  try {
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I will follow these instructions.' }],
        },
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    if (!text || text.length === 0) {
      throw new Error('Empty response from Gemini API');
    }

    return text;
  } catch (error) {
    if (error instanceof Error) {
      throw new GeminiApiError(
        `Gemini API error: ${error.message}`,
        { originalError: error.message },
      );
    }

    throw new GeminiApiError('Unknown error calling Gemini API');
  }
};

/**
 * Test Gemini API connection
 */
export const testGeminiConnection = async (): Promise<boolean> => {
  try {
    const result = await model.generateContent('Hello');
    return Boolean(result);
  } catch (error) {
    return false;
  }
};
