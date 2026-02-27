import { useState } from 'react'
import { Send, Search, X, MessageCircle, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatUser {
  id: string
  name: string
  email: string
  lastMessage: string
  timestamp: string
  unread: number
  avatar: string
}

interface ChatMessage {
  id: string
  sender: 'user' | 'admin'
  text: string
  timestamp: string
  threadId?: string // ID del messaggio padre per i thread
  replies?: ChatMessage[] // Risposte al messaggio
}

const mockUsers: ChatUser[] = [
  {
    id: 'user-1',
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    lastMessage: 'Quando arriva il mio ordine?',
    timestamp: '5 min fa',
    unread: 2,
    avatar: '👨‍💼',
  },
  {
    id: 'user-2',
    name: 'Luca Bianchi',
    email: 'luca.bianchi@example.com',
    lastMessage: 'Quale taglia mi consigliate?',
    timestamp: '1 ora fa',
    unread: 0,
    avatar: '👨',
  },
  {
    id: 'user-3',
    name: 'Francesco Verdi',
    email: 'francesco.verdi@example.com',
    lastMessage: 'Accettate pagamenti in rate?',
    timestamp: '2 ore fa',
    unread: 1,
    avatar: '👴',
  },
]

// Conversazioni separate per ogni utente - ora con supporto per thread
const conversationsByUser: Record<string, ChatMessage[]> = {
  'user-1': [
    { 
      id: 'msg-1u1', 
      sender: 'user', 
      text: 'Buongiorno, vorrei chiedervi una cosa', 
      timestamp: '10:30',
      replies: []
    },
    {
      id: 'msg-2u1',
      sender: 'admin',
      text: 'Buongiorno! Come possiamo aiutarvi?',
      timestamp: '10:32',
      replies: []
    },
    { 
      id: 'msg-3u1', 
      sender: 'user', 
      text: 'Quando arriva il mio ordine?', 
      timestamp: '10:35',
      replies: [
        {
          id: 'reply-1',
          sender: 'admin',
          text: 'Quale numero ordine hai?',
          timestamp: '10:36',
        },
        {
          id: 'reply-2',
          sender: 'user',
          text: 'Ordine #ORD-2026-001',
          timestamp: '10:37',
        },
      ]
    },
    {
      id: 'msg-4u1',
      sender: 'admin',
      text: 'Verifico lo stato della spedizione per voi.',
      timestamp: '10:37',
      replies: []
    },
  ],
  'user-2': [
    { 
      id: 'msg-1u2', 
      sender: 'user', 
      text: 'Quale taglia mi consigliate per la camicia?', 
      timestamp: '14:00',
      replies: [
        {
          id: 'reply-1u2',
          sender: 'admin',
          text: 'Dipende dalla vostra corporatura. Quale è la vostra altezza?',
          timestamp: '14:02',
        },
        {
          id: 'reply-2u2',
          sender: 'user',
          text: '185cm',
          timestamp: '14:05',
        },
      ]
    },
    {
      id: 'msg-2u2',
      sender: 'admin',
      text: 'Vi consiglio la taglia L!',
      timestamp: '14:07',
      replies: []
    },
  ],
  'user-3': [
    { 
      id: 'msg-1u3', 
      sender: 'user', 
      text: 'Accettate pagamenti in rate?', 
      timestamp: '09:00',
      replies: [
        {
          id: 'reply-1u3',
          sender: 'admin',
          text: 'Sì, accettiamo 3-12 rate con i maggiori istituti finanziari.',
          timestamp: '09:15',
        },
      ]
    },
  ],
}

export default function AdminChat() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(mockUsers[0])
  const [messages, setMessages] = useState<ChatMessage[]>(conversationsByUser['user-1'])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedThread, setSelectedThread] = useState<ChatMessage | null>(null)
  const [threadReply, setThreadReply] = useState('')

  const handleSelectUser = (user: ChatUser) => {
    setSelectedUser(user)
    setMessages(conversationsByUser[user.id] || [])
    setNewMessage('')
    setSelectedThread(null)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'admin',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      replies: [],
    }

    const updatedMessages = [...messages, message]
    setMessages(updatedMessages)
    
    if (selectedUser) {
      conversationsByUser[selectedUser.id] = updatedMessages
    }
    
    setNewMessage('')
  }

  const handleOpenThread = (message: ChatMessage) => {
    setSelectedThread(message)
    setThreadReply('')
  }

  const handleAddThreadReply = () => {
    if (!threadReply.trim() || !selectedThread) return

    const reply: ChatMessage = {
      id: `reply-${Date.now()}`,
      sender: 'admin',
      text: threadReply,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
    }

    const updatedMessages = messages.map(msg => 
      msg.id === selectedThread.id 
        ? { ...msg, replies: [...(msg.replies || []), reply] }
        : msg
    )
    
    setMessages(updatedMessages)
    setSelectedThread({ ...selectedThread, replies: [...(selectedThread.replies || []), reply] })
    
    if (selectedUser) {
      conversationsByUser[selectedUser.id] = updatedMessages
    }
    
    setThreadReply('')
  }

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container py-8">
        <h1 className="font-serif text-4xl mb-8">Chat con Clienti</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Users List */}
          <div className="bg-white rounded-lg shadow flex flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca cliente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* Users */}
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`w-full p-4 border-b text-left hover:bg-gray-50 transition ${
                    selectedUser?.id === user.id ? 'bg-accent bg-opacity-10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <p className="font-600 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-600 mt-1 truncate">{user.lastMessage}</p>
                    </div>
                    {user.unread > 0 && (
                      <div className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {user.unread}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window with Thread Panel */}
          <div className="lg:col-span-2 flex gap-4">
            {/* Main Chat */}
            {selectedUser ? (
              <div className="flex-1 bg-white rounded-lg shadow flex flex-col">
                {/* Header */}
                <div className="p-4 border-b">
                  <p className="font-serif text-lg font-600">{selectedUser.name}</p>
                  <p className="text-xs text-gray-500">{selectedUser.email}</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        onClick={() => handleOpenThread(msg)}
                        className={`max-w-xs px-4 py-3 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                          msg.sender === 'admin'
                            ? 'bg-gradient-to-r from-accent to-yellow-500 text-white rounded-br-none shadow-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
                        } ${selectedThread?.id === msg.id ? 'ring-2 ring-offset-2 ring-accent' : ''}`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className="flex items-center justify-between mt-2 gap-3">
                          <p className={`text-xs ${msg.sender === 'admin' ? 'text-white/70' : 'text-gray-600'}`}>
                            {msg.timestamp}
                          </p>
                          {msg.replies && msg.replies.length > 0 && (
                            <span className={`text-xs font-bold ${msg.sender === 'admin' ? 'text-white/90' : 'text-accent'}`}>
                              {msg.replies.length} risposte
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Scrivi un messaggio..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-bold"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Thread Panel */}
            <AnimatePresence>
              {selectedThread && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-80 bg-white rounded-lg shadow flex flex-col border-l-4 border-accent overflow-hidden"
                >
                  {/* Thread Header */}
                  <div className="p-4 bg-gradient-to-r from-accent to-yellow-500 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-bold">Thread</span>
                    </div>
                    <button
                      onClick={() => setSelectedThread(null)}
                      className="hover:bg-white/20 p-1 rounded transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Thread Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {/* Main Message */}
                    <div className={`p-3 rounded-lg ${selectedThread.sender === 'admin' ? 'bg-accent/10 border border-accent' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex gap-2">
                        <span className="text-2xl">{selectedThread.sender === 'admin' ? '👔' : '👤'}</span>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-gray-600 mb-1">
                            {selectedThread.sender === 'admin' ? 'Admin' : selectedUser?.name}
                          </p>
                          <p className="text-sm text-gray-900">{selectedThread.text}</p>
                          <p className="text-xs text-gray-500 mt-2">{selectedThread.timestamp}</p>
                        </div>
                      </div>
                    </div>

                    {/* Separator */}
                    {selectedThread.replies && selectedThread.replies.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 my-2">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span>{selectedThread.replies.length} risposte</span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                    )}

                    {/* Thread Replies */}
                    {selectedThread.replies?.map((reply) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 rounded-lg ${reply.sender === 'admin' ? 'bg-accent/10 border-l-2 border-accent' : 'bg-blue-50 border-l-2 border-blue-300'}`}
                      >
                        <div className="flex gap-2">
                          <span className="text-lg">{reply.sender === 'admin' ? '👔' : '👤'}</span>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-gray-600 mb-1">
                              {reply.sender === 'admin' ? 'Admin' : selectedUser?.name}
                            </p>
                            <p className="text-sm text-gray-800">{reply.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{reply.timestamp}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Thread Reply Input */}
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={threadReply}
                        onChange={(e) => setThreadReply(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddThreadReply()}
                        placeholder="Rispondi nel thread..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <button
                        onClick={handleAddThreadReply}
                        className="bg-accent text-white px-3 py-2 rounded-lg hover:bg-opacity-90 transition"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
