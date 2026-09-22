import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  ThumbsUp, 
  Hash, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import { adminStore, DiscussionMessage } from '@/lib/adminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CHANNELS = [
  { id: 'career-guidance', name: 'Career Guidance & Placements', icon: '💼', desc: 'Interview tips, resume feedback, and industry advice' },
  { id: 'campus-announcements', name: 'Campus Announcements', icon: '📢', desc: 'Official updates from the Alumni Secretariat' },
  { id: 'tech-and-ai', name: 'Tech, AI & Foundation Models', icon: '⚡', desc: 'Systems engineering, open source, and AI discussions' },
  { id: 'batch-reunions', name: 'Batch & Chapter Meetups', icon: '🎓', desc: 'Global chapter meetups and cohort gatherings' },
];

export default function MessagesPage() {
  const [currentUser, setCurrentUser] = useState(adminStore.getCurrentUser());
  const [activeChannel, setActiveChannel] = useState('career-guidance');
  const [messages, setMessages] = useState<DiscussionMessage[]>(adminStore.getDiscussionMessages(activeChannel));
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return adminStore.subscribe(() => {
      setMessages(adminStore.getDiscussionMessages(activeChannel));
      setCurrentUser(adminStore.getCurrentUser());
    });
  }, [activeChannel]);

  useEffect(() => {
    setMessages(adminStore.getDiscussionMessages(activeChannel));
  }, [activeChannel]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const authorRole = currentUser.role === 'admin' 
      ? 'Admin' 
      : currentUser.role === 'student' 
      ? 'Student' 
      : 'Alumni';

    adminStore.postDiscussionMessage({
      channel: activeChannel,
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      authorRole,
      authorAvatar: currentUser.avatar,
      content: newMessage.trim(),
    });

    setNewMessage('');
  };

  const handleLike = (id: string) => {
    adminStore.likeDiscussionMessage(id);
  };

  const currentChannelMeta = CHANNELS.find((c) => c.id === activeChannel) || CHANNELS[0];

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase tracking-widest text-[#0a3324] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100">
              Community Forums
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Synchronized LocalStorage Institutional Message Center
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Discussions & Messages
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            Exchange advice, share breakthroughs, and engage directly with fellow alumni and students.
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER: TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[620px]">
        {/* CHANNELS SIDEBAR */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col gap-2 h-fit">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 block">
            Discussion Channels
          </span>

          {CHANNELS.map((ch) => {
            const isActive = activeChannel === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 ${
                  isActive
                    ? 'bg-[#0a3324] text-white shadow-md'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-lg shrink-0 mt-0.5">{ch.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {ch.name}
                  </h4>
                  <p className={`text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {ch.desc}
                  </p>
                </div>
              </button>
            );
          })}

          <div className="mt-6 pt-4 border-t border-slate-100 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
            <span className="text-xs font-bold text-emerald-950 block">Signed in as:</span>
            <span className="text-xs text-emerald-800 font-semibold truncate block mt-0.5">
              {currentUser.fullName} ({currentUser.role})
            </span>
          </div>
        </div>

        {/* CHAT / THREAD AREA */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden h-[640px]">
          {/* Channel Header */}
          <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{currentChannelMeta.icon}</span>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  #{currentChannelMeta.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {currentChannelMeta.desc}
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              {messages.length} messages in thread
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <MessageSquare className="w-12 h-12 text-slate-300 mb-2" />
                <p className="font-medium text-slate-600">No messages yet in this channel.</p>
                <p className="text-xs text-slate-400 mt-1">Be the first to start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.authorId === currentUser.id || msg.authorName === currentUser.fullName;

                return (
                  <div 
                    key={msg.id} 
                    className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Author Avatar */}
                    <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-[#F5C347] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                      {msg.authorAvatar ? (
                        <img src={msg.authorAvatar} alt={msg.authorName} className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        msg.authorName.charAt(0)
                      )}
                    </div>

                    <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                      {/* Name & Role Header */}
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-xs font-bold text-slate-900">
                          {isMe ? 'You' : msg.authorName}
                        </span>
                        <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${
                          msg.authorRole === 'Admin'
                            ? 'bg-purple-100 text-purple-800'
                            : msg.authorRole === 'Alumni'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {msg.authorRole}
                        </span>
                        <span className="text-[0.65rem] text-slate-400">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Bubble */}
                      <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                        isMe 
                          ? 'bg-[#0a3324] text-[#FAF7EE] rounded-tr-none shadow-sm' 
                          : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>

                      {/* Reaction */}
                      <button
                        onClick={() => handleLike(msg.id)}
                        className="flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full text-xs text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{msg.likes > 0 ? msg.likes : 'Like'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${currentChannelMeta.name}...`}
              className="bg-white border-slate-200 rounded-full px-5 text-sm py-2.5 flex-1 focus:ring-emerald-500"
            />
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              className="rounded-full bg-[#0a3324] hover:bg-[#144b35] text-white px-5 py-2.5 font-semibold shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4 mr-1.5" /> Post
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
