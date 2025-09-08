import { useEffect, useState } from 'react'
import styled from 'styled-components'

// Only show in development mode
const isDev = import.meta.env.DEV

const PerformanceMonitor = () => {
  const [stats, setStats] = useState({
    fps: 0,
    memory: 0,
    networkRequests: 0
  })

  useEffect(() => {
    if (!isDev) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId

    // Count network requests
    const originalFetch = window.fetch
    let requestCount = 0

    window.fetch = function (...args) {
      requestCount++
      setStats((prev) => ({ ...prev, networkRequests: requestCount }))
      return originalFetch.apply(this, args)
    }

    const updateStats = () => {
      const now = performance.now()
      const elapsed = now - lastTime

      // Only update every second
      if (elapsed > 1000) {
        // Calculate FPS
        const fps = Math.round((frameCount * 1000) / elapsed)

        // Get memory usage if available
        let memory = 0
        if (window.performance && window.performance.memory) {
          memory = Math.round(
            window.performance.memory.usedJSHeapSize / (1024 * 1024)
          )
        }

        setStats((prev) => ({
          ...prev,
          fps,
          memory
        }))

        frameCount = 0
        lastTime = now
      }

      frameCount++
      animationFrameId = requestAnimationFrame(updateStats)
    }

    animationFrameId = requestAnimationFrame(updateStats)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.fetch = originalFetch
    }
  }, [])

  // Only show in development mode
  if (!isDev) return null

  return (
    <MonitorContainer>
      <MonitorItem>
        <Label>FPS:</Label>
        <Value className={stats.fps < 30 ? 'warning' : ''}>{stats.fps}</Value>
      </MonitorItem>

      {stats.memory > 0 && (
        <MonitorItem>
          <Label>Memory:</Label>
          <Value className={stats.memory > 100 ? 'warning' : ''}>
            {stats.memory} MB
          </Value>
        </MonitorItem>
      )}

      <MonitorItem>
        <Label>Requests:</Label>
        <Value>{stats.networkRequests}</Value>
      </MonitorItem>
    </MonitorContainer>
  )
}

const MonitorContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  z-index: 9999;
`

const MonitorItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.span`
  margin-right: 8px;
`

const Value = styled.span`
  &.warning {
    color: #ff5050;
  }
`

export default PerformanceMonitor
