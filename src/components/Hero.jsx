import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center">
      {/* Fundo animado com Spline */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Véu de gradiente para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/80 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-3 py-1 text-xs md:text-sm border border-white/20 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          Arquiteto de Prompts para Criação de Sites
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white">
          Gere prompts especializados para o seu LLM
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-200">
          Instruções precisas e prontas para implementação de landing pages, SaaS, portfólios e mais.
          Estilos otimizados para GPT, Claude, Gemini, Llama e Mistral.
        </p>
      </div>
    </section>
  )
}

export default Hero
