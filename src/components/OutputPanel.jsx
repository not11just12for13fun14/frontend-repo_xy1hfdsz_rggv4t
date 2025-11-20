import { forwardRef, useEffect, useState } from 'react'
import { useI18n } from '../i18n'

const OutputPanel = forwardRef(function OutputPanel({ initial = '' }, ref) {
  const [value, setValue] = useState(initial)
  const { t } = useI18n()

  useEffect(() => {
    setValue(initial)
  }, [initial])

  return (
    <div>
      <label htmlFor="prompt-output" className="sr-only">{t('generated_prompt')}</label>
      <textarea
        id="prompt-output"
        ref={ref}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        rows={16}
        className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 border border-white/10 rounded-lg p-3 font-mono text-sm"
        placeholder="Seu prompt aparecerá aqui..."
        spellCheck
      />
    </div>
  )
})

export default OutputPanel
