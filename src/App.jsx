import { useState } from 'react'
import Hero from './components/Hero'
import PromptForm from './components/PromptForm'
import OutputPanel from './components/OutputPanel'

function App() {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <section className="-mt-24 md:-mt-28 bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Descreva os objetivos do seu site</h2>
              <p className="text-slate-300 mt-2">Preencha os detalhes e receba um prompt otimizado para o modelo escolhido, pronto para colar no seu LLM favorito.</p>
            </div>
            <div className="flex items-center justify-end gap-2 hidden md:flex">
              <div className="text-xs text-slate-400">Otimizado para</div>
              <div className="flex gap-2 text-xs">
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
          <OutputPanel initial={prompt} />
        </section>

        <footer className="mt-10 text-center text-slate-400 text-sm">
          Feito com carinho — Gere uma vez, adapte para diferentes modelos.
        </footer>
      </main>
    </div>
  )
}

export default App
