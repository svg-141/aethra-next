import { ChatMessage } from '../types/chat.types';

export interface ChatResponse {
  message: ChatMessage;
  success: boolean;
  error?: string;
}

export interface ChatHistory {
  messages: ChatMessage[];
  gameKey: string;
  sessionId: string;
  createdAt: Date;
  lastActivity: Date;
  userId?: string;
}

// Simulación de base de datos de conversaciones
const chatSessions: Map<string, ChatHistory> = new Map();
let messageIdCounter = 1;

export class ChatService {
  // Crear nueva sesión de chat
  static createSession(gameKey: string, userId?: string): string {
    // Verificar autenticación
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const initialMessage: ChatMessage = {
      id: (messageIdCounter++).toString(),
      type: 'ia',
      content: this.getWelcomeMessage(gameKey),
      timestamp: new Date(),
      game: gameKey,
      metadata: {
        model: 'Aethra-Gaming-v1',
        responseTime: 0,
        tokens: 0,
      }
    };

    const session: ChatHistory = {
      messages: [initialMessage],
      gameKey,
      sessionId,
      createdAt: new Date(),
      lastActivity: new Date(),
      userId,
    };

    chatSessions.set(sessionId, session);
    return sessionId;
  }

  // Obtener sesión existente o crear nueva
  static getOrCreateSession(gameKey: string, sessionId?: string, userId?: string): ChatHistory {
    // Verificar autenticación
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    if (sessionId && chatSessions.has(sessionId)) {
      const session = chatSessions.get(sessionId)!;
      
      // Verificar que la sesión pertenezca al usuario actual
      if (session.userId !== userId) {
        throw new Error('No tienes permisos para acceder a esta sesión');
      }
      
      session.lastActivity = new Date();
      return session;
    }

    const newSessionId = this.createSession(gameKey, userId);
    return chatSessions.get(newSessionId)!;
  }

  // Enviar mensaje al chatbot
  static async sendMessage(
    message: string, 
    gameKey: string, 
    sessionId?: string,
    userId?: string
  ): Promise<ChatResponse> {
    // Verificar autenticación
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    try {
      const session = this.getOrCreateSession(gameKey, sessionId, userId);
      
      // Crear mensaje del usuario
      const userMessage: ChatMessage = {
        id: (messageIdCounter++).toString(),
        type: 'user',
        content: message,
        timestamp: new Date(),
        game: gameKey,
      };

      // Añadir mensaje del usuario a la sesión
      session.messages.push(userMessage);
      session.lastActivity = new Date();

      // Simular tiempo de respuesta
      await this.delay(800 + Math.random() * 1200);

      // Generar respuesta de IA
      const aiResponse = this.generateGameResponse(message, gameKey, session.messages);
      
      const aiMessage: ChatMessage = {
        id: (messageIdCounter++).toString(),
        type: 'ia',
        content: aiResponse.content,
        timestamp: new Date(),
        game: gameKey,
        metadata: {
          model: 'Aethra-Gaming-v1',
          responseTime: aiResponse.responseTime,
          tokens: aiResponse.tokens,
        }
      };

      // Añadir respuesta de IA a la sesión
      session.messages.push(aiMessage);
      session.lastActivity = new Date();

      return {
        message: aiMessage,
        success: true,
      };

    } catch {
      return {
        message: {
          id: (messageIdCounter++).toString(),
          type: 'ia',
          content: 'Lo siento, ocurrió un error procesando tu mensaje. Por favor intenta de nuevo.',
          timestamp: new Date(),
          game: gameKey,
        },
        success: false,
        error: 'Error interno del servidor',
      };
    }
  }

  // Obtener historial de chat
  static getSessionHistory(sessionId: string, userId?: string): ChatHistory | null {
    // Verificar autenticación
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    
    const session = chatSessions.get(sessionId);
    
    // Verificar que la sesión pertenezca al usuario actual
    if (session && session.userId !== userId) {
      throw new Error('No tienes permisos para acceder a esta sesión');
    }
    return session || null;
  }

  // Limpiar sesión de chat
  static clearSession(sessionId: string, userId?: string): boolean {
    // Verificar autenticación
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    
    const session = chatSessions.get(sessionId);
    
    // Verificar que la sesión pertenezca al usuario actual
    if (session && session.userId !== userId) {
      throw new Error('No tienes permisos para eliminar esta sesión');
    }
    return chatSessions.delete(sessionId);
  }

  // Obtener estadísticas de uso
  static getChatStats(): {
    totalSessions: number;
    totalMessages: number;
    activeSessionsToday: number;
    popularGames: { game: string; count: number }[];
  } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sessions = Array.from(chatSessions.values());
    const activeSessionsToday = sessions.filter(session => 
      session.lastActivity >= today
    ).length;

    const totalMessages = sessions.reduce((sum, session) => 
      sum + session.messages.length, 0
    );

    // Contar juegos populares
    const gameCounts = new Map<string, number>();
    sessions.forEach(session => {
      const current = gameCounts.get(session.gameKey) || 0;
      gameCounts.set(session.gameKey, current + 1);
    });

    const popularGames = Array.from(gameCounts.entries())
      .map(([game, count]) => ({ game, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalSessions: sessions.length,
      totalMessages,
      activeSessionsToday,
      popularGames,
    };
  }

  // Buscar en el historial de chat
  static searchChatHistory(
    query: string, 
    gameKey?: string, 
    limit: number = 20,
    userId?: string
  ): ChatMessage[] {
    // Verificar autenticación
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    const results: ChatMessage[] = [];
    
    for (const session of chatSessions.values()) {
      // Solo buscar en sesiones del usuario actual
      if (session.userId !== userId) continue;
      if (gameKey && session.gameKey !== gameKey) continue;
      
      for (const message of session.messages) {
        if (typeof message.content === 'string' && 
            message.content.toLowerCase().includes(query.toLowerCase())) {
          results.push(message);
        }
      }
    }

    return results
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Generar mensaje de bienvenida personalizado
  private static getWelcomeMessage(gameKey: string): string {
    const welcomeMessages = {
      valorant: '¡Hola! Soy Aethra, tu asistente estratégico para Valorant. Puedo ayudarte con composiciones de equipo, estrategias de mapas, análisis de agentes y el meta actual. ¿En qué puedo ayudarte?',
      starcraft2: '¡Hola! Soy Aethra, tu analista para StarCraft 2. Puedo ayudarte con build orders, timings, micro/macro, análisis de replays y estrategias por raza. ¿Qué quieres dominar?',
    };

    return welcomeMessages[gameKey as keyof typeof welcomeMessages] || 
           '¡Hola! Soy Aethra, tu asistente de gaming. ¿En qué puedo ayudarte hoy?';
  }

  // Generar respuesta contextual avanzada
  private static generateGameResponse(
    userMessage: string, 
    gameKey: string, 
    chatHistory: ChatMessage[]
  ): { content: string; responseTime: number; tokens: number } {
    const responseTime = 800 + Math.random() * 800;
    const contextualResponse = this.getContextualResponse(userMessage, gameKey, chatHistory);
    
    return {
      content: contextualResponse,
      responseTime: Math.round(responseTime),
      tokens: Math.floor(contextualResponse.length / 4),
    };
  }

  // Generar respuesta contextual basada en el historial
  private static getContextualResponse(
    message: string, 
    gameKey: string, 
    history: ChatMessage[]
  ): string {
    const messageLower = message.toLowerCase();
    
    // Análisis de contexto previo
    const recentMessages = history.slice(-6);
    const hasDiscussedBefore = (topic: string) => 
      recentMessages.some(msg => 
        typeof msg.content === 'string' && 
        msg.content.toLowerCase().includes(topic)
      );

    // Respuestas contextuales por juego
    if (gameKey === 'valorant') {
      return this.getValorantResponse(messageLower, hasDiscussedBefore);
    } else if (gameKey === 'starcraft2') {
      return this.getStarCraft2Response(messageLower, hasDiscussedBefore);
    }

    return this.getGenericResponse(messageLower);
  }

  // Respuestas específicas para Valorant
  private static getValorantResponse(message: string, hasDiscussedBefore: (topic: string) => boolean): string {
    if (/\b(meta|parche|patch)\b/i.test(message)) {
      return hasDiscussedBefore('meta') 
        ? 'Como mencionamos antes, el meta actual sigue favoreciendo composiciones balanceadas. ¿Hay algún aspecto específico del meta que te gustaría profundizar?'
        : 'El meta actual de Valorant favorece composiciones equilibradas con un duelista, un controlador, un iniciador y un centinela. Jett y Reyna dominan como duelistas, mientras que Viper y Omen son controladores muy efectivos.';
    }
    
    if (/\b(composici[óo]n|team|equipo)\b/i.test(message)) {
      return 'Para ranked, recomiendo esta composición balanceada: Jett (duelista), Viper (controlador), Sova (iniciador), Sage (centinela), y un flex pick como Reyna o Phoenix. Esta comp funciona bien en la mayoría de mapas.';
    }
    
    if (/\b(reyna|counter|counters)\b/i.test(message)) {
      return 'Para counterar a Reyna: usa agentes como Cypher para limitar sus escapes, Sova para revelarla con darts, o Breach para stunearla. Mantén distancia y evita duelos 1v1 directos cuando tenga orbes.';
    }
    
    if (/\b(ascent|mapa|maps)\b/i.test(message)) {
      return 'En Ascent, el control de Mid es crucial. Usa Sova para recon, Viper para dividir sitios con su wall, y mantén un jugador en Mid. Para atacar A, coordina smokes y flashes. Para B, usa util para limpiar close angles.';
    }
    
    return '¡Excelente pregunta sobre Valorant! El juego se basa en trabajo en equipo y uso inteligente de habilidades. ¿Te interesa algún aspecto específico como agentes, mapas, o estrategias?';
  }

  // Respuestas específicas para StarCraft 2
  private static getStarCraft2Response(message: string, hasDiscussedBefore: (topic: string) => boolean): string {
    if (/\b(build|terran|zerg|protoss)\b/i.test(message)) {
      return 'Builds sólidos por raza: Terran - 3-1-1 o Marine/Tank; Protoss - Robo opening o Blink Stalkers; Zerg - Ling/Bane/Hydra o Roach/Ravager. Practice build orders hasta que sean muscle memory.';
    }
    
    if (/\b(micro|macro)\b/i.test(message)) {
      return 'Balance micro/macro: early game focus 70% macro, late game 50/50. Practice multi-tasking: produce workers mientras haces micro, expand cuando tengas army advantage, y nunca stop worker production.';
    }
    
    if (/\b(timing|expansi[óo]n|expand)\b/i.test(message)) {
      return 'Timings críticos: natural expansion 3-5min mark, third base 8-12min, tech switches cuando detectes enemy composition. Scout constantly y adapta tu timing based en enemy actions.';
    }
    
    if (/\b(rush|defensa|cheese)\b/i.test(message)) {
      return 'Defendiendo rush: scout early (9-14 workers), build defensive units ASAP, use workers para fight si necesario, y wall off vs Zerglings. Practice hold positions para cada tipo de cheese.';
    }
    
    return 'StarCraft 2 es puro strategy y execution. La práctica constante de fundamentals te llevará lejos. ¿Hay alguna raza o aspecto específico que quieras masterear?';
  }

  // Respuesta genérica
  private static getGenericResponse(message: string): string {
    const genericResponses = [
      'Interesante pregunta. Cada juego tiene sus propias mecánicas únicas. ¿Podrías ser más específico sobre qué aspecto te interesa?',
      'El gaming competitivo requiere práctica constante y análisis. ¿Hay algún juego en particular donde quieres mejorar?',
      'La estrategia es fundamental en todos los games. ¿Te gustaría que analicemos alguna situación específica?',
      'Cada detalle cuenta en el gaming de alto nivel. ¿Qué área específica quieres desarrollar?',
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }

  // Utilidad para delays
  private static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Auto-cleanup de sesiones inactivas (ejecutar cada hora)
setInterval(() => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  for (const [sessionId, session] of chatSessions.entries()) {
    if (session.lastActivity < oneHourAgo) {
      chatSessions.delete(sessionId);
    }
  }
}, 60 * 60 * 1000);
