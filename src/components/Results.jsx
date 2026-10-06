import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Cell,
} from 'recharts'
import { OPS } from '../lib/questions'
import useMedia from '../lib/useMedia'

export default function Results({ log, onAgain, onHome }) {
  const phone = useMedia('(max-width: 560px)')
  const m = useMemo(() => {
    const good = log.filter((l) => l.correct)
    const avg = good.length ? good.reduce((a, l) => a + l.time, 0) / good.length : 0
    const totalMin = Math.max(log.reduce((a, l) => a + l.time, 0) / 60, 0.1)
    const per = Object.keys(OPS).map((k) => {
      const g = good.filter((l) => l.op === k)
      return { name: OPS[k].name, avg: g.length ? +(g.reduce((a, l) => a + l.time, 0) / g.length).toFixed(2) : null, count: g.length }
    }).filter((p) => p.avg !== null)
    const series = log.map((l, i) => ({ n: i + 1, time: +l.time.toFixed(2), correct: l.correct, text: l.text }))
    return {
      good: good.length,
      acc: Math.round((good.length / log.length) * 100),
      avg, fastest: good.length ? Math.min(...good.map((l) => l.time)) : 0,
      pm: good.length / totalMin, per, series,
    }
  }, [log])

  const kpis = [
    ['Correct', m.good], ['Accuracy', m.acc + '%'], ['Avg speed', m.avg.toFixed(1) + 's'],
    ['Fastest', m.fastest.toFixed(1) + 's'], ['Per minute', m.pm.toFixed(1)],
  ]

  return (
    <section className="card screen">
      <h1>{m.acc >= 90 ? 'Sharp work.' : m.acc >= 70 ? 'Solid session.' : 'Keep practicing.'}</h1>
      <div className="kpis">
        {kpis.map(([l, v]) => (
          <div className="kpi" key={l}><small>{l}</small><span className="big">{v}</span></div>
        ))}
      </div>

      <div className="chart">
        <h3>Average speed per operation</h3>
        <p>Seconds per correct answer. Shorter bars are faster.</p>
        <ResponsiveContainer width="100%" height={phone ? Math.max(200, m.per.length * 52 + 30) : 250}>
          <BarChart data={m.per} layout={phone ? 'vertical' : 'horizontal'}
            margin={{ top: 8, right: 16, left: phone ? 0 : -12, bottom: 0 }}>
            <CartesianGrid stroke="var(--line)" vertical={phone} horizontal={!phone} />
            {phone ? (
              <>
                <XAxis type="number" tick={{ fill: 'var(--mute)', fontSize: 11 }} unit="s" />
                <YAxis type="category" dataKey="name" width={96} tick={{ fill: 'var(--mute)', fontSize: 12 }} />
              </>
            ) : (
              <>
                <XAxis dataKey="name" tick={{ fill: 'var(--mute)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--mute)', fontSize: 12 }} unit="s" />
              </>
            )}
            <Tooltip formatter={(v, _, p) => [`${v}s (${p.payload.count} answers)`, 'Avg']} />
            <Bar dataKey="avg" radius={phone ? [0, 10, 10, 0] : [10, 10, 0, 0]} animationDuration={1100}>
              {m.per.map((_, i) => <Cell key={i} fill="var(--blue)" />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart">
        <h3>Time per question</h3>
        <p>Each dot is one question. Green is correct, red is skipped.</p>
        <ResponsiveContainer width="100%" height={phone ? 220 : 260}>
          <LineChart data={m.series} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="var(--line)" vertical={false} />
            <XAxis dataKey="n" tick={{ fill: 'var(--mute)', fontSize: 12 }} minTickGap={phone ? 24 : 12} />
            <YAxis tick={{ fill: 'var(--mute)', fontSize: 12 }} unit="s" />
            <Tooltip formatter={(v, _, p) => [`${v}s`, p.payload.text]} labelFormatter={(n) => `Question ${n}`} />
            <Line dataKey="time" stroke="var(--blue)" strokeWidth={2.5} animationDuration={1400}
              dot={({ cx, cy, payload, index }) => (
                <circle key={index} cx={cx} cy={cy} r={4.5} fill={payload.correct ? 'var(--green)' : 'var(--coral)'} />
              )} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="acts">
        <button className="go" onClick={onAgain}>Play again</button>
        <button className="go alt" onClick={onHome}>Change settings</button>
      </div>
    </section>
  )
}
