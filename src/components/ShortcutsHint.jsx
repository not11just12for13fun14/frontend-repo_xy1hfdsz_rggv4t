import { useI18n } from '../i18n'

export default function ShortcutsHint() {
  const { t } = useI18n()
  return (
    <div className="mt-4 text-xs text-slate-400 grid gap-1">
      <div className="font-semibold">{t('shortcuts')}</div>
      <div>{t('shortcut_generate')}</div>
      <div>{t('shortcut_copy')}</div>
      <div>{t('shortcut_clear')}</div>
    </div>
  )
}
