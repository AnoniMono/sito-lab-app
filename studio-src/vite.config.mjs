// Builds Veyra Studio's renderer for the web, from the Lab-Companion repo's own source, in one language.
//   STUDIO_LANG=it  the app exactly as written (Italian), into ../studio/it
//   STUDIO_LANG=en  the same app with every visible string in English, into ../studio/en (the default)
// Run both with:  node studio-src/build.mjs   (see README.md)
//
// The Lab-Companion source is never edited. For English, whole files are swapped for an English copy (the
// tutorials and the sample procedures: loaded under the original's id, so their relative imports still
// resolve), and the interface strings of the other files are replaced at build time from i18n/ui.en.mjs.
// A replacement that no longer matches stops the build, so a change in the source cannot slip through
// half-translated.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const lang = process.env.STUDIO_LANG === 'it' ? 'it' : 'en'
const veyra = path.resolve(process.env.VEYRA_DIR || 'C:/Users/MartinaCesarini/Documents/GitHub/Lab-Companion/Veyra')
const mods = path.join(veyra, 'node_modules')
const { default: react } = await import(pathToFileURL(path.join(mods, '@vitejs/plugin-react/dist/index.js')).href)

const swapped = {
  'src/renderer/tourSteps.ts': 'i18n/tourSteps.en.ts',
  'src/renderer/guidedSteps.ts': 'i18n/guidedSteps.en.ts',
  'src/shared/example.ts': 'i18n/example.en.ts',
  'src/shared/guided.ts': 'i18n/guided.en.ts',
}
const { UI } = await import(pathToFileURL(path.join(here, 'i18n/ui.en.mjs')).href)
const norm = (id) => id.split('?')[0].replace(/\\/g, '/')

const english = {
  name: 'english',
  enforce: 'pre',
  load(id) {
    const file = norm(id)
    for (const [orig, en] of Object.entries(swapped))
      if (file.endsWith(orig)) return fs.readFileSync(path.join(here, en), 'utf8')
  },
  transform(code, id) {
    const file = norm(id)
    if (file.endsWith('/web-main.tsx') || file.endsWith('/mock-studio.ts')) return code.replaceAll('__STUDIO_LANG__', 'en')
    const key = Object.keys(UI).find((k) => file.endsWith(k))
    if (!key) return
    code = code.replace(/\r\n/g, '\n') // the source is checked out with CRLF; the pairs are written with LF
    for (const [from, to] of UI[key]) {
      if (!code.includes(from)) this.error(`${key} no longer contains ${JSON.stringify(from)}: update studio-src/i18n/ui.en.mjs`)
      code = code.split(from).join(to)
    }
    return code
  },
  transformIndexHtml: (html) => html.replace('<html lang="it">', '<html lang="en">'),
}

// Italian is the app as written, except the tutorials' last words: they point at library buttons the web demo
// hides, so they point at the page's restart button instead
const IT_DEMO = {
  'src/renderer/tourSteps.ts': [
    ['Questa procedura resta sempre nella libreria: smontala pure, non si può cancellare per sbaglio e «Ripristina l’esempio» la rimette com’era. Per rifare il giro: «Rivedi il tutorial».',
      'Smonta pure questa procedura: qui non si salva nulla, e il tasto ↺ sopra questa finestra la rimette com’era e fa ripartire il giro.'],
  ],
  'src/renderer/guidedSteps.ts': [
    ['Puoi continuarla, o ricominciare dalla libreria con «Ricomincia». La prossima falla da zero con «Nuova procedura».',
      'Puoi continuarla, o ricominciare con il tasto ↺ sopra questa finestra.'],
  ],
}

const italian = {
  name: 'italian',
  enforce: 'pre',
  transform(code, id) {
    const file = norm(id)
    if (file.endsWith('/web-main.tsx') || file.endsWith('/mock-studio.ts')) return code.replaceAll('__STUDIO_LANG__', 'it')
    const key = Object.keys(IT_DEMO).find((k) => file.endsWith(k))
    if (!key) return
    code = code.replace(/\r\n/g, '\n')
    for (const [from, to] of IT_DEMO[key]) {
      if (!code.includes(from)) this.error(`${key} no longer contains ${JSON.stringify(from.slice(0, 60))}: update studio-src/vite.config.mjs`)
      code = code.split(from).join(to)
    }
    return code
  },
  transformIndexHtml: (html) => html.replace('Opening the tutorial…', 'Apertura del tutorial…'),
}

export default {
  root: here,
  base: './',
  plugins: [lang === 'en' ? english : italian, react()],
  resolve: {
    alias: [
      { find: '@shared', replacement: path.join(veyra, 'src/shared') },
      { find: '@renderer', replacement: path.join(veyra, 'src/renderer') },
      { find: /^react-dom\/(.*)$/, replacement: path.join(mods, 'react-dom') + '/$1' },
      { find: /^react-dom$/, replacement: path.join(mods, 'react-dom') },
      { find: /^react\/(.*)$/, replacement: path.join(mods, 'react') + '/$1' },
      { find: /^react$/, replacement: path.join(mods, 'react') },
    ],
  },
  build: {
    outDir: path.resolve(here, '../studio', lang),
    emptyOutDir: true,
    target: 'es2022',
    minify: process.env.DEBUG ? false : 'esbuild',
  },
}
