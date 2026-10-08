import { useScroll, useSpring } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

// Winding trail through the icon centers: an S-curve between each pair,
// plus a lead-in from the top and a tail out to the bottom of the list.
// Also returns the trail's start and end points for the scenes there.
const buildTrailPath = (points, height) => {
  if (points.length === 0) return { d: '', start: null, end: null }

  const first = points[0]
  const last = points[points.length - 1]
  const start = { x: points[1]?.x ?? first.x, y: 0 }
  const end = { x: points[points.length - 2]?.x ?? last.x, y: height }

  const curve = (a, b) => {
    const dy = (b.y - a.y) * 0.55
    return `C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`
  }

  const d = [
    `M ${start.x} ${start.y}`,
    ...[start, ...points].slice(0, -1).map((a, i) => curve(a, points[i])),
    curve(last, end)
  ].join(' ')

  return { d, start, end }
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
    end: null
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
        y: icon.offsetParent.offsetTop + icon.offsetTop + icon.offsetHeight / 2
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
