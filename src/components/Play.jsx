import { useEffect, useRef, useState } from 'react'
import { generate } from '../lib/questions'

const R = 46
const CIRC = 2 * Math.PI * R
const pick = (cfg) => generate(cfg.ops[Math.floor(Math.random() * cfg.ops.length)], cfg.diff)

function fmt(s) {
  s = Math.max(0, Math.ceil(s))
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60
  return (h ? `${h}:${String(m).padStart(2, '0')}` : m) + ':' + String(r).padStart(2, '0')
}

export default function Play({ cfg, onFinish }) {
  const total = cfg.time * 1000
  const [q, setQ] = useState(() => pick(cfg))
  const [qKey, setQKey] = useState(0)
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')      // '', 'ok', 'bad'
  const [left, setLeft] = useState(total)
  const [stats, setStats] = useState({ correct: 0, streak: 0, sum: 0 })

  const log = useRef([])
  const t0 = useRef(performance.now())
  const attempts = useRef(0)
  const endAt = useRef(performance.now() + total)
  const input = useRef(null)
  const done = useRef(false)

  const finish = () => {
    if (done.current) return
    done.current = true
    onFinish(log.current)
  }

  // countdown
  useEffect(() => {
    let raf
    const loop = () => {
      const l = endAt.current - performance.now()
      setLeft(l)
      if (l <= 0) return finish()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line
  }, [])

  useEffect(() => { input.current?.focus() }, [qKey])

  const record = (correct) => {
    const time = (performance.now() - t0.current) / 1000
    log.current.push({ op: q.op, text: q.text, correct, time, attempts: attempts.current + (correct ? 1 : 0) })
    setStats((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      streak: correct ? s.streak + 1 : 0,
      sum: s.sum + (correct ? time : 0),
    }))
  }

  const nextQuestion = () => {
    setQ(pick(cfg)); setQKey((k) => k + 1); setValue(''); setStatus('')
    attempts.current = 0; t0.current = performance.now()
  }

  const wrong = () => {
    attempts.current += 1
    setStatus('bad')
    setTimeout(() => { setStatus(''); setValue('') }, 280)
  }

  // Auto-advance as soon as the typed value matches the answer
  const onChange = (e) => {
    if (status) return
    const v = e.target.value.replace(/[^0-9.\-]/g, '')
    setValue(v)
    if (v === '') return
    if (Number(v) === q.answer && v !== '-' && !v.endsWith('.')) {
      setStatus('ok'); record(true)
      setTimeout(nextQuestion, 160)
    } else if (v.length >= String(q.answer).length && v.replace('-', '').length >= String(q.answer).length) {
      wrong()
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && value && !status) wrong()
    if (e.key === 'Tab') { e.preventDefault(); skip() }
  }

  const skip = () => { if (status) return; record(false); nextQuestion() }

  return (
    <section className="card screen">
      <div className="top">
        <div className="ring">
          <svg width="104" height="104" viewBox="0 0 104 104">
            <circle cx="52" cy="52" r={R} fill="none" stroke="var(--line)" strokeWidth="8" />
            <circle cx="52" cy="52" r={R} fill="none" strokeWidth="8" strokeLinecap="round"
              stroke={left / total < 0.15 ? 'var(--coral)' : 'var(--blue)'}
              strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - left / total)} />
          </svg>
          <div className="t">{fmt(left / 1000)}</div>
        </div>
        <div className="pills">
          <div className="pill"><small>Correct</small><b>{stats.correct}</b></div>
          <div className="pill"><small>Streak</small><b>{stats.streak}</b></div>
          <div className="pill"><small>Avg speed</small><b>{stats.correct ? (stats.sum / stats.correct).toFixed(1) + 's' : '–'}</b></div>
        </div>
      </div>

      <div className="q"><div className="big" key={qKey}>{q.text}</div></div>

      <div className="ansrow">
        <input ref={input} className={status} value={value} onChange={onChange} onKeyDown={onKey}
          inputMode="numeric" enterKeyHint="done" autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="?" aria-label="Your answer" />
        <button className="sm" onClick={skip}>Skip</button>
      </div>
      <div className="hint">Type the answer. It submits itself when correct.</div>
      <button className="end" onClick={finish}>End session early</button>
    </section>
  )
}