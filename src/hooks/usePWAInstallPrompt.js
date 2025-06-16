import { useEffect, useState } from 'react'

export function usePWAInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null)
  useEffect(() => {
    const handler = e => {
      e.preventDefault()
      setPromptEvent(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const promptToInstall = () => {
    if (!promptEvent) return
    promptEvent.prompt()
    setPromptEvent(null)
  }
  return { promptEvent, promptToInstall }
}
