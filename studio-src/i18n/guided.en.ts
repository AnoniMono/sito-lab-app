import type { Protocol } from './protocol.gen'

/**
 * The workbook the guided tutorial fills in.
 *
 * Deliberately almost empty: the other tutorial explains a finished procedure,
 * this one is built by the person reading it. The guided tour hands out one
 * task at a time and only unlocks the next when the document actually contains
 * what was asked for, so the thing you end up with is yours, not a demo.
 *
 * The content it walks you through is real: the spectrophotometric calibration
 * curve (retta di taratura) that the lab runs, so the words being typed are
 * words a procedure of this kind actually contains.
 */

export const GUIDED_ID = 'tutorial-guidato-retta'

export const guidedProtocol: Protocol = {
  id: GUIDED_ID,
  name: 'Guided tutorial · Build a procedure',
  description: '',
  author: '',
  category: 'Tutorial',
  contentVersion: '0.1-draft',
  estimatedMinutes: 0,
  tolerances: {},
  steps: [],
  checklists: [],
  referenceCards: [],
  diagnostics: [],
  chartSpecs: [],
}
