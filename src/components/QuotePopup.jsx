import { useEffect, useRef } from 'react'

export default function QuotePopup({ text, tone = 'blue', onClose, ms = 4000 }) {
  const cb = useRef(onClose)
  cb.current = onClose

  useEffect(() => {
    if (!text) return
    const t = setTimeout(() => cb.current(), ms)
    return () => clearTimeout(t)
  }, [text, ms])

  if (!text) return null
  return (
    <div className="qp-wrap">
      <div className={'qp ' + tone} key={text} role="alert" onClick={() => cb.current()}>
        <div className="qp-text">{text}</div>
        <div className="qp-bar"><i style={{ animationDuration: ms + 'ms' }} /></div>
      </div>
    </div>
  )
}