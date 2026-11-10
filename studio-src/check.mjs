// Lists every pair in i18n/ui.en.mjs that no longer matches the Lab-Companion source (the build stops at the first).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
const here = path.dirname(fileURLToPath(import.meta.url))
const veyra = path.resolve(process.env.VEYRA_DIR || 'C:/Users/MartinaCesarini/Documents/GitHub/Lab-Companion/Veyra')
const { UI } = await import(pathToFileURL(path.join(here, 'i18n/ui.en.mjs')).href)
let bad = 0
for (const [file, pairs] of Object.entries(UI)) {
  let code = fs.readFileSync(path.join(veyra, file), 'utf8').replace(/\r\n/g, '\n')
  for (const [from, to] of pairs) {
    if (!code.includes(from)) { bad++; console.log(`${file}: ${JSON.stringify(from)}`) }
    else code = code.split(from).join(to)
  }
}
console.log(bad ? `${bad} pair(s) to fix` : 'all pairs match')
process.exit(bad ? 1 : 0)
