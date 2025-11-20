import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center">
      {/* Spline animation background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient veil for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/80 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-3 py-1 text-xs md:text-sm border border-white/20 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          AI Prompt Architect for Website Creation
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white">
          Generate expert prompts tailored to your LLM
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-200">
          Craft precise, implementation-ready instructions for landing pages, SaaS apps, portfolios and more.
          Optimized styles for GPT, Claude, Gemini, Llama and Mistral.
        </p>
      </div>
    </section>
  )
}

export default Hero
