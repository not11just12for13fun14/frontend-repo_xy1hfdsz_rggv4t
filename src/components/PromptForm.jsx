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
          Adicionar
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
  const [targetAudience, setTargetAudience] = useState('Fundadores, PMs, compradores técnicos')
  const [brandColors, setBrandColors] = useState('Índigo, roxo, degradês')
  const [features, setFeatures] = useState(['Hero com animação Spline', 'Planos de preço', 'FAQ', 'CTA'])
  const [pages, setPages] = useState(['Início', 'Preços', 'Sobre', 'Contato'])
  const [keywords, setKeywords] = useState(['construtor de sites com IA', 'engenharia de prompt', 'SaaS'])
  const [constraints, setConstraints] = useState('Carregar em menos de 2s no 3G, mobile-first')
  const [stack, setStack] = useState(['React', 'Tailwind', 'Next.js'])
  const [deliverables, setDeliverables] = useState(["mapa do site","roteiro de conteúdo","descrição de wireframe","lista de componentes","comportamento responsivo","metas de SEO","checklist de acessibilidade"]) 
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
      if (!res.ok) throw new Error('Falha ao gerar o prompt')
      const data = await res.json()
      onResult?.(data.prompt)
    } catch (err) {
      onResult?.(`Erro: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Modelo alvo</label>
          <select value={llm} onChange={(e) => setLlm(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white">
            {LLM_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Nome do projeto</label>
          <input value={projectName} onChange={e=>setProjectName(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Tipo de site</label>
            <select value={siteType} onChange={e=>setSiteType(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white">
              {SITE_TYPES.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Tom</label>
            <select value={tone} onChange={e=>setTone(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white">
              {TONES.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Público-alvo</label>
          <input value={targetAudience} onChange={e=>setTargetAudience(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Cores / tema da marca</label>
          <input value={brandColors} onChange={e=>setBrandColors(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Restrições</label>
          <input value={constraints} onChange={e=>setConstraints(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        <TagInput label="Funcionalidades" value={features} setValue={setFeatures} placeholder="Adicione uma funcionalidade e clique em Adicionar" />
        <TagInput label="Páginas" value={pages} setValue={setPages} placeholder="Adicione uma página e clique em Adicionar" />
        <TagInput label="Palavras-chave de SEO" value={keywords} setValue={setKeywords} placeholder="Adicione uma palavra-chave e clique em Adicionar" />
        <TagInput label="Stack preferida" value={stack} setValue={setStack} placeholder="Adicione uma tecnologia e clique em Adicionar" />
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Entregáveis</label>
          <textarea value={deliverables.join('\n')} onChange={e=>setDeliverables(e.target.value.split('\n').filter(Boolean))} rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white" />
          <p className="text-xs text-slate-400 mt-1">Um por linha</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">Formato de saída</label>
          <select value={format} onChange={e=>setFormat(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white">
            <option value="markdown">Markdown</option>
            <option value="plain">Texto simples</option>
            <option value="json">JSON</option>
          </select>
        </div>
        <button disabled={loading} className="w-full mt-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 disabled:opacity-60">
          {loading ? 'Gerando…' : 'Gerar Prompt'}
        </button>
      </div>
    </form>
  )
}

export default PromptForm
