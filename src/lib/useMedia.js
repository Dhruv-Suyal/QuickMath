import { useEffect, useState } from 'react'

export default function useMedia(query) {
  const [match, setMatch] = useState(() => matchMedia(query).matches)
  useEffect(() => {
    const mq = matchMedia(query)
    const fn = (e) => setMatch(e.matches)
    mq.addEventListener('change', fn)
    setMatch(mq.matches)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return match
}
