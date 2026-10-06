import { useEffect, useState } from 'react'
import Setup from './components/Setup'
import Play from './components/Play'
import Results from './components/Results'

const DEFAULT = { ops: ['add', 'sub', 'mul', 'div', 'pct'], diff: 2, time: 60 }

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [cfg, setCfg] = useState(() => load('qm_cfg', DEFAULT))
  const [log, setLog] = useState([])
  const [history, setHistory] = useState(() => load('qm_hist', []))
  const [dark, setDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => { try { localStorage.setItem('qm_cfg', JSON.stringify(cfg)) } catch {} }, [cfg])

  const finish = (entries) => {
    if (!entries.length) return setScreen('setup')
    const good = entries.filter((e) => e.correct)
    const avg = good.length ? good.reduce((a, e) => a + e.time, 0) / good.length : 0
    const next = [{
      date: new Date().toLocaleDateString(), correct: good.length,
      accuracy: Math.round((good.length / entries.length) * 100),
      avg: avg.toFixed(1), seconds: cfg.time,
    }, ...history].slice(0, 5)
    setHistory(next)
    try { localStorage.setItem('qm_hist', JSON.stringify(next)) } catch {}
    setLog(entries)
    setScreen('result')
  }

  return (
    <div className="wrap">
      <header>
        <div className="logo"><i>∑</i>QuickMath</div>
        <button className="th" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">◐</button>
      </header>
      {screen === 'setup' && <Setup cfg={cfg} setCfg={setCfg} history={history} onStart={() => setScreen('play')} />}
      {screen === 'play' && <Play cfg={cfg} onFinish={finish} />}
      {screen === 'result' && (
        <Results log={log} onAgain={() => setScreen('play')} onHome={() => setScreen('setup')} />
      )}
    </div>
  )
}
