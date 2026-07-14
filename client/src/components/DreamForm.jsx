import { useState } from 'react';
import { Feather, Sparkles } from 'lucide-react';
import { createDream } from '../services/api';

const initial = { content: '', is_lucid: false, lucidity_level: 1, dream_type: 'SAMSARIC', themes: '', dream_signs: '', practice_notes: '' };
const toArray = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);

export default function DreamForm({ onSaved }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ loading: false, error: '', success: false });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(event) {
    event.preventDefault();
    if (!form.content.trim()) return setStatus({ loading: false, error: 'Give your dream a little space to land first.', success: false });
    setStatus({ loading: true, error: '', success: false });
    try {
      await createDream({ ...form, content: form.content.trim(), lucidity_level: Number(form.lucidity_level), themes: toArray(form.themes), dream_signs: toArray(form.dream_signs), practice_notes: form.practice_notes.trim() });
      setForm(initial); setStatus({ loading: false, error: '', success: true }); onSaved();
    } catch (error) { setStatus({ loading: false, error: error.message, success: false }); }
  }

  return <form onSubmit={submit} className="card-glow rounded-[2rem] bg-white/90 p-6 sm:p-8">
    <div className="mb-7 flex items-start justify-between"><div><p className="eyebrow">A soft place to remember</p><h2 className="font-display text-3xl text-ink">What visited you?</h2></div><span className="rounded-2xl bg-lilac/30 p-3 text-night"><Feather size={24} /></span></div>
    <label className="field-label">Your dream<textarea className="dream-textarea" value={form.content} onChange={(e) => update('content', e.target.value)} placeholder="Write it before it floats away..." rows="7" /></label>
    <div className="mt-5 flex items-center justify-between rounded-2xl bg-cream px-4 py-3"><div><label htmlFor="lucid" className="font-semibold text-ink">Was it lucid?</label><p className="text-xs text-ink/55">Did you know you were dreaming?</p></div><button type="button" id="lucid" onClick={() => update('is_lucid', !form.is_lucid)} className={`toggle ${form.is_lucid ? 'toggle-on' : ''}`} aria-pressed={form.is_lucid}><span /></button></div>
    <div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="field-label">Dream type<select className="input" value={form.dream_type} onChange={(e) => update('dream_type', e.target.value)}><option>SAMSARIC</option><option>CLARITY</option><option>CLEAR_LIGHT</option></select></label><label className="field-label">Lucidity level <span className="font-normal text-ink/50">(1–5)</span><input className="input" type="number" min="1" max="5" value={form.lucidity_level} onChange={(e) => update('lucidity_level', e.target.value)} /></label></div>
    <div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="field-label">Themes <span className="font-normal text-ink/50">comma separated</span><input className="input" value={form.themes} onChange={(e) => update('themes', e.target.value)} placeholder="flying, water, home" /></label><label className="field-label">Dream signs <span className="font-normal text-ink/50">comma separated</span><input className="input" value={form.dream_signs} onChange={(e) => update('dream_signs', e.target.value)} placeholder="clocks, unusual doors" /></label></div>
    <label className="field-label mt-5">Practice notes <textarea className="input min-h-24 resize-y" value={form.practice_notes} onChange={(e) => update('practice_notes', e.target.value)} placeholder="A tiny intention for your waking life..." rows="3" /></label>
    {status.error && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{status.error}</p>}
    {status.success && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Your dream is tucked safely in the archive ✨</p>}
    <button className="primary-button mt-6 w-full" disabled={status.loading}>{status.loading ? 'Tucking it away…' : <><Sparkles size={18} /> Save this dream</>}</button>
  </form>;
}
