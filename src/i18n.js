import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'app.lang'

const DICTS = {
  'pt-BR': {
    app_title: 'Arquiteto de Prompts para Criação de Sites',
    describe_goals: 'Descreva os objetivos do seu site',
    describe_sub: 'Preencha os detalhes e receba um prompt otimizado para o modelo escolhido, pronto para colar no seu LLM favorito.',
    optimized_for: 'Otimizado para',
    generate_prompt: 'Gerar Prompt',
    generating: 'Gerando…',
    add: 'Adicionar',
    features: 'Funcionalidades',
    pages: 'Páginas',
    keywords: 'Palavras-chave de SEO',
    stack: 'Stack preferida',
    deliverables: 'Entregáveis',
    one_per_line: 'Um por linha',
    output_format: 'Formato de saída',
    model: 'Modelo alvo',
    project_name: 'Nome do projeto',
    site_type: 'Tipo de site',
    tone: 'Tom',
    audience: 'Público-alvo',
    brand_colors: 'Cores / tema da marca',
    constraints: 'Restrições',
    generated_prompt: 'Prompt Gerado',
    copy: 'Copiar',
    clear: 'Limpar',
    placeholder_feature: 'Adicione uma funcionalidade e clique em Adicionar',
    placeholder_page: 'Adicione uma página e clique em Adicionar',
    placeholder_keyword: 'Adicione uma palavra-chave e clique em Adicionar',
    placeholder_stack: 'Adicione uma tecnologia e clique em Adicionar',
    text_tab: 'Texto',
    visual_tab: 'Visual',
    counts: 'Contagens',
    characters: 'caracteres',
    tokens_est: 'tokens (estimado)',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Automático',
    language: 'Idioma',
    footer: 'Feito com carinho — Gere uma vez, adapte para diferentes modelos.',
    shortcuts: 'Atalhos',
    shortcut_generate: 'Gerar: Ctrl/Cmd + Enter',
    shortcut_copy: 'Copiar: Ctrl/Cmd + C',
    shortcut_clear: 'Limpar: Esc',
  },
  'pt-PT': {
    app_title: 'Arquiteto de Prompts para Criação de Sites',
    describe_goals: 'Descreva os objetivos do seu site',
    describe_sub: 'Preencha os detalhes e receba um prompt optimizado para o modelo escolhido, pronto para colar no seu LLM favorito.',
    optimized_for: 'Optimizado para',
    generate_prompt: 'Gerar Prompt',
    generating: 'A gerar…',
    add: 'Adicionar',
    features: 'Funcionalidades',
    pages: 'Páginas',
    keywords: 'Palavras‑chave de SEO',
    stack: 'Stack preferida',
    deliverables: 'Entregáveis',
    one_per_line: 'Um por linha',
    output_format: 'Formato de saída',
    model: 'Modelo alvo',
    project_name: 'Nome do projeto',
    site_type: 'Tipo de site',
    tone: 'Tom',
    audience: 'Público‑alvo',
    brand_colors: 'Cores / tema da marca',
    constraints: 'Restrições',
    generated_prompt: 'Prompt Gerado',
    copy: 'Copiar',
    clear: 'Limpar',
    placeholder_feature: 'Adicione uma funcionalidade e clique em Adicionar',
    placeholder_page: 'Adicione uma página e clique em Adicionar',
    placeholder_keyword: 'Adicione uma palavra‑chave e clique em Adicionar',
    placeholder_stack: 'Adicione uma tecnologia e clique em Adicionar',
    text_tab: 'Texto',
    visual_tab: 'Visual',
    counts: 'Contagens',
    characters: 'caracteres',
    tokens_est: 'tokens (estimado)',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Automático',
    language: 'Idioma',
    footer: 'Feito com carinho — Gere uma vez, adapte para diferentes modelos.',
    shortcuts: 'Atalhos',
    shortcut_generate: 'Gerar: Ctrl/Cmd + Enter',
    shortcut_copy: 'Copiar: Ctrl/Cmd + C',
    shortcut_clear: 'Limpar: Esc',
  },
  'en': {
    app_title: 'Prompt Architect for Website Creation',
    describe_goals: 'Describe your website goals',
    describe_sub: 'Fill in the details and get an optimized prompt for your chosen model, ready to paste into your favorite LLM.',
    optimized_for: 'Optimized for',
    generate_prompt: 'Generate Prompt',
    generating: 'Generating…',
    add: 'Add',
    features: 'Features',
    pages: 'Pages',
    keywords: 'SEO keywords',
    stack: 'Preferred stack',
    deliverables: 'Deliverables',
    one_per_line: 'One per line',
    output_format: 'Output format',
    model: 'Target model',
    project_name: 'Project name',
    site_type: 'Site type',
    tone: 'Tone',
    audience: 'Target audience',
    brand_colors: 'Brand colors / theme',
    constraints: 'Constraints',
    generated_prompt: 'Generated Prompt',
    copy: 'Copy',
    clear: 'Clear',
    placeholder_feature: 'Add a feature and click Add',
    placeholder_page: 'Add a page and click Add',
    placeholder_keyword: 'Add a keyword and click Add',
    placeholder_stack: 'Add a technology and click Add',
    text_tab: 'Text',
    visual_tab: 'Visual',
    counts: 'Counts',
    characters: 'characters',
    tokens_est: 'tokens (est.)',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    language: 'Language',
    footer: 'Made with care — Generate once, adapt for different models.',
    shortcuts: 'Shortcuts',
    shortcut_generate: 'Generate: Ctrl/Cmd + Enter',
    shortcut_copy: 'Copy: Ctrl/Cmd + C',
    shortcut_clear: 'Clear: Esc',
  }
}

const I18nContext = createContext({ t: (k) => k, lang: 'pt-BR', setLang: () => {} })

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState('pt-BR')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && DICTS[stored]) setLangState(stored)
  }, [])

  const setLang = (l) => {
    if (!DICTS[l]) return
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }

  const t = useMemo(() => {
    const dict = DICTS[lang] || DICTS['pt-BR']
    return (key) => dict[key] ?? key
  }, [lang])

  const value = useMemo(() => ({ t, lang, setLang }), [t, lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() { return useContext(I18nContext) }

export const LANG_OPTIONS = [
  { value: 'pt-BR', label: 'PT‑BR' },
  { value: 'pt-PT', label: 'PT‑PT' },
  { value: 'en', label: 'EN' },
]
