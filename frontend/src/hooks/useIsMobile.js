import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < breakpoint : false)
  useEffect(() => {
    function onResize() { setIsMobile(window.innerWidth < breakpoint) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return isMobile
}
