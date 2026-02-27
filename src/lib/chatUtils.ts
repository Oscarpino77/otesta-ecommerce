/**
 * Shared Chat Utilities
 * Funzioni comuni tra ChatWidget (client) e AdminChat (admin)
 */

export interface ChatThread {
  id: string
  sender: 'user' | 'admin'
  text: string
  timestamp: Date | string
  replies?: ChatThread[]
}

/**
 * Aggrega numero di risposte totali in un thread
 */
export const getThreadReplyCount = (thread: ChatThread | null): number => {
  if (!thread) return 0
  return thread.replies?.length ?? 0
}

/**
 * Formatta timestamp per display
 */
export const formatChatTime = (timestamp: Date | string): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  return date.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Formatta timestamp con data completa
 */
export const formatChatDateTime = (timestamp: Date | string): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  return date.toLocaleString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Valida lunghezza messaggio
 */
export const validateChatMessage = (message: string, maxLength = 500): boolean => {
  const trimmed = message.trim()
  return trimmed.length > 0 && trimmed.length <= maxLength
}

/**
 * Crea un nuovo thread message
 */
export const createChatMessage = (
  id: string,
  sender: 'user' | 'admin',
  text: string,
  timestamp: Date = new Date()
): ChatThread => ({
  id,
  sender,
  text,
  timestamp,
  replies: [],
})

/**
 * Aggiungi una risposta a un thread
 */
export const addReplyToThread = (
  thread: ChatThread,
  reply: ChatThread
): ChatThread => ({
  ...thread,
  replies: [...(thread.replies ?? []), reply],
})

/**
 * Conta messaggi totali inclusi i thread
 */
export const countTotalMessages = (threads: ChatThread[]): number => {
  return threads.reduce((count, thread) => {
    return count + 1 + (thread.replies?.length ?? 0)
  }, 0)
}

/**
 * Filtra thread per sender
 */
export const filterThreadsByUser = (
  threads: ChatThread[],
  sender: 'user' | 'admin'
): ChatThread[] => {
  return threads.filter(

(thread) => thread.sender === sender)
}

/**
 * Ottieni l'ultimo messaggio (include anche reply)
 */
export const getLastMessage = (threads: ChatThread[]): ChatThread | null => {
  if (!threads.length) return null

  let lastMessage: ChatThread | null = null

  for (const thread of threads) {
    if (!lastMessage || new Date(thread.timestamp) > new Date(lastMessage.timestamp)) {
      lastMessage = thread
    }

    if (thread.replies) {
      for (const reply of thread.replies) {
        if (!lastMessage || new Date(reply.timestamp) > new Date(lastMessage.timestamp)) {
          lastMessage = reply
        }
      }
    }
  }

  return lastMessage
}
