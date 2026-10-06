export const OPS = {
  add: { name: 'Addition', sym: '+' },
  sub: { name: 'Subtraction', sym: '−' },
  mul: { name: 'Multiplication', sym: '×' },
  div: { name: 'Division', sym: '÷' },
  pct: { name: 'Percentage', sym: '%' },
}
export const TIMES = [
  [60, '60 sec'], [120, '120 sec'], [300, '5 min'], [600, '10 min'], [3600, '1 hour'],
]
export const DIFFS = { 1: 'Easy', 2: 'Medium', 3: 'Hard' }

const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const gcd = (a, b) => (b ? gcd(b, a % b) : a)

export function generate(op, d) {
  const add = [0, 20, 100, 1000][d]
  const mul = [0, 9, 12, 25][d]
  if (op === 'add') {
    const a = rnd(add / 4 + 2, add), b = rnd(add / 4 + 2, add)
    return { op, text: `${a} + ${b}`, answer: a + b }
  }
  if (op === 'sub') {
    const a = rnd(add / 2, add), b = rnd(2, a - 1)
    return { op, text: `${a} − ${b}`, answer: a - b }
  }
  if (op === 'mul') {
    const a = rnd(2, mul), b = rnd(2, d === 3 ? 15 : mul)
    return { op, text: `${a} × ${b}`, answer: a * b }
  }
  if (op === 'div') {
    const b = rnd(2, mul), q = rnd(2, d === 3 ? 20 : mul)
    return { op, text: `${b * q} ÷ ${b}`, answer: q }
  }
  const pool = [
    [10, 20, 50],
    [5, 10, 15, 20, 25, 50, 75],
    [5, 8, 12, 15, 18, 25, 35, 40, 45, 60, 75, 90],
  ][d - 1]
  const p = pool[rnd(0, pool.length - 1)]
  const n = (100 / gcd(p, 100)) * rnd(1, [5, 10, 20][d - 1])
  return { op, text: `${p}% of ${n}`, answer: (p * n) / 100 }
}
