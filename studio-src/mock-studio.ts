/* In-memory stand-in for the Electron preload bridge (window.studio), so Veyra Studio's
   real renderer runs in a browser. Only the two tutorials are in the library: the
   walk-through on the pH-meter procedure and the guided build-along.
   Nothing leaves the page: no headset, no Ollama, no file system. */
import type { StudioApi } from '@shared/ipc'
import type { WorkingDocument, LibraryEntry, Protocol } from '@shared/types'
import { EXAMPLE_ID, exampleProtocol } from '@shared/example'
import { GUIDED_ID, guidedProtocol } from '@shared/guided'

type Kind = 'example' | 'guided'
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v))

// same shape as electron/main/starters.ts starterDocument()
function starter(kind: Kind): WorkingDocument {
  const now = new Date().toISOString()
  const protocol: Protocol = clone(kind === 'example' ? exampleProtocol : guidedProtocol)
  return { formatVersion: 1, protocol, meta: { status: 'draft', createdUtc: now, modifiedUtc: now, starter: kind }, annotations: {} }
}

const docs = new Map<string, WorkingDocument>([
  [EXAMPLE_ID, starter('example')],
  [GUIDED_ID, starter('guided')],
])

const entry = (d: WorkingDocument): LibraryEntry => ({
  id: d.protocol.id,
  name: d.protocol.name,
  ...(d.meta.starter ? { starter: d.meta.starter } : {}),
  status: d.meta.status,
  category: d.protocol.category,
  contentVersion: d.protocol.contentVersion,
  stepCount: d.protocol.steps?.length ?? 0,
  modifiedUtc: d.meta.modifiedUtc,
  hasUnpublishedChanges: true,
})

const offline = { headsetAddress: null, lastSeenUtc: null, online: false, delivered: 0, reported: false, held: [], total: 0, transfer: null, device: null }
const noop = () => () => undefined
const LANG: string = '__STUDIO_LANG__'
const never = (what: string) => () => Promise.reject(new Error(LANG === 'en' ? `${what} is not available in the web demo.` : `${what} non è disponibile nella demo web.`))

function emptyActivity() {
  const days = []
  for (let i = 27; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5)
    days.push({ date: d.toISOString().slice(0, 10), studio: false, headset: false, published: 0, shipped: 0, collected: 0 })
  }
  return { days, activeDays: 0, headsetDays: 0, published: 0, shipped: 0, collected: 0, streak: 0 }
}

export const mockStudio: StudioApi = {
  isUnlocked: async () => true,
  signIn: async () => true,
  signOut: async () => undefined,
  getSettings: async () => ({ libraryPath: LANG === 'en' ? 'Web demo (in memory)' : 'Demo web (in memoria)', userName: LANG === 'en' ? 'guest' : 'ospite' }),
  chooseLibraryFolder: async () => null,

  listProcedures: async () => [...docs.values()].map(entry).sort((a, b) => a.name.localeCompare(b.name)),
  createProcedure: async (id: string, name: string) => {
    const now = new Date().toISOString()
    const d: WorkingDocument = {
      formatVersion: 1,
      protocol: { ...clone(guidedProtocol), id, name, category: '' },
      meta: { status: 'draft', createdUtc: now, modifiedUtc: now },
      annotations: {},
    }
    docs.set(id, d)
    return clone(d)
  },
  readProcedure: async (id: string) => {
    const d = docs.get(id)
    if (!d) throw new Error('non trovata')
    return clone(d)
  },
  saveProcedure: async (d: WorkingDocument) => {
    docs.set(d.protocol.id, clone({ ...d, meta: { ...d.meta, modifiedUtc: new Date().toISOString() } }))
  },
  publishProcedure: async (_id: string, contentVersion: string) => ({ published: true, contentVersion }),
  deleteProcedure: async () => ({ deleted: false, reason: LANG === 'en' ? 'Tutorials cannot be deleted.' : 'I tutorial non si eliminano.' }),
  revealProcedure: async () => undefined,
  resetStarter: async (kind: Kind) => { docs.set(kind === 'example' ? EXAMPLE_ID : GUIDED_ID, starter(kind)) },

  // folders are categories (LibraryView groups on entry.category)
  listProcedureFolders: async () => [],
  createProcedureFolder: async () => undefined,
  renameProcedureFolder: async () => undefined,
  setProcedureFolder: async (id: string, folder: string) => { const d = docs.get(id); if (d) d.protocol.category = folder },
  sessionNames: async () => ({}),
  renameSession: async () => undefined,

  listShelf: async () => [],
  addToShelf: async () => ({ added: 0, skipped: [] }),
  addPathsToShelf: async () => ({ added: 0, skipped: [] }),
  listShelfFolders: async () => [],
  createShelfFolder: async () => undefined,
  renameShelfFolder: async () => undefined,
  moveShelfItem: async () => undefined,
  pathForFile: () => '',
  removeFromShelf: async () => undefined,
  shipItem: async () => undefined,
  unshipItem: async () => undefined,
  openItem: async () => undefined,
  revealShelf: async () => undefined,

  activity: async () => emptyActivity(),

  headsetStatus: async () => offline,
  onHeadsetStatus: noop,

  ollamaStatus: async () => ({ running: false, host: '', models: [], binary: null, lanUrl: null }),
  ollamaStart: never(LANG === 'en' ? 'The local assistant' : 'L’assistente locale'),
  ollamaInstall: never(LANG === 'en' ? 'The local assistant' : 'L’assistente locale'),
  ollamaPullModel: never(LANG === 'en' ? 'The local assistant' : 'L’assistente locale'),
  onOllamaProgress: noop,
  onOllamaStatus: noop,

  streamState: async () => ({ enabled: false, wanted: false, settings: { fps: 15, width: 960, quality: 70 }, ageMs: null, frames: 0 }),
  streamSetEnabled: never(LANG === 'en' ? 'The headset view' : 'La vista dal visore'),
  streamUrl: async () => '',
  consentState: async () => ({ phase: 'idle', reason: null }),
  onConsentChange: noop,
  mirrorState: async () => ({ running: false, serial: null, settings: { width: 1600, bitrate: 8000000 } }),
  mirrorStart: never(LANG === 'en' ? 'The headset view' : 'La vista dal visore'),
  mirrorStop: async () => undefined,
  onMirrorData: noop,
  onMirrorEnd: noop,
  onHeadRoll: noop,

  adbState: async () => ({ binary: null, devices: [], remembered: [], error: null }),
  adbEnableWireless: never('adb'),
  adbConnect: never('adb'),
  adbDisconnect: async () => undefined,
  adbForget: async () => undefined,
  adbInstall: never('adb'),
  adbLogcat: never('adb'),

  chooseDocument: async () => null,
  importDocument: never(LANG === 'en' ? 'Importing from Word/PDF' : 'L’importazione da Word/PDF'),
  onImportProgress: noop,
}
