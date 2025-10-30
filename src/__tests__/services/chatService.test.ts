import { ChatService } from '../../features/chat/services/chatService';

describe('ChatService', () => {
  describe('createSession', () => {
    it('should create a new chat session', () => {
      const sessionId = ChatService.createSession('valorant');
      
      expect(typeof sessionId).toBe('string');
      expect(sessionId).toContain('session_');
      
      const session = ChatService.getSessionHistory(sessionId);
      expect(session).toBeDefined();
      expect(session!.gameKey).toBe('valorant');
      expect(session!.messages.length).toBe(1); // Welcome message
      expect(session!.messages[0].type).toBe('ia');
    });
  });

  describe('sendMessage', () => {
    it('should send a message and receive a response', async () => {
      const sessionId = ChatService.createSession('valorant');
      
      const response = await ChatService.sendMessage(
        '¿Cuál es el mejor agente para principiantes?',
        'valorant',
        sessionId
      );

      expect(response.success).toBe(true);
      expect(response.message).toBeDefined();
      expect(response.message.type).toBe('ia');
      expect(typeof response.message.content).toBe('string');
      expect(response.message.game).toBe('valorant');
      expect(response.message.metadata).toBeDefined();
      expect(typeof response.message.metadata!.responseTime).toBe('number');
    });


  });

  describe('getSessionHistory', () => {
    it('should retrieve session history', () => {
      const sessionId = ChatService.createSession('valorant');
      const session = ChatService.getSessionHistory(sessionId);

      expect(session).toBeDefined();
      expect(session!.sessionId).toBe(sessionId);
      expect(session!.gameKey).toBe('valorant');
      expect(session!.createdAt).toBeInstanceOf(Date);
      expect(session!.lastActivity).toBeInstanceOf(Date);
    });

    it('should return null for non-existent session', () => {
      const session = ChatService.getSessionHistory('non-existent-session');
      expect(session).toBeNull();
    });
  });

  describe('clearSession', () => {
    it('should clear a session successfully', () => {
      const sessionId = ChatService.createSession('starcraft2');
      
      const cleared = ChatService.clearSession(sessionId);
      expect(cleared).toBe(true);
      
      const session = ChatService.getSessionHistory(sessionId);
      expect(session).toBeNull();
    });
  });

  describe('getChatStats', () => {
    it('should return chat statistics', () => {
      // Create a few sessions
      ChatService.createSession('valorant');

      ChatService.createSession('valorant');

      const stats = ChatService.getChatStats();

      expect(stats).toBeDefined();
      expect(typeof stats.totalSessions).toBe('number');
      expect(typeof stats.totalMessages).toBe('number');
      expect(typeof stats.activeSessionsToday).toBe('number');
      expect(Array.isArray(stats.popularGames)).toBe(true);
      
      // Check if valorant appears as popular (created twice)
      const valorantStats = stats.popularGames.find(g => g.game === 'valorant');
      expect(valorantStats).toBeDefined();
      expect(valorantStats!.count).toBeGreaterThanOrEqual(2);
    });
  });

  describe('searchChatHistory', () => {


    it('should filter by game when specified', async () => {
      const valorantSession = ChatService.createSession('valorant');
      const starcraft2Session = ChatService.createSession('starcraft2');

      await ChatService.sendMessage('estrategia', 'valorant', valorantSession);
      await ChatService.sendMessage('estrategia', 'starcraft2', starcraft2Session);

      const valorantResults = ChatService.searchChatHistory('estrategia', 'valorant');
      const allResults = ChatService.searchChatHistory('estrategia');

      expect(valorantResults.length).toBeGreaterThan(0);
      expect(allResults.length).toBeGreaterThanOrEqual(valorantResults.length);
      
      // All valorant results should be from valorant
      valorantResults.forEach(result => {
        expect(result.game).toBe('valorant');
      });
    });
  });

  describe('contextual responses', () => {
    it('should provide game-specific responses', async () => {
      const valorantSession = ChatService.createSession('valorant');
      
      const metaResponse = await ChatService.sendMessage(
        'cuál es el meta actual',
        'valorant',
        valorantSession
      );

      expect(metaResponse.success).toBe(true);
      expect(typeof metaResponse.message.content).toBe('string');
      
      // Should contain Valorant-specific terms
      const content = metaResponse.message.content as string;
      const hasValorantTerms = /valorant|agente|jett|reyna|viper|sova/i.test(content);
      expect(hasValorantTerms).toBe(true);
    });


  });
});