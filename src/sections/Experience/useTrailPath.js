import { useScroll, useSpring } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

// How far above a side entry's icon its side trail leaves the main trail
const BRANCH_RISE = 48

// S-curve control points between two trail points
const controls = (a, b) => {
  const dy = (b.y - a.y) * 0.55
  return [
    { x: a.x, y: a.y + dy },
    { x: b.x, y: b.y - dy }
  ]
}

const curve = (a, b) => {
  const [c1, c2] = controls(a, b)
  return `C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`
}

const lerp = (p, q, t) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t })

// Splits the S-curve from a to b where it reaches height y, returning that
// point and the curve command for the part before it. y rises steadily
// along these curves, so bisecting on t finds the split.
const splitAtY = (a, b, y) => {
  const [c1, c2] = controls(a, b)
  const at = (t, k) =>
    (1 - t) ** 3 * a[k] +
    3 * (1 - t) ** 2 * t * c1[k] +
    3 * (1 - t) * t ** 2 * c2[k] +
    t ** 3 * b[k]

  let lo = 0
  let hi = 1
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2
    if (at(mid, 'y') < y) lo = mid
    else hi = mid
  }

  // de Casteljau: control points of the curve's first part, up to t
  const t = lo
  const p01 = lerp(a, c1, t)
  const p12 = lerp(c1, c2, t)
  const p012 = lerp(p01, p12, t)
  const point = { x: at(t, 'x'), y: at(t, 'y') }
  return {
    point,
    before: `C ${p01.x} ${p01.y}, ${p012.x} ${p012.y}, ${point.x} ${point.y}`
  }
}

// Winding trail through the main entries' icon centers: an S-curve between
// each pair, plus a lead-in from the top and a tail out to the bottom of
// the list. Side entries (branch) get their own short trail that leaves
// the main trail just above them, plus `leadD`: the main trail up to that
// fork, so the side trail can start drawing when the main one gets there.
// Also returns the trail's start and end points for the scenes there.
const buildTrailPath = (points, height) => {
  const main = points.filter((p) => !p.branch)
  if (main.length === 0)
    return { d: '', start: null, end: null, branches: [] }

  const first = main[0]
  const last = main[main.length - 1]
  const start = { x: main[1]?.x ?? first.x, y: 0 }
  const end = { x: main[main.length - 2]?.x ?? last.x, y: height }
  const route = [start, ...main, end]

  const segments = route.slice(1).map((b, i) => curve(route[i], b))
  const d = [`M ${start.x} ${start.y}`, ...segments].join(' ')

  const branches = points
    .filter((p) => p.branch)
    .map((p) => {
      const y = Math.max(p.y - BRANCH_RISE, 0)
      const i = route.findIndex((b, j) => j > 0 && b.y >= y)
      const { point: fork, before } = splitAtY(route[i - 1], route[i], y)
      return {
        d: `M ${fork.x} ${fork.y} ${curve(fork, p)}`,
        leadD: [`M ${start.x} ${start.y}`, ...segments.slice(0, i - 1), before].join(' ')
      }
    })

  return { d, start, end, branches }
}

// Measures the timeline icons and returns the trail path through them,
// plus a spring-smoothed scroll progress for drawing it
export const useTrailPath = () => {
  const listRef = useRef(null)
  const iconRefs = useRef([])
  const [trail, setTrail] = useState({
    width: 0,
    height: 0,
    d: '',
    start: null,
    end: null,
    branches: []
  })

  // Re-measure icon positions whenever the list resizes (expanding cards,
  // window resizes). offset* ignores transforms, so entrance animations
  // don't skew the measurement.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      const points = iconRefs.current.filter(Boolean).map((icon) => ({
        x:
          icon.offsetParent.offsetLeft + icon.offsetLeft + icon.offsetWidth / 2,
        y: icon.offsetParent.offsetTop + icon.offsetTop + icon.offsetHeight / 2,
        branch: icon.dataset.branch === 'true'
      }))
      setTrail({
        width: list.offsetWidth,
        height: list.offsetHeight,
        ...buildTrailPath(points, list.offsetHeight)
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  // Draw the timeline line as the list scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 80%', 'end 60%']
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30
  })

  const registerIcon = (index) => (el) => {
    iconRefs.current[index] = el
  }

  return { listRef, registerIcon, trail, progress }
}
