import type { TourStep } from './components/Tour'

/**
 * English translation of Veyra/src/renderer/tourSteps.ts, for the web build only.
 * Loaded in place of the original by studio-src/vite.config.mjs, so the relative
 * import above resolves from the original's folder. Targets, placements and
 * actions are unchanged. The English build translates the app and the sample
 * procedure too, so controls are named by their English labels.
 */
export const TOUR_STEPS: TourStep[] = [
  {
    title: 'Let’s take a look together',
    body:
      'I’ll show you the editor on a real procedure: calibrating a pH meter and preparing a buffer. It takes about a minute, and you can leave at any time with «Skip».',
  },
  {
    target: 'outline',
    title: 'The structure, on the left',
    body:
      'The whole procedure at a glance: phases in bold and, under each one, the steps it contains. This is where you move around from.',
    placement: 'right',
  },
  {
    target: 'task',
    title: 'Phases group steps',
    body:
      'A phase is a block of work: CALIBRATION, PREPARATION, CHECK. Hover over one and the controls appear to add a step, move it or delete it.',
    placement: 'right',
  },
  {
    target: 'step-row',
    title: 'The steps',
    body:
      'Each row is a step. The little squares on the right tell you at a glance how many values it records, whether it has a timer and whether it carries a warning. Click one and it opens in the middle.',
    placement: 'right',
    action: { kind: 'selectStep', position: 6 },
  },
  {
    target: 'step-text',
    title: 'What the operator does',
    body:
      'The short name is what you see in the structure; the instructions are the text the operator reads on the headset. The counter underneath warns you when the text is too long for the card.',
    placement: 'left',
    action: { kind: 'selectStep', position: 6 },
  },
  {
    target: 'step-values',
    title: 'What the operator records',
    body:
      'This step asks for two values to be noted down. Each has a name, a unit and a type, and it is what ends up in the report at the end of the run. A procedure that records nothing is just a slideshow.',
    placement: 'left',
    action: { kind: 'selectStep', position: 6 },
  },
  {
    target: 'step-limit',
    title: 'When a value has a limit',
    body:
      'A value can also be judged. Pick the kind of limit, type the numbers, and the sentence in green tells you in words when the value is accepted. No formulas to write.',
    placement: 'left',
    action: { kind: 'selectStep', position: 6 },
  },
  {
    target: 'step-cards',
    title: 'Cards to look things up',
    body:
      'A step can bring along the cards needed to check something while working: a reagent and its hazards, an alarm, a tool. Highlighted rows are still waiting for a value from the safety data sheet.',
    placement: 'left',
    action: { kind: 'selectStep', position: 3 },
  },
  {
    target: 'step-extras',
    title: 'Warnings, waits, checklists',
    body:
      'Down here a step can carry a warning, which becomes a card of its own on the headset, a countdown for waiting times, and a checklist to tick off.',
    placement: 'left',
    action: { kind: 'selectStep', position: 6 },
  },
  {
    target: 'issues',
    title: 'What needs fixing',
    body:
      'This column checks the procedure as you write it. Errors must be fixed before publishing; warnings don’t. Click a row and it takes you straight to the spot.',
    placement: 'left',
  },
  {
    target: 'publish',
    title: 'Publishing',
    body:
      'When there are no errors, «Publish» prepares the version that goes to the headset. Here it is switched off on purpose: this is the example procedure and it doesn’t go on the headset. On yours it will work.',
    placement: 'left',
  },
  {
    title: 'That’s it',
    body:
      'Take this procedure apart freely: nothing here is saved, and the ↺ button above this window puts it back as it was and starts the tour again.',
  },
]
