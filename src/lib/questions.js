export const OPS = {
  add: { name: 'Addition', sym: '+' },
  sub: { name: 'Subtraction', sym: '−' },
  mul: { name: 'Multiplication', sym: '×' },
  div: { name: 'Division', sym: '÷' },
  pct: { name: 'Percentage', sym: '%' },
  sq: { name: 'Square', sym: 'x²' },
  sqrt: { name: 'Square root', sym: '√' },
  cube: { name: 'Cube', sym: 'x³' },
  cbrt: { name: 'Cube root', sym: '∛' },
}
export const TIMES = [
  [60, '60 sec'], [120, '120 sec'], [300, '5 min'], [600, '10 min'], [3600, '1 hour'],
]
export const DIFFS = { 1: 'Easy', 2: 'Medium', 3: 'Hard' }

const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const gcd = (a, b) => (b ? gcd(b, a % b) : a)

export function generate(op, d) {
  const hard = d === 3
  const add = [0, 20, 100, 10000][d]
  const mul = [0, 9, 12, 25][d]

  if (op === 'add') {
    // Hard: each number is randomly 4, 5 or 6 digits
    const rd = () => { const k = rnd(4, 6); return rnd(10 ** (k - 1), 10 ** k - 1) }
    const a = hard ? rd() : rnd(add / 4 + 2, add)
    const b = hard ? rd() : rnd(add / 4 + 2, add)
    return { op, text: `${a} + ${b}`, answer: a + b }
  }
  if (op === 'sub') {
    // Hard: 5-6 digit number minus a 4-6 digit number
    const a = hard ? rnd(10000, 999999) : rnd(add / 2, add)
    const b = hard ? rnd(1000, a - 1) : rnd(2, a - 1)
    return { op, text: `${a} − ${b}`, answer: a - b }
  }
  if (op === 'mul') {
    // Hard: randomly 2-digit × 2-digit, or 3-digit × 2-digit
    let a, b
    if (hard) {
      a = Math.random() < 0.5 ? rnd(21, 99) : rnd(101, 999)
      b = rnd(21, 99)
    } else {
      a = rnd(2, mul); b = rnd(2, mul)
    }
    return { op, text: `${a} × ${b}`, answer: a * b }
  }
  if (op === 'div') {
    // Hard: divisor 12-99, answer 12-999 (dividends up to ~99,000)
    const b = hard ? rnd(12, 99) : rnd(2, mul)
    const q = hard ? rnd(12, 999) : rnd(2, mul)
    return { op, text: `${b * q} ÷ ${b}`, answer: q }
  }
  if (op === 'sq') {
    const a = hard ? rnd(21, 150) : rnd(2, [0, 12, 20][d])
    return { op, text: `${a}²`, answer: a * a }
  }
  if (op === 'sqrt') {
    const a = hard ? rnd(21, 150) : rnd(2, [0, 12, 20][d])
    return { op, text: `√${a * a}`, answer: a }
  }
  if (op === 'cube') {
    const a = hard ? rnd(11, 50) : rnd(2, [0, 5, 10][d])
    return { op, text: `${a}³`, answer: a ** 3 }
  }
  if (op === 'cbrt') {
    const a = hard ? rnd(11, 50) : rnd(2, [0, 5, 10][d])
    return { op, text: `∛${a ** 3}`, answer: a }
  }
  // Percentage
  if (hard) {
    // any percent from 1-99 (except round ones), on large numbers
    let p
    do { p = rnd(1, 99) } while (p % 10 === 0 || p === 50 || p === 25 || p === 75)
    const n = (100 / gcd(p, 100)) * rnd(10, 80)
    return { op, text: `${p}% of ${n}`, answer: (p * n) / 100 }
  }
  const pool = [
    [10, 20, 50],
    [5, 10, 15, 20, 25, 50, 75],
  ][d - 1]
  const p = pool[rnd(0, pool.length - 1)]
  const n = (100 / gcd(p, 100)) * rnd(1, [5, 10][d - 1])
  return { op, text: `${p}% of ${n}`, answer: (p * n) / 100 }
}