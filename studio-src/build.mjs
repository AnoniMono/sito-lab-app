// Builds Studio for the site in both languages: ../studio/en and ../studio/it.
//   node studio-src/build.mjs          both
//   node studio-src/build.mjs it       one
// Needs the Lab-Companion repo with its node_modules installed (VEYRA_DIR, default below).
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const veyra = path.resolve(process.env.VEYRA_DIR || 'C:/Users/MartinaCesarini/Documents/GitHub/Lab-Companion/Veyra')
const vite = path.join(veyra, 'node_modules/vite/bin/vite.js')
const langs = process.argv.slice(2).length ? process.argv.slice(2) : ['en', 'it']
for (const lang of langs) {
  console.log(`\n== Studio, ${lang} ==`)
  const r = spawnSync(process.execPath, [vite, 'build', '--config', path.join(here, 'vite.config.mjs')], {
    stdio: 'inherit', env: { ...process.env, STUDIO_LANG: lang, VEYRA_DIR: veyra },
  })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
