import { useState } from 'react'
import { Send, Search } from 'lucide-react'

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

const mockMessages: ChatMessage[] = [
  { id: 'msg-1', sender: 'user', text: 'Buongiorno, vorrei chiedervi una cosa', timestamp: '10:30' },
  {
    id: 'msg-2',
    sender: 'admin',
    text: 'Buongiorno! Come possiamo aiutarvi?',
    timestamp: '10:32',
  },
  { id: 'msg-3', sender: 'user', text: 'Quando arriva il mio ordine?', timestamp: '10:35' },
]

export default function AdminChat() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(mockUsers[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'admin',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, message])
    setNewMessage('')
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
                  onClick={() => setSelectedUser(user)}
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

          {/* Chat Window */}
          {selectedUser ? (
            <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col">
              {/* Header */}
              <div className="p-4 border-b">
                <p className="font-serif text-lg font-600">{selectedUser.name}</p>
                <p className="text-xs text-gray-500">{selectedUser.email}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === 'admin'
                          ? 'bg-accent text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-white/70' : 'text-gray-600'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
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
                    className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
