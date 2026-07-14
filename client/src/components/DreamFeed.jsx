import { BookHeart, Moon, RefreshCw, Tag } from 'lucide-react';

const typeNames = { SAMSARIC: 'Samsaric', CLARITY: 'Clarity', CLEAR_LIGHT: 'Clear Light' };
const formatDate = (value) => new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(value));

export default function DreamFeed({ dreams, loading, error, onRefresh }) {
  return <section className="space-y-5"><div className="flex items-end justify-between"><div><p className="eyebrow">Your night sky</p><h2 className="font-display text-3xl text-ink">Dream archive</h2></div><button className="icon-button" onClick={onRefresh} disabled={loading} aria-label="Refresh dreams"><RefreshCw size={17} className={loading ? 'animate-spin' : ''} /></button></div>
    {error && <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
    {loading && !dreams.length && <div className="rounded-[2rem] bg-white/60 p-10 text-center text-ink/60">Gathering your dreams…</div>}
    {!loading && !error && !dreams.length && <div className="rounded-[2rem] border border-dashed border-white/80 bg-white/45 p-10 text-center"><Moon className="mx-auto mb-3 text-lilac" size={32} /><p className="font-display text-xl text-ink">A blank sky, for now.</p><p className="mt-1 text-sm text-ink/55">Your first dream will make a little constellation here.</p></div>}
    {dreams.map((dream) => <article key={dream.id} className="card-glow rounded-[2rem] bg-white/85 p-6"><div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink/45"><span>{formatDate(dream.timestamp)}</span><span>·</span><span>{typeNames[dream.dream_type]}</span>{dream.is_lucid && <span className="rounded-full bg-lilac/35 px-2 py-1 text-night">Lucid · {dream.lucidity_level}/5</span>}</div><p className="mt-4 whitespace-pre-wrap font-display text-xl leading-relaxed text-ink">{dream.content}</p>{(dream.themes.length > 0 || dream.dream_signs.length > 0) && <div className="mt-5 flex flex-wrap gap-2">{[...dream.themes, ...dream.dream_signs].map((item, index) => <span key={`${item}-${index}`} className="tag"><Tag size={12} />{item}</span>)}</div>}{dream.practice_notes && <div className="mt-5 flex gap-3 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-ink/70"><BookHeart size={18} className="mt-0.5 shrink-0 text-lilac" /><span>{dream.practice_notes}</span></div>}</article>)}
  </section>;
}
