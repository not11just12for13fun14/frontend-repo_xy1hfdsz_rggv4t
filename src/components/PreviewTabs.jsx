import { useMemo } from 'react'
import { useI18n } from '../i18n'

function countTokens(text) {
  if (!text) return 0
  // heurística simples: ~1 token a cada 4 caracteres em inglês; em PT tende a ser similar para estimativa bruta
  return Math.ceil(text.length / 4)
}

export default function PreviewTabs({ value }) {
  const { t } = useI18n()
  const chars = value?.length || 0
  const tokens = useMemo(() => countTokens(value), [value])

  return (
    <div className="mt-3 grid md:grid-cols-3 gap-3">
      <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-3">
        <div className="text-xs text-slate-400 mb-2">{t('text_tab')}</div>
        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">
          {value || '—'}
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
        <div className="text-xs text-slate-400 mb-2">{t('counts')}</div>
        <ul className="text-sm text-slate-200 space-y-1">
          <li><span className="text-slate-400">{t('characters')}:</span> {chars.toLocaleString()}</li>
          <li><span className="text-slate-400">{t('tokens_est')}:</span> {tokens.toLocaleString()}</li>
        </ul>
      </div>
    </div>
  )
}
