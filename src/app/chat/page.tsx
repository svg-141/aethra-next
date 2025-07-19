"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatMessage, CommentSection, GAMES, getGameByKey, ChatMessageType } from '../../features/chat';
import { TooltipGuide } from '../../features/tooltips';
import { useNotifications } from '../../features/notifications';

export default function ChatPage() {
  // Estado para el juego seleccionado
  const [selectedGame, setSelectedGame] = useState(GAMES[0].key);
  const activeGame = getGameByKey(selectedGame) || GAMES[0];

  // Estado para mensajes y input controlado
  const [messages, setMessages] = useState<ChatMessageType[]>([
    { 
      id: '1',
      type: 'ia', 
      content: <p>¡Hola! Soy Aethra, tu IA estratégica para <b>{activeGame.name}</b>. Pregúntame sobre builds, meta, counters o cambios recientes.</p>,
      timestamp: new Date(),
      game: activeGame.key
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Ref para scroll automático
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Hook de notificaciones
  const { addNotification } = useNotifications();

  // Función para generar respuestas simuladas
  const getFakeResponse = (userMsg: string, gameKey: string) => {
    if (gameKey === 'valorant') {
      if (/meta|parche/i.test(userMsg)) return 'El meta actual favorece a agentes como Jett, Reyna y Viper. Las composiciones con duelistas son muy efectivas.';
      if (/composición|team/i.test(userMsg)) return 'Para ranked, recomiendo: Jett, Reyna, Viper, Sova, Sage. Esta composición es muy equilibrada.';
      if (/reyna|counter/i.test(userMsg)) return 'Contra Reyna, usa agentes como Cypher para limitar sus escapes, o Sova para revelar su posición.';
      if (/ascent|mapa/i.test(userMsg)) return 'En Ascent, controla Mid con Sova y usa las habilidades de Viper para dividir los sitios.';
      return '¡Consulta sobre Valorant! ¿Te interesa el meta, agentes o estrategias de mapa?';
    }
    
    if (gameKey === 'lol') {
      if (/campeón|champion/i.test(userMsg)) return 'Los campeones más fuertes actualmente son: Yasuo, Zed, Ahri en mid. Lee Sin y Kha\'Zix en jungla.';
      if (/yasuo|mid/i.test(userMsg)) return 'Contra Yasuo, usa campeones con CC como Malzahar o Lissandra. Evita peleas largas y pica cuando no tenga tornado.';
      if (/build|adc/i.test(userMsg)) return 'Para ADC, las builds actuales favorecen: Kraken Slayer + Infinity Edge para daño crítico, o Galeforce para movilidad.';
      if (/elo|ranked/i.test(userMsg)) return 'Para subir de elo: enfócate en farm, no mueras innecesariamente, y mejora tu visión del mapa.';
      return '¡Consulta sobre League of Legends! ¿Te interesa campeones, builds o estrategias?';
    }
    
    if (gameKey === 'dota2') {
      if (/héroe|hero|meta/i.test(userMsg)) return 'Los héroes más fuertes en el meta actual son: Invoker, Storm Spirit, y Phantom Assassin.';
      if (/invoker|build/i.test(userMsg)) return 'Para Invoker: empieza con Quas-Wex, construye Orchid Malevolence y Blink Dagger para iniciar teamfights.';
      if (/línea|lane/i.test(userMsg)) return 'En la fase de líneas: mantén el equilibrio, usa las habilidades eficientemente y coordina con tu support.';
      if (/teamfight/i.test(userMsg)) return 'En teamfights: posiciona bien, usa las habilidades en el orden correcto y coordina con tu equipo.';
      return '¡Consulta sobre Dota 2! ¿Te interesa héroes, builds o estrategias?';
    }

    if (gameKey === 'cs2') {
      if (/awp|dust2/i.test(userMsg)) return 'Para AWP en Dust2: posiciones clave son A Long, Mid Doors, y B Site. Siempre ten un escape planificado.';
      if (/eco|economía/i.test(userMsg)) return 'En eco rounds: compra solo pistolas básicas, usa tácticas de rush o espera a que el equipo tenga dinero.';
      if (/aim|precisión/i.test(userMsg)) return 'Para mejorar el aim: practica en mapas de aim, ajusta tu sensibilidad, y mantén la crosshair a nivel de la cabeza.';
      if (/comunicación|team/i.test(userMsg)) return 'Comunica claramente: posiciones del enemigo, información de daño, y coordina las rotaciones.';
      return '¡Consulta sobre CS2! ¿Te interesa aim, estrategias o economía?';
    }

    if (gameKey === 'starcraft2') {
      if (/build|terran|zerg|protoss/i.test(userMsg)) return 'Para Terran, la build 3-1-1 es muy sólida. Contra Zerg, defiende bien los rush.';
      if (/micro|macro/i.test(userMsg)) return 'Practica el control de unidades y la producción constante para mejorar tu micro y macro.';
      if (/timing|expansión/i.test(userMsg)) return 'Los timings clave son: expansión a 2 bases, y luego expandir según la presión del enemigo.';
      if (/rush|defensa/i.test(userMsg)) return 'Para defender rush: construye unidades defensivas temprano y mantén scouting constante.';
      return '¡Consulta sobre Starcraft 2! ¿Te interesa builds, timings o estrategias por raza?';
    }

    if (gameKey === 'overwatch2') {
      if (/composición|team/i.test(userMsg)) return 'Las mejores composiciones actuales son: 2-2-2 con tanques como Reinhardt y DPS como Genji.';
      if (/mercy|support/i.test(userMsg)) return 'Con Mercy: mantén la distancia, usa Guardian Angel para movilidad, y prioriza healear a los tanques.';
      if (/genji|counter/i.test(userMsg)) return 'Contra Genji: usa héroes con CC como Brigitte o Ana, y mantén la distancia.';
      if (/mapa|estrategia/i.test(userMsg)) return 'Adapta tu composición al mapa: en mapas de control usa héroes móviles, en payload usa héroes de área.';
      return '¡Consulta sobre Overwatch 2! ¿Te interesa composiciones, héroes o estrategias?';
    }

    return '¡Gracias por tu pregunta!';
  };

  // Manejo de envío de mensaje
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: <p>{input}</p>,
      timestamp: new Date(),
      game: selectedGame
    };
    
    // Agrega mensaje del usuario
    setMessages(prev => [...prev, userMessage]);
    const userMsg = input;
    setInput('');
    setIsLoading(true);
    
    // Simula respuesta de IA
    setTimeout(() => {
      try {
        const response = getFakeResponse(userMsg, selectedGame);
        const aiMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          type: 'ia',
          content: <p>{response}</p>,
          timestamp: new Date(),
          game: selectedGame,
          metadata: {
            responseTime: 1200,
            tokens: Math.floor(response.length / 4),
            model: 'Aethra-Gaming-v1'
          }
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // Notificación de respuesta exitosa
        addNotification({
          type: 'success',
          priority: 'medium',
          title: 'Respuesta de Aethra',
          message: `Aethra ha respondido a tu consulta sobre ${activeGame.name}`,
        });
        
        setIsLoading(false);
      } catch (error) {
        // Notificación de error
        addNotification({
          type: 'error',
          priority: 'high',
          title: 'Error en la comunicación',
          message: 'No se pudo obtener respuesta de Aethra. Intenta de nuevo.',
        });
        setIsLoading(false);
      }
    }, 1200);
  };

  // Limpiar mensajes al cambiar de juego
  const handleSelectGame = (key: string) => {
    const game = getGameByKey(key);
    if (!game) return;
    
    setSelectedGame(key);
    setMessages([
      { 
        id: '1',
        type: 'ia', 
        content: <p>¡Hola! Soy Aethra, tu IA estratégica para <b>{game.name}</b>. Pregúntame sobre builds, meta, counters o cambios recientes.</p>,
        timestamp: new Date(),
        game: key
      }
    ]);
    
    // Notificación de cambio de juego
    addNotification({
      type: 'info',
      priority: 'low',
      title: 'Juego cambiado',
      message: `Ahora consultando sobre ${game.name}`,
    });
  };

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933]">
      <div className="max-w-6xl mx-auto">
        {/* Header del Chat */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-full flex items-center justify-center border-2 border-purple-500/40 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Asistente Estratégico Aethra</h2>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-xs text-gray-400">Especialista en meta de juegos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Columna lateral - Selector de juegos y ejemplos */}
          <div className="lg:col-span-1 space-y-6">
            {/* Selector de juegos */}
            <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-4 border border-purple-900/60" data-tooltip="game-selector">
              <h3 className="text-sm font-semibold text-purple-300 mb-3">SELECCIONA TU JUEGO</h3>
              <div className="grid grid-cols-2 gap-3">
                {GAMES.map(game => (
                  <button
                    key={game.key}
                    onClick={() => handleSelectGame(game.key)}
                    className={`p-3 rounded-lg border transition-all text-center ${
                      selectedGame === game.key
                        ? 'bg-purple-600/30 border-purple-500 text-white'
                        : 'bg-[#0f0720] border-purple-900/50 text-gray-300 hover:border-purple-500/50 hover:text-white'
                    }`}
                  >
                    <img src={game.icon} alt={game.name} className="w-8 h-8 mx-auto mb-2 rounded" />
                    <div className="text-xs font-medium">{game.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ejemplos de consultas */}
            <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-4 border border-purple-900/60" data-tooltip="examples">
              <h3 className="text-sm font-semibold text-purple-300 mb-3">EJEMPLOS DE CONSULTAS</h3>
              <div className="space-y-2">
                {activeGame.examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(example)}
                    className="w-full text-left p-2 text-xs text-gray-300 hover:text-white hover:bg-purple-600/20 rounded transition-all"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Tip del día */}
            <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-4 border border-purple-900/60">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">TIP ESTRATÉGICO</h3>
              <p className="text-xs text-gray-300">{activeGame.tip}</p>
            </div>
          </div>

          {/* Columna central - Consulta estratégica */}
          <div className="lg:col-span-3">
            <div className="chat-container h-[calc(110vh-140px)] bg-[#0f0720] rounded-2xl border border-purple-900/60 overflow-hidden flex flex-col">
              {/* Área de mensajes */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-morado">
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
              <form onSubmit={handleSend} className="flex items-center gap-3 p-4 border-t border-purple-900/40 bg-[#1a0933]">
                <div className="flex-1" data-tooltip="chat-input">
                  <input
                    type="text"
                    className="w-full bg-[#0f0720] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 border border-purple-900/50"
                    placeholder={`Escribe tu consulta sobre ${activeGame.name}...`}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !input.trim()}
                >
                  Enviar
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

      {/* Tooltips del chat */}
      <TooltipGuide section="chat" />
    </section>
  );
} 