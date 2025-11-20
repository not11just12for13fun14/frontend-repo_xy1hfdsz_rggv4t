import { useEffect, useRef } from 'react'

// Live region para leitores de tela
export default function A11yAnnouncer({ message }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = message || ''
    }
  }, [message])

  return (
    <div
      ref={ref}
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  )
}
