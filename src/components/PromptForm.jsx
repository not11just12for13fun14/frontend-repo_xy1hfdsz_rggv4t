import { useMemo, useState } from 'react'

const LLM_OPTIONS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4.1', label: 'GPT-4.1' },
  { value: 'claude-3.5', label: 'Claude 3.5' },
  { value: 'gemini-1.5', label: 'Gemini 1.5' },
  { value: 'llama-3.1', label: 'Llama 3.1' },
  { value: 'mistral-large', label: 'Mistral Large' },
]

const SITE_TYPES = ['landing', 'marketing', 'portfolio', 'blog', 'docs', 'saas', 'ecommerce']
const TONES = ['professional', 'friendly', 'playful', 'minimal', 'luxury', 'technical']

function TagInput({ label, value, setValue, placeholder }) {
  const [text, setText] = useState('')

  const addTag = () => {
    if (!text.trim()) return
    setValue([...(value || []), text.trim()])
    setText('')
  }

  const remove = (i) => {
    const next = [...value]
    next.splice(i, 1)
    setValue(next)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-200 mb-2">{label}</label>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
        />
        <button type="button" onClick={addTag} className="px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm">
          Add
        </button>
      </div>
      {value?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs bg-white/10 border border-white/10 text-white px-2 py-1 rounded-full">
              {t}
              <button type="button" onClick={() => remove(i)} className="hover:text-red-300">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function PromptForm({ onResult }) {
  const [loading, setLoading] = useState(false)
  const [llm, setLlm] = useState('gpt-4o')
  const [projectName, setProjectName] = useState('NovaSite')
  const [siteType, setSiteType] = useState('landing')
  const [tone, setTone] = useState('professional')
  const [targetAudience, setTargetAudience] = useState('Founders, PMs, tech-savvy buyers')
  const [brandColors, setBrandColors] = useState('Indigo, purple, gradient accents')
  const [features, setFeatures] = useState(['Hero with Spline animation', 'Pricing tiers', 'FAQ', 'CTA'])
  const [pages, setPages] = useState(['Home', 'Pricing', 'About', 'Contact'])
  const [keywords, setKeywords] = useState(['AI website builder', 'prompt engineering', 'SaaS'])
  const [constraints, setConstraints] = useState('Load under 2s on 3G, mobile-first')
  const [stack, setStack] = useState(['React', 'Tailwind', 'Next.js'])
  const [deliverables, setDeliverables] = useState(["site map","content outline","wireframe description","component list","responsive behavior","SEO meta tags","accessibility checklist"]) 
  const [format, setFormat] = useState('markdown')

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/generate-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          llm,
          project_name: projectName,
          site_type: siteType,
          tone,
          target_audience: targetAudience,
          brand_colors: brandColors,
          features,
          pages,
          seo_keywords: keywords,
          constraints,
          preferred_stack: stack,
          deliverables,
          output_format: format,
        })
      })
      if (!res.ok) throw new Error('Failed to generate prompt')
      const data = await res.json()
      onResult?.(data.prompt)
    } catch (err) {
      onResult?.(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Target LLM</label>
          <select value={llm} onChange={(e) => setLlm(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white">
            {LLM_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Project name</label>
          <input value={projectName} onChange={e=>setProjectName(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Website type</label>
            <select value={siteType} onChange={e=>setSiteType(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white">
              {SITE_TYPES.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Tone</label>
            <select value={tone} onChange={e=>setTone(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white">
              {TONES.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Target audience</label>
          <input value={targetAudience} onChange={e=>setTargetAudience(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Brand colors / theme</label>
          <input value={brandColors} onChange={e=>setBrandColors(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Constraints</label>
          <input value={constraints} onChange={e=>setConstraints(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        <TagInput label="Features" value={features} setValue={setFeatures} placeholder="Add a feature and click Add" />
        <TagInput label="Pages" value={pages} setValue={setPages} placeholder="Add a page and click Add" />
        <TagInput label="SEO Keywords" value={keywords} setValue={setKeywords} placeholder="Add a keyword and click Add" />
        <TagInput label="Preferred Stack" value={stack} setValue={setStack} placeholder="Add a tech and click Add" />
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Deliverables</label>
          <textarea value={deliverables.join('\n')} onChange={e=>setDeliverables(e.target.value.split('\n').filter(Boolean))} rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
          <p className="text-xs text-slate-400 mt-1">One per line</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Output format</label>
          <select value={format} onChange={e=>setFormat(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white">
            <option value="markdown">Markdown</option>
            <option value="plain">Plain text</option>
            <option value="json">JSON</option>
          </select>
        </div>
        <button disabled={loading} className="w-full mt-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 disabled:opacity-60">
          {loading ? 'Generating…' : 'Generate Prompt'}
        </button>
      </div>
    </form>
  )
}

export default PromptForm
