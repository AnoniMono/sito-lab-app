/* Browser entry for Veyra Studio: the real renderer (App + styles) over an in-memory bridge.
   ?open=example starts the walk-through tour, ?open=guided the build-along tutorial;
   both are reached by clicking through the app's own UI, exactly as a user would. */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { mockStudio } from './mock-studio'
import { exampleProtocol } from '@shared/example'
import { guidedProtocol } from '@shared/guided'
;(window as unknown as { studio: unknown }).studio = mockStudio

const { App } = await import('@renderer/App')
await import('@renderer/styles.css')

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const want = new URLSearchParams(location.search).get('open')
const target = want === 'guided' ? guidedProtocol : want === 'example' ? exampleProtocol : null
const name = target?.name ?? null
const folderName = target?.category ?? ''

// The portfolio shows the two tutorials and nothing else: once a procedure is open the way
// out of it (sidebar, back arrow, "Cartella") is hidden, and anything that still closes the
// editor brings the same procedure straight back.
const boot = document.getElementById('boot')!
const cover = (on: boolean) => {
  boot.style.display = 'grid'
  boot.style.pointerEvents = on ? 'auto' : 'none'
  requestAnimationFrame(() => { boot.style.opacity = on ? '1' : '0' })
}

if (name) {
  document.documentElement.classList.add('tutorial-lock')
  const lock = document.createElement('style')
  lock.textContent = `
    .tutorial-lock nav.sidebar,
    .tutorial-lock .editor-back,
    .tutorial-lock button[title="Apri la cartella della procedura"],
    .tutorial-lock button[title="Open the procedure's folder"] { display: none !important; }`
  document.head.appendChild(lock)
  // a real click that still reaches an exit does nothing; the scripted clicks below are untrusted and pass
  addEventListener('click', (e) => {
    const el = e.target as Element | null
    if (e.isTrusted && el?.closest('nav.sidebar, .editor-back, .titlebar')) { e.preventDefault(); e.stopImmediatePropagation() }
  }, true)

  let opening = false
  const open = () => {
    opening = true
    const until = Date.now() + 8000
    const step = () => {
      if (document.querySelector('.editor-frame') && document.querySelector('.tour-card, .guided-panel, .editor-head')) {
        opening = false
        return setTimeout(() => cover(false), 60)
      }
      if (Date.now() > until) { opening = false; return cover(false) }
      const card = [...document.querySelectorAll<HTMLButtonElement>('.proc-open')].find((b) => b.textContent?.includes(name))
      if (card) card.click()
      else {
        const folder = [...document.querySelectorAll<HTMLElement>('.folder-slot .folder-card')].find((b) => b.textContent?.includes(folderName))
        if (folder) folder.click()
        else {
          const procedures = document.querySelectorAll<HTMLButtonElement>('.side-link')[1]
          if (procedures && !procedures.classList.contains('is-active')) procedures.click()
        }
      }
      setTimeout(step, 120)
    }
    setTimeout(step, 150)
  }
  open()

  // watchdog: if the editor goes away (a shortcut, a dialog), cover and reopen the same procedure
  new MutationObserver(() => {
    if (!opening && !document.querySelector('.editor-frame')) { cover(true); open() }
  }).observe(document.getElementById('root')!, { childList: true, subtree: true })
}
