import { useState } from 'react'

function OutputPanel({ initial = '' }) {
  const [value, setValue] = useState(initial)

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-slate-200 font-semibold">Generated Prompt</h3>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => navigator.clipboard.writeText(value)}
            className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
          >Copy</button>
          <button
            onClick={() => setValue('')}
            className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
          >Clear</button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        rows={16}
        className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 border border-white/10 rounded-lg p-3 font-mono text-sm"
        placeholder="Your prompt will appear here..."
      />
    </div>
  )
}

export default OutputPanel
