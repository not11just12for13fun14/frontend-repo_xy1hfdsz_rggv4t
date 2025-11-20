import { useI18n, LANG_OPTIONS } from '../i18n'
import { useTheme, THEME_OPTIONS } from '../theme'

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex items-center gap-2 text-xs text-slate-300">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        className="rounded-lg bg-white/10 border border-white/15 text-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400/50"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      >
        {options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )
}

export default function TopBar() {
  const { t, lang, setLang } = useI18n()
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 py-3 flex items-center justify-end gap-2">
      <div className="hidden md:flex items-center gap-3">
        <div className="text-xs text-slate-400">{t('language')}</div>
        <Select label={t('language')} value={lang} onChange={setLang} options={LANG_OPTIONS} />
        <div className="text-xs text-slate-400">{t('theme')}</div>
        <Select label={t('theme')} value={theme} onChange={setTheme} options={THEME_OPTIONS} />
      </div>
    </div>
  )
}
