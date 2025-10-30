import React from 'react';
import { ChatMessageProps } from '../types/chat.types';

export default function ChatMessage({ message }: Omit<ChatMessageProps, 'onAction'>) {
  const isIA = message.type === 'ia';
  
  return (
    <div className={`flex items-start space-x-3${!isIA ? ' justify-end' : ''}`}>
      {isIA && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border"
             style={{
               backgroundColor: 'var(--color-primary)',
               opacity: '0.2',
               borderColor: 'var(--color-primary)'
             }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 icon-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      {!isIA && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border"
             style={{
               backgroundColor: 'var(--color-secondary)',
               opacity: '0.2',
               borderColor: 'var(--color-secondary)'
             }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 icon-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
      <div className={`${isIA ? 'message-ai rounded-tl-none' : 'message-user rounded-tr-none'} max-w-[80%] p-4 rounded-lg shadow theme-card theme-text-primary`}>
        {message.content}
        {message.metadata && (
          <div className="mt-2 text-xs theme-text-secondary">
            {message.metadata.responseTime && (
              <span className="mr-2">⏱️ {message.metadata.responseTime}ms</span>
            )}
            {message.metadata.tokens && (
              <span className="mr-2">🔤 {message.metadata.tokens} tokens</span>
            )}
            {message.metadata.model && (
              <span>🤖 {message.metadata.model}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 