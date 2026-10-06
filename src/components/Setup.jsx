import { OPS, TIMES, DIFFS } from '../lib/questions'

const Chip = ({ on, onClick, children }) => (
  <button className={'chip' + (on ? ' on' : '')} onClick={onClick}>{children}</button>
)

export default function Setup({ cfg, setCfg, history, onStart }) {
  const toggleOp = (k) => setCfg((c) => {
    if (c.ops.includes(k)) return c.ops.length > 1 ? { ...c, ops: c.ops.filter((o) => o !== k) } : c
    return { ...c, ops: [...c.ops, k] }
  })
  return (
    <section className="card screen">
      <h1>Think fast.<br />Count faster.</h1>
      <p className="sub">Type the answer and the next question appears the moment you get it right. No Enter key needed.</p>

      <div className="lbl">Operations</div>
      <div className="chips">
        {Object.entries(OPS).map(([k, v]) => (
          <Chip key={k} on={cfg.ops.includes(k)} onClick={() => toggleOp(k)}><b>{v.sym}</b>{v.name}</Chip>
        ))}
      </div>

      <div className="lbl">Difficulty</div>
      <div className="chips">
        {Object.entries(DIFFS).map(([k, v]) => (
          <Chip key={k} on={cfg.diff === +k} onClick={() => setCfg({ ...cfg, diff: +k })}>{v}</Chip>
        ))}
      </div>

      <div className="lbl">Timer</div>
      <div className="chips">
        {TIMES.map(([s, l]) => (
          <Chip key={s} on={cfg.time === s} onClick={() => setCfg({ ...cfg, time: s })}>{l}</Chip>
        ))}
      </div>

      <button className="go" onClick={onStart}>Start session</button>

      {history.length > 0 && (
        <>
          <div className="lbl">Recent sessions</div>
          <div className="hist">
            {history.map((h, i) => (
              <div className="hr" key={i}>
                <span>{h.date} · {TIMES.find((t) => t[0] === h.seconds)?.[1]}</span>
                <span>{h.correct} correct · {h.accuracy}% · {h.avg}s avg</span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
