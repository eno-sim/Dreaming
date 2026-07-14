import { useCallback, useEffect, useState } from 'react';
import { CloudMoon, Sparkles } from 'lucide-react';
import DreamForm from './components/DreamForm';
import DreamFeed from './components/DreamFeed';
import { getDreams } from './services/api';

export default function App() {
  const [dreams, setDreams] = useState([]); const [state, setState] = useState({ loading: true, error: '' });
  const loadDreams = useCallback(async () => { setState({ loading: true, error: '' }); try { const data = await getDreams(); setDreams(data.dreams); setState({ loading: false, error: '' }); } catch (error) { setState({ loading: false, error: error.message }); } }, []);
  useEffect(() => { loadDreams(); }, [loadDreams]);
  return <main className="min-h-screen overflow-hidden px-4 py-8 sm:px-8 lg:px-12"><div className="stars" /><header className="relative mx-auto flex max-w-7xl items-center justify-between"><div className="flex items-center gap-3"><span className="rounded-2xl bg-white/80 p-3 text-night shadow-sm"><CloudMoon size={24} /></span><span className="font-display text-2xl text-white">dreaming</span></div><span className="hidden items-center gap-2 text-sm text-white/75 sm:flex"><Sparkles size={16} /> a gentle journal for night thoughts</span></header><div className="relative mx-auto mt-12 grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start"><div className="pt-4 lg:sticky lg:top-8"><p className="eyebrow text-lilac">Good morning, dreamer</p><h1 className="mt-3 max-w-xl font-display text-5xl leading-[1.05] text-white sm:text-6xl">Keep the <span className="text-lilac">magic</span> close.</h1><p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">A quiet corner to remember the worlds your sleeping mind creates.</p><div className="mt-8 h-px max-w-xs bg-white/15" /></div><div className="space-y-12"><DreamForm onSaved={loadDreams} /><DreamFeed dreams={dreams} loading={state.loading} error={state.error} onRefresh={loadDreams} /></div></div></main>;
}
