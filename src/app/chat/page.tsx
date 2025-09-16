"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatMessage, CommentSection, GAMES, getGameByKey, ChatMessageType } from '../../features/chat';
import { useNotifications } from '../../features/notifications';
import { ChatService } from '../../features/chat/services/chatService';
import { useAuth } from '../../context/AuthContext';

export default function ChatPage() {
  // Estado para el juego seleccionado
  const [selectedGame, setSelectedGame] = useState(GAMES[0].key);
  const activeGame = getGameByKey(selectedGame) || GAMES[0];

  // Estado para mensajes y input controlado
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chatStats, setChatStats] = useState({ totalMessages: 0, responseTime: 0 });

  // Ref para scroll automático
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Hook de notificaciones
  const { addNotification } = useNotifications();
  
  // Hook de autenticación
  const { user, isAuthenticated } = useAuth();

  // Inicializar chat al cargar o cambiar juego
  useEffect(() => {
    initializeChat();
  }, [selectedGame]);

  const initializeChat = async () => {
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para usar el chat.',
      });
      return;
    }
    
    try {
      const newSessionId = ChatService.createSession(selectedGame, user.id);
      const session = ChatService.getOrCreateSession(selectedGame, newSessionId, user.id);
      
      setSessionId(newSessionId);
      setMessages(session.messages.map(msg => ({
        ...msg,
        content: typeof msg.content === 'string' ? <p dangerouslySetInnerHTML={{ __html: msg.content }} /> : msg.content
      })));
      
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error de inicialización',
        message: 'No se pudo inicializar el chat correctamente.',
      });
    }
  };

  // Actualizar estadísticas del chat
  useEffect(() => {
    const stats = ChatService.getChatStats();
    setChatStats({
      totalMessages: stats.totalMessages,
      responseTime: messages.length > 1 ? messages[messages.length - 1]?.metadata?.responseTime || 0 : 0
    });
  }, [messages]);


  // Manejo de envío de mensaje
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const messageContent = input.trim();
    setInput('');
    setIsLoading(true);
    
    try {
      // Agregar mensaje del usuario inmediatamente
      const userMessage: ChatMessageType = {
        id: Date.now().toString(),
        type: 'user',
        content: <p>{messageContent}</p>,
        timestamp: new Date(),
        game: selectedGame
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Verificar autenticación
      if (!isAuthenticated || !user) {
        addNotification({
          type: 'error',
          priority: 'high',
          title: 'Autenticación requerida',
          message: 'Debes iniciar sesión para enviar mensajes.',
        });
        return;
      }
      
      // Enviar mensaje al servicio de chat
      const response = await ChatService.sendMessage(messageContent, selectedGame, sessionId || undefined, user.id);
      
      if (response.success) {
        // Convertir contenido de string a JSX si es necesario
        const aiMessage: ChatMessageType = {
          ...response.message,
          content: typeof response.message.content === 'string' 
            ? <p dangerouslySetInnerHTML={{ __html: response.message.content }} />
            : response.message.content
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // Notificación de respuesta exitosa
        addNotification({
          type: 'success',
          priority: 'low',
          title: 'Respuesta de Aethra',
          message: `Respondido en ${response.message.metadata?.responseTime}ms`,
        });
      } else {
        // Error en la respuesta
        addNotification({
          type: 'error',
          priority: 'high',
          title: 'Error en la comunicación',
          message: response.error || 'No se pudo obtener respuesta de Aethra.',
        });
      }
      
    } catch (error) {
      // Error inesperado
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error inesperado',
        message: 'Ocurrió un error al enviar tu mensaje. Intenta de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Cambiar de juego y reiniciar chat
  const handleSelectGame = async (key: string) => {
    const game = getGameByKey(key);
    if (!game || key === selectedGame) return;
    
    setSelectedGame(key);
    
    // Verificar autenticación
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para cambiar de juego.',
      });
      return;
    }
    
    // Limpiar sesión anterior si existe
    if (sessionId) {
      ChatService.clearSession(sessionId, user.id);
    }
    
    // Crear nueva sesión para el nuevo juego
    const newSessionId = ChatService.createSession(key, user.id);
    const session = ChatService.getOrCreateSession(key, newSessionId, user.id);
    
    setSessionId(newSessionId);
    setMessages(session.messages.map(msg => ({
      ...msg,
      content: typeof msg.content === 'string' ? <p dangerouslySetInnerHTML={{ __html: msg.content }} /> : msg.content
    })));
    
    // Notificación de cambio de juego
    addNotification({
      type: 'info',
      priority: 'low',
      title: 'Juego cambiado',
      message: `Iniciando nueva sesión para ${game.name}`,
    });
  };

  // Función para limpiar chat actual
  const handleClearChat = () => {
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para limpiar el chat.',
      });
      return;
    }
    
    if (sessionId) {
      ChatService.clearSession(sessionId, user.id);
    }
    initializeChat();
    
    addNotification({
      type: 'info',
      priority: 'low',
      title: 'Chat limpiado',
      message: 'Se ha iniciado una nueva sesión de chat.',
    });
  };

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header del Chat */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 mr-4" style={{ background: 'var(--gradient-primary)', borderColor: 'var(--color-primary)', opacity: '0.8' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-theme-primary">Asistente Estratégico Aethra</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-xs text-theme-secondary">Online • {activeGame.name}</span>
                </div>
                {chatStats.totalMessages > 0 && (
                  <span className="text-xs theme-badge" style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2', color: 'var(--color-primary)' }}>
                    {chatStats.totalMessages} mensajes
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Controles del chat */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="px-3 py-2 text-xs rounded-lg transition-all theme-text-secondary hover:theme-text-primary"
              style={{ 
                backgroundColor: 'var(--color-surface)', 
                borderColor: 'var(--color-border)', 
                border: '1px solid' 
              }}
              title="Limpiar chat"
            >
              <i className="fas fa-broom mr-1"></i>
              Limpiar
            </button>
            <button
              className="px-3 py-2 text-xs rounded-lg transition-all theme-text-secondary hover:theme-text-primary"
              style={{ 
                backgroundColor: 'var(--color-surface)', 
                borderColor: 'var(--color-border)', 
                border: '1px solid' 
              }}
              title="Configuración"
            >
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Columna lateral - Selector de juegos y ejemplos */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6 order-2 lg:order-1">
            {/* Selector de juegos */}
            <div className="cuadro rounded-2xl p-3 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-theme-primary mb-2 md:mb-3">SELECCIONA TU JUEGO</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 md:gap-3">
                {GAMES.map(game => (
                  <button
                    key={game.key}
                    onClick={() => handleSelectGame(game.key)}
                    className={`p-2 md:p-3 rounded-lg border transition-all text-center cuadro mobile-button ${
                      selectedGame === game.key
                        ? 'border-theme-hover text-theme-primary animate-theme-glow'
                        : 'text-theme-secondary hover:border-theme-hover hover:text-theme-primary'
                    }`}
                  >
                    <img src={game.icon} alt={game.name} className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 rounded" />
                    <div className="text-xs font-medium mobile-text-sm">{game.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ejemplos de consultas */}
            <div className="cuadro rounded-2xl p-3 md:p-4 hidden sm:block">
              <h3 className="text-xs md:text-sm font-semibold text-theme-primary mb-2 md:mb-3">EJEMPLOS DE CONSULTAS</h3>
              <div className="space-y-1 md:space-y-2">
                {activeGame.examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(example)}
                    className="w-full text-left p-2 text-xs text-theme-secondary hover:text-theme-primary rounded transition-all animate-theme-hover mobile-button"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Tip del día */}
            <div className="cuadro rounded-2xl p-3 md:p-4 hidden md:block">
              <h3 className="text-xs md:text-sm font-semibold text-theme-primary mb-2">TIP ESTRATÉGICO</h3>
              <p className="text-xs text-theme-secondary">{activeGame.tip}</p>
            </div>
          </div>

          {/* Columna central - Consulta estratégica */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="chat-container h-[calc(100vh-200px)] md:h-[calc(100vh-160px)] lg:h-[calc(100vh-140px)] rounded-xl md:rounded-2xl overflow-hidden flex flex-col">
              {/* Área de mensajes */}
              <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3 md:space-y-4 scrollbar-morado mobile-padding">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <ChatMessage
                    message={{
                      id: 'loading',
                      type: 'ia',
                      content: <span className="italic text-purple-300">Aethra está escribiendo...</span>,
                      timestamp: new Date(),
                      game: selectedGame
                    }}
                  />
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Formulario de entrada */}
              <form onSubmit={handleSend} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 border-t theme-border mobile-padding"
                    style={{ backgroundColor: 'var(--color-surface)' }}>
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full theme-input mobile-form-input"
                    placeholder={`Escribe tu consulta sobre ${activeGame.name}...`}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 md:py-3 theme-button mobile-button disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !input.trim()}
                >
                  <span className="hidden sm:inline">Enviar</span>
                  <i className="fas fa-paper-plane sm:hidden"></i>
                </button>
              </form>
            </div>

            {/* Sección de comentarios */}
            <div className="mt-8">
              <CommentSection
                sectionId="chat-feedback"
                initialComments={[
                  {
                    id: 1,
                    author: 'GamerPro123',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    content: 'Aethra me ayudó mucho con las estrategias de Valorant. Las respuestas son muy precisas y útiles.',
                    time: 'hace 1 día',
                    likes: 5,
                    section: 'chat-feedback',
                  },
                  {
                    id: 2,
                    author: 'LoLPlayer',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    content: 'Excelente asistente para League of Legends. ¿Podrían agregar más información sobre el meta de la jungla?',
                    time: 'hace 3 días',
                    likes: 3,
                    section: 'chat-feedback',
                  },
                ]}
                initialVotes={{ up: 89, down: 2 }}
                title="¿Cómo te está ayudando Aethra?"
                className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
} 