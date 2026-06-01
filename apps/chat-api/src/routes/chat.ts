/**
 * Chat Route - POST /api/chat/message
 * Orchestrates validators, services, and error handling
 */

import type { FastifyInstance } from 'fastify';

import type { ChatRequest, ChatResponse } from '../types';
import { validateChatRequest } from '../utils/validators';
import { createSuccessResponse, createErrorResponse as transformCreateErrorResponse } from '../utils/transformers';
import { isChatApiError, toChatApiError, ValidationError } from '../utils/errors';
import { rateLimitMiddleware } from '../middleware/rate-limit';
import { sendMessageToGemini } from '../services/gemini-client';
import { createSystemPromptConfig, getSystemPrompt } from '../services/system-prompt';

export const chatRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: ChatRequest; Reply: ChatResponse }>('/api/chat/message', async (
    request,
    reply,
  ) => {
    try {
      // Check rate limits
      await rateLimitMiddleware(request, reply);

      // Validate request
      const validation = validateChatRequest(request.body);
      if (!validation.valid) {
        throw new ValidationError(validation.error || 'Invalid request');
      }

      const { message, sessionId, locale } = request.body;
      const userLocale = locale || 'en';

      // Get system prompt
      const systemPrompt = getSystemPrompt(userLocale);

      // Send to Gemini
      const geminResponse = await sendMessageToGemini(message, systemPrompt);

      // Create response
      const response = createSuccessResponse(geminResponse, sessionId);

      reply.code(200).send(response);
    } catch (error) {
      const chatError = toChatApiError(error);

      if (isChatApiError(error)) {
        reply.code(chatError.status);
      } else {
        reply.code(500);
      }

      const errorResponse = transformCreateErrorResponse(
        chatError.code,
        chatError.message,
      );

      reply.send(errorResponse);
    }
  });

  // Health check endpoint
  fastify.get('/health', async (request, reply) => {
    reply.code(200).send({ status: 'ok' });
  });
};
