/* English translation of Veyra/src/renderer/guidedSteps.ts for the web build only: the original
   file with its strings swapped. Loaded in its place by studio-web/vite.config.mjs, so relative
   imports resolve from the original's folder and every check is the author's own. */
import type { TourStep } from './components/Tour'
import type { WorkingDocument } from '@shared/types'
import { validateDocument } from '@shared/validate'
import { isUnfilled } from '@shared/rules'

/**
 * The build-along tutorial: one task per card, checked against the document.
 *
 * The other tour points at a finished procedure and explains it. This one hands
 * out work: each card asks for one thing, and "Avanti" stays locked until the
 * document contains it. Nothing is done on the reader's behalf - the procedure
 * that exists at the end was typed by them.
 *
 * Two rules keep a card unambiguous. Controls are named in the words printed on
 * them - «+ Conto alla rovescia», not "add a timer" - and anything to be typed
 * is in quotes, in the sentence itself.
 *
 * What gets built is the first phase of a real analysis, the spectrophotometric
 * calibration curve, so the words being typed are words such a procedure
 * actually carries. The checks look for the shape of the answer - a title, a
 * unit, a limit, a warning - never for the exact words, so someone who writes it
 * their own way is not told they are wrong.
 */

const steps = (doc: WorkingDocument) => doc.protocol.steps ?? []

/** A phase exists once a step carries a phase code and someone has named it. */
const hasNamedPhase = (doc: WorkingDocument): boolean =>
  steps(doc).some((step) => !!step.phase && (step.phaseTitle ?? '').trim().length > 0)

/** Empty rows do not count: a checklist of three blanks is not a checklist. */
const filled = (values: string[]): number => values.filter((v) => v.trim().length > 0).length

const hasTolerance = (doc: WorkingDocument): boolean =>
  Object.keys(doc.protocol.tolerances ?? {}).length > 0

/** A value the author typed, as opposed to one still owed by somebody else. */
const written = (value: string | undefined): boolean =>
  !!value && !isUnfilled(value) && value.trim().length > 0

/** A row of any reference card, by what its label starts with. */
const cardRow = (doc: WorkingDocument, starts: string) =>
  (doc.protocol.referenceCards ?? [])
    .flatMap((card) => card.rows ?? [])
    .find((row) => (row.label ?? '').toLowerCase().startsWith(starts))

const anyStep = (
  doc: WorkingDocument,
  pick: (step: NonNullable<WorkingDocument['protocol']['steps']>[number]) => boolean,
): boolean => steps(doc).some(pick)

type Check = { text: string; done: (doc: WorkingDocument) => boolean }

/**
 * A card whose lines tick themselves off, and whose gate is the last of them.
 *
 * Derived rather than written twice: the card is done when everything it asked
 * for is done, so the ticks and the lock cannot drift apart.
 */
const building = (step: Omit<TourStep, 'done'> & { checks: Check[] }): TourStep => ({
  ...step,
  done: (doc) => step.checks.every((check) => check.done(doc)),
})

export const GUIDED_STEPS: TourStep[] = [
  {
    title: 'Let’s build a procedure together',
    body:
      'You do the writing, one task at a time: «Next» unlocks once you’ve done it. Anything to type is always in quotes. We’ll build the start of a spectrophotometric calibration curve.',
  },
  {
    target: 'protocol-general',
    placement: 'left',
    action: { kind: 'selectProtocol' },
    title: 'Name the procedure',
    body:
      'In the «Name» field type “Spectrophotometric calibration curve”. It’s what the operator reads in the list on the headset.',
    task: 'Fill in the Name field',
    done: (doc) => {
      const name = (doc.protocol.name ?? '').trim()
      return name.length >= 8 && !name.startsWith('Tutorial guidato')
    },
  },
  {
    target: 'protocol-general',
    placement: 'left',
    action: { kind: 'selectProtocol' },
    title: 'Say what it’s for',
    body:
      'In the «Description» field type “Build a calibration curve and determine the concentration of an unknown sample”. One line: what you get out of it.',
    task: 'Fill in the Description field',
    done: (doc) => (doc.protocol.description ?? '').trim().length >= 30,
  },
  building({
    target: 'tolerances',
    placement: 'left',
    action: { kind: 'selectProtocol' },
    title: 'An acceptance limit',
    body:
      'The minimum quality you accept from the regression: written once here, and usable from any step.',
    task: 'Add a limit',
    checks: [
      { text: 'In «Acceptance limits», type “r2_min” as the name', done: hasTolerance },
      { text: 'Type “0.995” as the value', done: hasTolerance },
      { text: 'Press «Add»', done: hasTolerance },
    ],
  }),
  {
    target: 'outline',
    placement: 'right',
    title: 'Create the first phase',
    body:
      'Press «+ Phase» in the structure and call the phase “Preparation”. Phases group steps.',
    task: 'A phase with a name',
    done: hasNamedPhase,
  },
  building({
    target: 'step-text',
    placement: 'left',
    title: 'Write the first step',
    body:
      'Two fields: the name shown in the structure, and the text the operator reads on the headset.',
    task: 'A step with a short name and instructions',
    checks: [
      {
        text: 'In «Short name» type “Prepare yourself and the bench”',
        done: (doc) => anyStep(doc, (step) => step.title.trim().length >= 4),
      },
      {
        text:
          'In «Instructions» type “Put on your PPE, check that the bench is clear, clean and dry and that the chemical waste container is at the station”',
        done: (doc) => anyStep(doc, (step) => (step.instructions ?? '').trim().length >= 40),
      },
    ],
  }),
  {
    target: 'outline',
    placement: 'right',
    title: 'Add a second step',
    body:
      'Hover over the “Preparation” phase and press «+ Step». An empty step appears under the first one.',
    task: 'Two steps in the phase',
    done: (doc) => steps(doc).length >= 2,
  },
  {
    target: 'step-text',
    placement: 'left',
    title: 'Name the step',
    body:
      'The new step is open in the middle. In «Short name» type “Switch on the spectrophotometer”.',
    task: 'The second step has a name',
    done: (doc) => steps(doc).filter((step) => step.title.trim().length >= 4).length >= 2,
  },
  building({
    target: 'step-extras',
    placement: 'left',
    title: 'The step that makes you wait',
    body:
      'The lamp has to stabilise before measuring, and the headset keeps time for the operator.',
    task: 'A step with a countdown',
    checks: [
      {
        text: 'In «Extra» press «+ Countdown»',
        done: (doc) => anyStep(doc, (step) => (step.timerSeconds ?? 0) > 0),
      },
      {
        text: 'In «Minutes» type “15”',
        done: (doc) => anyStep(doc, (step) => (step.timerSeconds ?? 0) >= 300),
      },
      {
        text: 'In «What are we waiting for?» type “lamp stabilisation”',
        done: (doc) => anyStep(doc, (step) => (step.timerLabel ?? '').trim().length > 0),
      },
    ],
  }),
  building({
    target: 'step-extras',
    placement: 'left',
    title: 'A warning',
    body: 'Each line becomes a card of its own on the headset, shown together with the step.',
    task: 'A step with a warning',
    checks: [
      {
        text: 'In «Extra» press «+ Warning»',
        done: (doc) => anyStep(doc, (step) => (step.warnings ?? []).length > 0),
      },
      {
        text:
          'Type “Use the fifteen-minute wait for the calculations and to prepare the glassware. It is not wasted time”',
        done: (doc) => anyStep(doc, (step) => filled(step.warnings ?? []) > 0),
      },
    ],
  }),
  building({
    target: 'step-values',
    placement: 'left',
    title: 'Something to record',
    body: 'A step that records nothing is a slide.',
    task: 'A value with its unit',
    checks: [
      {
        text: 'In «What the operator records» press «+ Value»',
        done: (doc) => anyStep(doc, (step) => (step.fields ?? []).length > 0),
      },
      {
        text: 'In «What is it called?» type “Wavelength set”',
        done: (doc) =>
          anyStep(doc, (step) =>
            (step.fields ?? []).some((field) => (field.label ?? '').trim().length > 0),
          ),
      },
      {
        text: 'In «Unit» type “nm”',
        done: (doc) =>
          anyStep(doc, (step) =>
            (step.fields ?? []).some((field) => (field.unit ?? '').trim().length > 0),
          ),
      },
    ],
  }),
  building({
    target: ['outline', 'step-extras'],
    placement: 'left',
    title: 'A checklist',
    body: 'A list the operator ticks off on the headset before carrying on.',
    task: 'A checklist with three items written',
    checks: [
      {
        text:
          'Go back to the first step and, in «Extra», press «+ Opens a panel» and choose «+ New checklist»',
        done: (doc) => (doc.protocol.checklists ?? []).length > 0,
      },
      {
        text: 'As the title type “PPE and bench”',
        done: (doc) =>
          (doc.protocol.checklists ?? []).some((list) => (list.title ?? '').trim().length > 0),
      },
      {
        text:
          'With «+ Item» add “Lab coat on and fastened”, “Safety glasses on”, “Suitable gloves on and intact”',
        done: (doc) => (doc.protocol.checklists ?? []).some((list) => filled(list.items ?? []) >= 3),
      },
    ],
  }),
  building({
    target: 'step-cards',
    placement: 'left',
    title: 'A card to look things up',
    body:
      'The panel the operator opens on the headset with their hands full: a title and “label → value” rows, written here. The rows of a safety card are already there.',
    task: 'A card with one row written and one still owed',
    checks: [
      {
        text: 'In «Cards to look up» press «+ Card»',
        done: (doc) => (doc.protocol.referenceCards ?? []).length > 0,
      },
      {
        text: 'Title “Potassium permanganate”, subtitle “KMnO4 · CAS 7722-64-7”',
        done: (doc) =>
          (doc.protocol.referenceCards ?? []).some(
            (card) => card.title.trim().length > 0 && (card.subtitle ?? '').trim().length > 0,
          ),
      },
      {
        text: 'On «Formula» choose «I’ll write it here» and type “KMnO4”',
        done: (doc) => written(cardRow(doc, 'formula')?.value),
      },
      {
        text: 'On «Molar mass» type “158.03 g/mol”',
        done: (doc) => written(cardRow(doc, 'molar')?.value),
      },
      {
        text:
          'Leave «Hazards» and «PPE» on «From the supplier’s safety data sheet»: that way the card says this value is still owed by whoever knows it',
        done: (doc) =>
          (doc.protocol.referenceCards ?? []).some((card) =>
            (card.rows ?? []).some((row) => isUnfilled(row.value)),
          ),
      },
    ],
  }),
  {
    target: 'issues',
    placement: 'bottom',
    title: 'Warnings and errors',
    body:
      'Click the counter next to «Publish»: the list opens on the right. The card rows still waiting for a value are there as warnings: they flag, they don’t block. Errors do block. Click a warning and it takes you to what it is about.',
  },
  {
    target: 'issues',
    placement: 'bottom',
    title: 'Zero errors to publish',
    body:
      'An error is something that would not work on the headset: a card that doesn’t exist, a limit with no number, a missing version. While there is even one, «Publish» stays off.',
    task: 'No errors in the counter',
    done: (doc) => validateDocument(doc).errorCount === 0,
  },
  building({
    target: 'publish',
    placement: 'bottom',
    title: 'Publish the procedure',
    body:
      'A published version is never edited again: a report says which version was followed, so next time you publish “1.1”.',
    task: 'A published version',
    checks: [
      { text: 'Press «Publish»', done: (doc) => !!doc.meta.lastPublishedVersion },
      { text: 'As the version type “1.0”', done: (doc) => !!doc.meta.lastPublishedVersion },
      { text: 'Confirm', done: (doc) => !!doc.meta.lastPublishedVersion },
    ],
  }),
  {
    title: 'This procedure is yours',
    body:
      'One phase, two steps, a countdown, a warning, a value, a limit, a checklist, a card: those are all the pieces of a procedure, and this one is published. You can carry on with it, or start over with the ↺ button above this window.',
  },
]
