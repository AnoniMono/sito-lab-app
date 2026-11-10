/* eslint-disable */
/**
 * English copy of src/shared/example.ts, for the web demo (studio-src). Ids, keys, tolerance
 * names and DA_COMPILARE markers stay as in the original: the rules and the app depend on them.
 *
 * Source: Assets/LabCompanion/Resources/SampleData/sample_protocol.json (ese-01-tampone-fosfato)
 * Regenerate: npm run gen:example
 *
 * The worked example seeded into an empty library. Edit the source procedure,
 * not this file.
 */
import type { Protocol } from './protocol.gen'

export const EXAMPLE_ID = 'esempio-taratura-phmetro'

export const exampleProtocol: Protocol = {
  "id": "esempio-taratura-phmetro",
  "name": "Tutorial · pH meter calibration and buffer preparation",
  "description": "Calibration of a pH meter on the standards chosen at the bench, preparation of a phosphate buffer solution and a check of its buffering capacity.",
  "author": "DA_COMPILARE",
  "category": "Analytical Chemistry",
  "contentVersion": "1.1-draft",
  "estimatedMinutes": 180,
  "tolerances": {
    "slope_pct_min": 95,
    "slope_pct_max": 102,
    "offset_mV_min": -30,
    "offset_mV_max": 30,
    "scarto_pesata_pct_max": 1,
    "tolleranza_pH_finale": 0.05,
    "temperatura_min_C": 10,
    "temperatura_max_C": 40,
    "capacita_delta_max": 0.5
  },
  "steps": [
    {
      "index": 0,
      "phase": "A",
      "phaseTitle": "CALIBRATION",
      "title": "Get yourself and the bench ready",
      "instructions": "Put on your PPE and check the bench. Open the checklist and tick each item as you complete it.",
      "opensPanel": "checklist:dpi_postazione"
    },
    {
      "index": 1,
      "phase": "A",
      "phaseTitle": "CALIBRATION",
      "title": "Switch on the pH meter and prepare the electrode",
      "instructions": "Switch the instrument on. Take the storage cap off the combination electrode. Check that the internal electrolyte (KCl) is above the junction and that there are no air bubbles near the bulb.",
      "warnings": [
        "If you see bubbles near the bulb, shake the electrode downwards with a sharp flick, like a mercury thermometer."
      ]
    },
    {
      "index": 2,
      "phase": "A",
      "phaseTitle": "CALIBRATION",
      "title": "Set the temperature",
      "instructions": "Turn on automatic temperature compensation (ATC), or measure the temperature of the solutions and set it by hand. pH depends on temperature: without this step the calibration is not valid.",
      "fields": [
        {
          "key": "temperatura_C",
          "label": "Solution temperature",
          "unit": "C",
          "type": "Float",
          "min": 0,
          "max": 100,
          "validationRule": "range:temperatura_min_C,temperatura_max_C",
          "required": true
        }
      ]
    },
    {
      "index": 3,
      "phase": "A",
      "phaseTitle": "CALIBRATION",
      "title": "Set out the calibration standards",
      "instructions": "Open the standards panel, check that the values match the ones printed on the bottles in your hand, and choose the order of the points. Then pour an aliquot of each standard you will use into a clean, dry beaker. Never pour used standard back into the original bottle.",
      "referenceIds": [
        "std_ph7",
        "std_ph4",
        "std_ph9"
      ],
      "opensPanel": "setup:standard_taratura"
    },
    {
      "index": 4,
      "phase": "A",
      "phaseTitle": "CALIBRATION",
      "repeatFor": "standard_taratura",
      "title": "Rinse the electrode",
      "instructions": "Before point {{row.n}} of {{row.total}}, rinse the bulb with deionised water from the wash bottle and catch the rinse in a waste beaker. Blot dry with lint-free tissue.",
      "warnings": [
        "BLOT, do not rub. Rubbing the glass builds up a static charge that skews the reading for several minutes.",
        "Skipping the rinse between points contaminates the next standard and skews the slope. It is the most common mistake in the whole calibration."
      ],
      "referenceIds": [
        "acqua_deionizzata"
      ]
    },
    {
      "index": 5,
      "phase": "A",
      "phaseTitle": "CALIBRATION",
      "repeatFor": "standard_taratura",
      "title": "Point {{row.n}} of {{row.total}}: pH {{row.value}}",
      "instructions": "Dip the electrode into the pH {{row.value}} standard ({{row.label}}) until the junction is covered. Wait for a stable reading, then confirm on the instrument. This point sets: {{row.role}}.",
      "warnings": [
        "Do not rest the tip on the bottom of the beaker: the glass bulb is fragile and chips."
      ],
      "timerSeconds": 60,
      "timerLabel": "point {{row.n}} settling"
    },
    {
      "index": 6,
      "phase": "A",
      "phaseTitle": "CALIBRATION",
      "title": "Read and assess the calibration parameters",
      "instructions": "Read the slope and offset values on the instrument and record them. The ideal theoretical (Nernstian) response is 59.16 mV per pH unit at 25 C, which is a slope of 100%.",
      "warnings": [
        "A slope outside 95-102% or an offset beyond +/-30 mV means the electrode needs regenerating or replacing. Tell the instructor before you carry on."
      ],
      "fields": [
        {
          "key": "slope_pct",
          "label": "Slope",
          "unit": "%",
          "type": "Float",
          "min": 0,
          "max": 130,
          "validationRule": "range:slope_pct_min,slope_pct_max",
          "required": true
        },
        {
          "key": "offset_mV",
          "label": "Offset",
          "unit": "mV",
          "type": "Float",
          "min": -200,
          "max": 200,
          "validationRule": "range:offset_mV_min,offset_mV_max",
          "required": true
        }
      ]
    },
    {
      "index": 7,
      "phase": "A",
      "phaseTitle": "CALIBRATION",
      "title": "Put the electrode away",
      "instructions": "Rinse the electrode and put it back in its storage solution, 3 M KCl.",
      "warnings": [
        "NEVER store the electrode in distilled or deionised water: it leaches the electrolyte out through the junction and ruins the electrode for good."
      ],
      "referenceIds": [
        "kcl_3m"
      ]
    },
    {
      "index": 8,
      "phase": "B",
      "phaseTitle": "PREPARATION",
      "title": "Work out the masses to weigh",
      "instructions": "Open the calculation panel. Enter the target pH, total concentration and final volume, then choose the forms of the salts you actually have on the bench. Read the working, not just the result: in the test you will be asked to do it by hand.",
      "opensPanel": "calculator:buffer"
    },
    {
      "index": 9,
      "phase": "B",
      "phaseTitle": "PREPARATION",
      "title": "Weigh the two salts",
      "instructions": "Weigh the two salts separately on the analytical balance, using a weighing boat and spatula. Zero (tare) with the empty boat already on the pan. Record the ACTUAL masses weighed, not the calculated ones.",
      "warnings": [
        "Close the balance doors before reading. Draughts move the last decimal place."
      ],
      "fields": [
        {
          "key": "massa_acido_g",
          "label": "Actual mass of acid salt",
          "unit": "g",
          "type": "Float",
          "min": 0,
          "max": 500,
          "validationRule": "deviation:massa_acido_target_g,scarto_pesata_pct_max",
          "required": true
        },
        {
          "key": "massa_base_g",
          "label": "Actual mass of base salt",
          "unit": "g",
          "type": "Float",
          "min": 0,
          "max": 500,
          "validationRule": "deviation:massa_base_target_g,scarto_pesata_pct_max",
          "required": true
        }
      ]
    },
    {
      "index": 10,
      "phase": "B",
      "phaseTitle": "PREPARATION",
      "title": "Dissolve",
      "instructions": "Transfer the salts into a beaker with about 80% of the final volume of deionised water. Add the stir bar and stir magnetically until the solution is clear.",
      "warnings": [
        "Rinse the weighing boat into the beaker with deionised water: salt left stuck to it is mass you weighed but did not dissolve."
      ],
      "timerSeconds": 300,
      "timerLabel": "stirring"
    },
    {
      "index": 11,
      "phase": "B",
      "phaseTitle": "PREPARATION",
      "title": "Measure and adjust the pH",
      "instructions": "Dip the electrode into the slowly stirred solution and read the pH. Correct with small additions of 0.1 M HCl or 0.1 M NaOH until you reach the target, waiting for the reading to settle after each addition.",
      "warnings": [
        "Add a few drops at a time. Overshooting the target is easy; going back means adding the other reagent and changing the ionic strength."
      ],
      "referenceIds": [
        "hcl_01m",
        "naoh_01m"
      ],
      "fields": [
        {
          "key": "pH_pre_aggiustamento",
          "label": "pH before adjustment",
          "type": "Float",
          "min": 0,
          "max": 14,
          "required": true
        },
        {
          "key": "volume_HCl_mL",
          "label": "Volume of 0.1 M HCl added",
          "unit": "mL",
          "type": "Float",
          "min": 0,
          "max": 100,
          "required": false
        },
        {
          "key": "volume_NaOH_mL",
          "label": "Volume of 0.1 M NaOH added",
          "unit": "mL",
          "type": "Float",
          "min": 0,
          "max": 100,
          "required": false
        }
      ]
    },
    {
      "index": 12,
      "phase": "B",
      "phaseTitle": "PREPARATION",
      "title": "Make up to volume",
      "instructions": "Transfer the solution quantitatively into the volumetric flask, rinsing the beaker with deionised water and adding the rinses. Make up to the mark.",
      "warnings": [
        "Read the meniscus at eye level, with its bottom touching the mark. The flask is calibrated at 20 C: if dissolving warmed the solution, wait for it to return to room temperature."
      ]
    },
    {
      "index": 13,
      "phase": "B",
      "phaseTitle": "PREPARATION",
      "title": "Mix",
      "instructions": "Stopper the flask and invert it slowly at least 20 times, bringing it upright between inversions.",
      "timerSeconds": 60,
      "timerLabel": "mixing"
    },
    {
      "index": 14,
      "phase": "C",
      "phaseTitle": "CHECK",
      "title": "Final measurement",
      "instructions": "Take an aliquot into a clean beaker and measure the pH with the calibrated electrode. Do not dip the electrode straight into the flask.",
      "fields": [
        {
          "key": "pH_finale",
          "label": "Final measured pH",
          "type": "Float",
          "min": 0,
          "max": 14,
          "validationRule": "deviationAbs:pH_target,tolleranza_pH_finale",
          "required": true
        }
      ]
    },
    {
      "index": 15,
      "phase": "C",
      "phaseTitle": "CHECK",
      "title": "Result and buffering capacity test",
      "instructions": "Compare the measured value with the target and record the result. If the instructor asks for it, run the buffering capacity test: take two equal aliquots of buffer and one of plain deionised water, add the same volume of 0.1 M HCl to each and record the change in pH.",
      "fields": [
        {
          "key": "delta_pH_acido",
          "label": "pH change after adding acid",
          "type": "Float",
          "min": -14,
          "max": 14,
          "required": false
        },
        {
          "key": "delta_pH_base",
          "label": "pH change after adding base",
          "type": "Float",
          "min": -14,
          "max": 14,
          "required": false
        },
        {
          "key": "delta_pH_controllo_acqua",
          "label": "pH change of the water control",
          "type": "Float",
          "min": -14,
          "max": 14,
          "required": false
        }
      ],
      "opensPanel": "chart:capacita_tamponante"
    },
    {
      "index": 16,
      "phase": "C",
      "phaseTitle": "CHECK",
      "title": "Wrap-up",
      "instructions": "Label the prepared solution (contents, concentration, pH, date, operator). Open the wrap-up checklist and finish disposal and cleaning. Then export the session report.",
      "opensPanel": "checklist:chiusura"
    }
  ],
  "checklists": [
    {
      "id": "dpi_postazione",
      "title": "PPE and bench",
      "notice": "Ticks are the operator's declarations. The app verifies nothing.",
      "items": [
        "Lab coat on and fastened",
        "Safety goggles on",
        "Suitable gloves on and intact",
        "Long hair tied back, no dangling jewellery",
        "Work surface clear, clean and dry",
        "Eye shower and eyewash located and reachable",
        "Chemical waste container at the bench"
      ]
    },
    {
      "id": "materiale",
      "title": "Equipment and reagents",
      "notice": "Check you have everything BEFORE you start weighing.",
      "items": [
        "pH meter with combination electrode",
        "Calibration standards for this session (check the values on the bottles)",
        "3 M KCl storage solution",
        "Analytical balance levelled and settled",
        "Weighing boats and spatula",
        "Buffer salts (form checked on the label)",
        "0.1 M HCl and 0.1 M NaOH",
        "Deionised water in a wash bottle",
        "Beakers, volumetric flask, funnel, glass rod",
        "Magnetic stirrer and stir bar",
        "Lint-free tissue and paper towel"
      ]
    },
    {
      "id": "chiusura",
      "title": "Wrap-up and disposal",
      "notice": "No session ends without these items.",
      "items": [
        "Electrode rinsed and stored in 3 M KCl",
        "pH meter switched off",
        "Balance clean and pan clear",
        "Prepared solution labelled correctly",
        "Used calibration standards disposed of (not poured back into the bottles)",
        "Chemical waste in the right container",
        "Glassware washed and put away",
        "Work surface clean and dry"
      ]
    }
  ],
  "referenceCards": [
    {
      "id": "std_ph7",
      "title": "Standard buffer solution pH 7.00",
      "subtitle": "Phosphate mixture",
      "source": "DA_COMPILARE",
      "rows": [
        {
          "label": "Appearance",
          "value": "Aqueous solution, often coloured by the manufacturer"
        },
        {
          "label": "Notes",
          "value": "Sets the electrode's offset. Certified value at 25 C"
        },
        {
          "label": "Hazards",
          "value": "DA_COMPILARE_DA_SDS",
          "critical": true
        },
        {
          "label": "PPE",
          "value": "DA_COMPILARE_DA_SDS"
        },
        {
          "label": "Disposal",
          "value": "DA_COMPILARE_DA_SDS"
        }
      ]
    },
    {
      "id": "std_ph4",
      "title": "Standard buffer solution pH 4.01",
      "subtitle": "Potassium hydrogen phthalate  ·  CAS 877-24-7",
      "source": "DA_COMPILARE",
      "rows": [
        {
          "label": "Molar mass",
          "value": "204.22 g/mol"
        },
        {
          "label": "Notes",
          "value": "Certified value at 25 C. Do not pour the used aliquot back into the bottle"
        },
        {
          "label": "Hazards",
          "value": "DA_COMPILARE_DA_SDS",
          "critical": true
        },
        {
          "label": "PPE",
          "value": "DA_COMPILARE_DA_SDS"
        },
        {
          "label": "Disposal",
          "value": "DA_COMPILARE_DA_SDS"
        }
      ]
    },
    {
      "id": "std_ph9",
      "title": "Standard buffer solution pH 9.01",
      "subtitle": "Sodium tetraborate decahydrate  ·  CAS 1303-96-4",
      "source": "DA_COMPILARE",
      "rows": [
        {
          "label": "Molar mass",
          "value": "381.37 g/mol"
        },
        {
          "label": "Notes",
          "value": "Certified value at 25 C. Absorbs CO2 from the air: close the bottle straight away and do not pour the used aliquot back"
        },
        {
          "label": "Hazards",
          "value": "DA_COMPILARE_DA_SDS",
          "critical": true
        },
        {
          "label": "PPE",
          "value": "DA_COMPILARE_DA_SDS"
        },
        {
          "label": "Disposal",
          "value": "DA_COMPILARE_DA_SDS"
        }
      ]
    },
    {
      "id": "kcl_3m",
      "title": "Potassium chloride 3 M",
      "subtitle": "KCl (aq)  ·  CAS 7447-40-7",
      "source": "DA_COMPILARE",
      "rows": [
        {
          "label": "Molar mass",
          "value": "74.55 g/mol"
        },
        {
          "label": "Notes",
          "value": "Electrode storage solution. Cannot be replaced with distilled water"
        },
        {
          "label": "Hazards",
          "value": "DA_COMPILARE_DA_SDS",
          "critical": true
        },
        {
          "label": "Disposal",
          "value": "DA_COMPILARE_DA_SDS"
        }
      ]
    },
    {
      "id": "hcl_01m",
      "title": "Hydrochloric acid 0.1 M",
      "subtitle": "HCl (aq)  ·  CAS 7647-01-0",
      "source": "DA_COMPILARE",
      "rows": [
        {
          "label": "Notes",
          "value": "Used to lower the pH, added drop by drop"
        },
        {
          "label": "Hazards",
          "value": "DA_COMPILARE_DA_SDS",
          "critical": true
        },
        {
          "label": "PPE",
          "value": "DA_COMPILARE_DA_SDS"
        },
        {
          "label": "Incompatibilities",
          "value": "DA_COMPILARE_DA_SDS"
        }
      ]
    },
    {
      "id": "naoh_01m",
      "title": "Sodium hydroxide 0.1 M",
      "subtitle": "NaOH (aq)  ·  CAS 1310-73-2",
      "source": "DA_COMPILARE",
      "rows": [
        {
          "label": "Notes",
          "value": "Absorbs CO2 from the air: keep the bottle closed"
        },
        {
          "label": "Hazards",
          "value": "DA_COMPILARE_DA_SDS",
          "critical": true
        },
        {
          "label": "PPE",
          "value": "DA_COMPILARE_DA_SDS"
        },
        {
          "label": "Incompatibilities",
          "value": "DA_COMPILARE_DA_SDS"
        }
      ]
    },
    {
      "id": "acqua_deionizzata",
      "title": "Deionised water",
      "subtitle": "H2O  ·  CAS 7732-18-5",
      "source": "-",
      "rows": [
        {
          "label": "Notes",
          "value": "Do not use it to store the electrode. Its pH means little: it is barely buffered and absorbs CO2"
        },
        {
          "label": "Hazards",
          "value": "Not hazardous"
        },
        {
          "label": "Disposal",
          "value": "Down the drain, unless contaminated"
        }
      ]
    }
  ],
  "diagnostics": [
    {
      "symptom": "The reading does not settle",
      "causes": [
        {
          "cause": "Air bubble touching the bulb or the junction",
          "check": "Take the electrode out, shake it downwards with a sharp flick, then dip it again"
        },
        {
          "cause": "Internal electrolyte too low",
          "check": "Check that the internal KCl is above the junction; top it up if the manufacturer allows"
        },
        {
          "cause": "Junction blocked or dirty",
          "check": "Inspect the junction; if dirty, clean it following the manufacturer's instructions"
        },
        {
          "cause": "Solution and electrode not at the same temperature",
          "check": "Wait for thermal equilibrium and check the ATC setting"
        },
        {
          "cause": "Electrode dried out by wrong storage",
          "check": "Check what it was stored in; if it was distilled water, the electrode needs regenerating"
        },
        {
          "cause": "Electrical noise from the magnetic stirrer",
          "check": "Switch the stirrer off and read again: if the reading settles, that was the cause"
        }
      ]
    },
    {
      "symptom": "Slope outside 95-102%",
      "causes": [
        {
          "cause": "Rinse skipped between the first and second standard",
          "check": "Repeat the calibration, rinsing carefully. It is by far the most common cause"
        },
        {
          "cause": "Calibration standards contaminated or expired",
          "check": "Use fresh aliquots from bottles in date; never pour a used aliquot back"
        },
        {
          "cause": "Ageing electrode",
          "check": "Compare the slope with earlier sessions: if it keeps dropping, the electrode is at the end of its life"
        },
        {
          "cause": "Temperature not compensated",
          "check": "Check ATC or the manual setting"
        }
      ]
    },
    {
      "symptom": "Offset beyond +/- 30 mV",
      "causes": [
        {
          "cause": "pH 7.00 standard contaminated",
          "check": "Repeat with a fresh aliquot"
        },
        {
          "cause": "Dirty bulb (grease, fingerprints, residue)",
          "check": "Clean it following the manufacturer's instructions and repeat"
        },
        {
          "cause": "Reference system contaminated",
          "check": "Tell the instructor: it may need regenerating or replacing"
        }
      ]
    },
    {
      "symptom": "The measured pH is far from the calculated one",
      "causes": [
        {
          "cause": "Hydrate form of the salt differs from the one in the calculation",
          "check": "Read the jar's label again and recalculate with the right molar mass. It is the most common mistake in the preparation phase"
        },
        {
          "cause": "Acid and conjugate base salts swapped",
          "check": "Check the labels on both jars"
        },
        {
          "cause": "Weighing error or incomplete transfer",
          "check": "Compare the recorded masses with the calculated ones; check that the weighing boat was rinsed"
        },
        {
          "cause": "Calibration not valid",
          "check": "Read a standard again: if it is off, recalibrate"
        },
        {
          "cause": "Flask not made up to volume correctly",
          "check": "Check the meniscus and the solution's temperature"
        }
      ]
    },
    {
      "symptom": "The pH drifts slowly over time",
      "causes": [
        {
          "cause": "CO2 absorbed from the air",
          "check": "Keep containers closed; this mostly affects basic solutions and dilute NaOH"
        },
        {
          "cause": "Solution temperature changing",
          "check": "Wait for thermal equilibrium before the final reading"
        },
        {
          "cause": "Electrode with a slow response",
          "check": "Compare with how it behaves in the standards"
        }
      ]
    },
    {
      "symptom": "The target pH cannot be reached by adjusting",
      "causes": [
        {
          "cause": "High buffering capacity: it takes more titrant than it seems",
          "check": "Keep making small, steady additions and record the volumes"
        },
        {
          "cause": "Target pH too far from the system's pKa",
          "check": "Check that the target is within about one unit of the pKa; beyond that, the system is not suitable"
        },
        {
          "cause": "HCl or NaOH concentration different from the label",
          "check": "Tell the instructor"
        }
      ]
    }
  ],
  "chartSpecs": [
    {
      "key": "capacita_tamponante",
      "title": "Buffering capacity",
      "kind": "Comparison",
      "yLabel": "change in pH",
      "categories": [
        "buffer + acid",
        "buffer + base",
        "water (control)"
      ],
      "sourceFields": [
        "delta_pH_acido",
        "delta_pH_base",
        "delta_pH_controllo_acqua"
      ]
    }
  ],
  "setupGroups": [
    {
      "id": "standard_taratura",
      "title": "Calibration standards",
      "notice": "Enter the value printed on the bottle you are using, not the nominal one: buffers differ by a few hundredths of a pH unit from batch to batch and as they age. Also choose the order you will use the points in.",
      "minEnabled": 2,
      "rows": [
        {
          "key": "pH",
          "label": "Neutral buffer",
          "value": 7,
          "format": "0.00",
          "min": 0,
          "max": 14,
          "enabled": true,
          "role": "offset, it fixes the electrode's zero"
        },
        {
          "key": "pH",
          "label": "Acid buffer",
          "value": 4.01,
          "format": "0.00",
          "min": 0,
          "max": 14,
          "enabled": true,
          "role": "slope, towards the acid side"
        },
        {
          "key": "pH",
          "label": "Basic buffer",
          "value": 9.01,
          "format": "0.00",
          "min": 0,
          "max": 14,
          "enabled": false,
          "role": "slope, towards the alkaline side"
        }
      ]
    }
  ]
}
