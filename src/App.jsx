import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit2, Grid, List, Search, Menu, X, 
  FileText, Briefcase, User, Lightbulb, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

// --- MOCK DATA ---
const INITIAL_DATA = [
  { id: 1, title: "Placement Strategy 2026", description: "Solve DSA questions. Make projects and revise core subjects.", category: "Work", createdAt: new Date().toISOString() },
  { id: 2, title: "Grocery List", description: "Almond milk, Detergent,Aatta bread, Coffee.", category: "Personal", createdAt: new Date().toISOString() },
  { id: 3, title: "Project", description: "Build project like notely.", category: "Ideas", createdAt: new Date().toISOString() },
];

const CATEGORIES = [
  { id: 'all', name: 'All Notes', icon: FileText, color: 'text-blue-400' },
  { id: 'Work', name: 'Work', icon: Briefcase, color: 'text-violet-400' },
  { id: 'Personal', name: 'Personal', icon: User, color: 'text-emerald-400' },
  { id: 'Ideas', name: 'Ideas', icon: Lightbulb, color: 'text-amber-400' }
];

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'Work', description: '' });

  // Load & Save Logic
  useEffect(() => {
    const saved = localStorage.getItem('modern_notes_app');
    setNotes(saved ? JSON.parse(saved) : INITIAL_DATA);
  }, []);

  useEffect(() => {
    if (notes.length > 0) localStorage.setItem('modern_notes_app', JSON.stringify(notes));
  }, [notes]);

  const handleSave = (e) => {
    e.preventDefault();
    const newNote = {
      id: editingNote ? editingNote.id : Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      createdAt: editingNote ? editingNote.createdAt : new Date().toISOString(),
    };
    setNotes(prev => editingNote ? prev.map(n => n.id === editingNote.id ? newNote : n) : [newNote, ...prev]);
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) setNotes(notes.filter(n => n.id !== id));
  };

  const openModal = (note = null) => {
    setEditingNote(note);
    setFormData(note ? { ...note } : { title: '', category: 'Work', description: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  // Duplicate Checker
  const isDuplicate = (note) => {
    return notes.some(n => n.id !== note.id && n.title.toLowerCase() === note.title.toLowerCase() && n.category === note.category);
  };

  const filteredNotes = notes
    .filter(n => selectedCategory === 'all' || n.category === selectedCategory)
    .filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen bg-grid-pattern text-slate-200 overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900/80 backdrop-blur-2xl border-r border-slate-800 transform transition-transform duration-300
        md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <FileText className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Notely</h1>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25 mb-8"
          >
            <Plus size={20} /> New Note
          </motion.button>

          <nav className="space-y-2 flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setIsMobileMenuOpen(false); }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${selectedCategory === cat.id 
                    ? 'bg-slate-800 text-white ring-1 ring-slate-700 shadow-lg shadow-black/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                `}
              >
                <cat.icon size={18} className={`transition-colors ${selectedCategory === cat.id ? cat.color : 'text-slate-500 group-hover:text-slate-300'}`} />
                {cat.name}
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {cat.id === 'all' ? notes.length : notes.filter(n => n.category === cat.id).length}
                </span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="mt-auto pt-6 border-t border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-xs font-bold text-slate-900">AG</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Ankita Gupta</p>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between z-20">
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
              type="text" placeholder="Search notes..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-600 text-sm text-slate-200"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800 ml-4">
            {[ { m: 'grid', Icon: Grid }, { m: 'list', Icon: List }].map(({ m, Icon }) => (
              <button 
                key={m} onClick={() => setViewMode(m)}
                className={`p-2 rounded-lg transition-all ${viewMode === m ? 'bg-slate-800 text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </header>

        {/* Notes Grid */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 scrollbar-thin scrollbar-thumb-slate-700">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">{CATEGORIES.find(c => c.id === selectedCategory)?.name}</h2>
              <p className="text-slate-500 text-sm font-medium">{format(new Date(), 'EEEE, MMM do')}</p>
            </div>
            
            {filteredNotes.length === 0 ? (
              <div className="text-center py-20 opacity-40">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-slate-500" />
                </div>
                <p className="text-slate-400 text-lg">No notes found here.</p>
              </div>
            ) : (
              <motion.div layout className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" : "space-y-3 max-w-3xl mx-auto"}>
                <AnimatePresence>
                  {filteredNotes.map((note) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                      key={note.id} onClick={() => openModal(note)}
                      className={`
                        group bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-black/20 transition-all cursor-pointer relative overflow-hidden
                        ${viewMode === 'list' ? 'flex gap-6 items-center py-4' : 'flex flex-col h-64'}
                      `}
                    >
                       {/* DUPLICATE BADGE */}
                       {isDuplicate(note) && (
                          <div className="absolute top-0 right-0 bg-rose-500/20 text-rose-400 border-l border-b border-rose-500/30 text-[10px] font-bold px-2 py-1 rounded-bl-xl z-20 flex items-center gap-1">
                            <AlertCircle size={10} /> DUPLICATE
                          </div>
                        )}

                      {/* Glow Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex-1 min-w-0 relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`
                            text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-opacity-20
                            ${note.category === 'Work' ? 'bg-violet-500/10 text-violet-400 border-violet-500' : 
                              note.category === 'Personal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500' : 
                              'bg-amber-500/10 text-amber-400 border-amber-500'}
                          `}>
                            {note.category}
                          </span>
                          <span className="text-xs text-slate-500">{format(new Date(note.createdAt), 'MMM d, , h:mm a')}</span>
                        </div>
                        
                        <h3 className={`font-semibold text-slate-100 mb-2 leading-snug group-hover:text-indigo-300 transition-colors ${viewMode === 'grid' ? 'text-lg' : 'text-lg'}`}>
                          {note.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">{note.description}</p>
                      </div>

                      {/* Actions */}
                      <div className={`flex gap-2 relative z-10 ${viewMode === 'grid' ? 'mt-auto pt-4 border-t border-slate-800/50' : 'pl-4 border-l border-slate-800'}`}>
                        <button onClick={(e) => { e.stopPropagation(); openModal(note); }} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-indigo-400 transition-colors"><Edit2 size={16} /></button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }} className="p-1.5 rounded-lg hover:bg-rose-900/30 text-slate-500 hover:text-rose-400 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl shadow-black/50 border border-slate-800 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                <h2 className="text-lg font-bold text-white">{editingNote ? 'Edit Note' : 'New Note'}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Title</label>
                  <input 
                    required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter a catchy title..." 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <div className="flex gap-2">
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <button
                        key={cat.id} type="button" onClick={() => setFormData({...formData, category: cat.id})}
                        className={`
                          flex-1 py-2.5 rounded-lg text-sm font-medium transition-all border
                          ${formData.category === cat.id 
                            ? `bg-slate-800 text-white border-slate-600 shadow-inner` 
                            : 'bg-slate-950 text-slate-500 border-slate-800 hover:bg-slate-900 hover:text-slate-300'}
                        `}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Content</label>
                  <textarea 
                    rows={6} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Jot down your thoughts..." 
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none text-slate-300 placeholder:text-slate-600"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 py-2.5 text-slate-400 font-medium hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20">
                    Save Note
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
