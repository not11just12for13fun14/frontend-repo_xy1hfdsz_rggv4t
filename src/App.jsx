import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import PromptForm from './components/PromptForm'
import OutputPanel from './components/OutputPanel'
import PreviewTabs from './components/PreviewTabs'
import TopBar from './components/TopBar'
import ShortcutsHint from './components/ShortcutsHint'
import A11yAnnouncer from './components/A11yAnnouncer'
import { I18nProvider, useI18n } from './i18n'
import { ThemeProvider } from './theme'

function AppInner() {
  const [prompt, setPrompt] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const textareaRef = useRef(null)
  const { t } = useI18n()

  useEffect(() => {
    const onKey = (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const cmd = isMac ? e.metaKey : e.ctrlKey
      if (cmd && e.key === 'Enter') {
        const btn = document.querySelector('button[data-action="generate"]')
        btn?.click()
        setStatusMsg(t('generate_prompt'))
      }
      if (cmd && (e.key.toLowerCase() === 'c')) {
        if (textareaRef.current) {
          navigator.clipboard.writeText(textareaRef.current.value)
          setStatusMsg(t('copy'))
        }
      }
      if (e.key === 'Escape') {
        if (textareaRef.current) {
          textareaRef.current.value = ''
          setPrompt('')
          setStatusMsg(t('clear'))
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [t])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <TopBar />
      <Hero />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <section className="-mt-24 md:-mt-28 bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">{t('describe_goals')}</h2>
              <p className="text-slate-300 mt-2">{t('describe_sub')}</p>
            </div>
            <div className="flex items-center justify-end gap-2 hidden md:flex" aria-label={t('optimized_for')}>
              <div className="text-xs text-slate-400">{t('optimized_for')}</div>
              <div className="flex gap-2 text-xs" role="list">
                <span className="px-2 py-1 rounded bg-white/10">GPT</span>
                <span className="px-2 py-1 rounded bg-white/10">Claude</span>
                <span className="px-2 py-1 rounded bg-white/10">Gemini</span>
                <span className="px-2 py-1 rounded bg-white/10">Llama</span>
                <span className="px-2 py-1 rounded bg-white/10">Mistral</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <PromptForm onResult={setPrompt} />
          </div>
        </section>

        <section className="mt-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-200 font-semibold">{t('generated_prompt')}</h3>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => { navigator.clipboard.writeText(prompt); setStatusMsg(t('copy')) }}
                  className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                >{t('copy')}</button>
                <button
                  onClick={() => { setPrompt(''); setStatusMsg(t('clear')) }}
                  className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                >{t('clear')}</button>
              </div>
            </div>
            <OutputPanel initial={prompt} ref={textareaRef} />
            <PreviewTabs value={prompt} />
            <ShortcutsHint />
          </div>
        </section>

        <footer className="mt-10 text-center text-slate-400 text-sm">
          {t('footer')}
        </footer>
      </main>

      <A11yAnnouncer message={statusMsg} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppInner />
      </I18nProvider>
    </ThemeProvider>
  )
}
