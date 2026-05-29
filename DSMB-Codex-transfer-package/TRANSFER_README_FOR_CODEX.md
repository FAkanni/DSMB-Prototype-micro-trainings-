# DSMB Codex Transfer Package

This package is meant to let another Codex thread pick up the DSMB training prototype without needing the original conversation.

## Start Here

1. Open this folder in Codex.
2. Read this file first.
3. Run the DSMB prototype:

```bash
cd dsmb-training-prototype
python3 -m http.server 8765
```

Then open:

```text
http://localhost:8765/index.html
```

If the browser appears to cache old styling, use a cache-busted URL such as:

```text
http://localhost:8765/index.html?fresh=1
```

## What Is Included

- `dsmb-training-prototype/`
  - The main standalone DSMB/ISM/SO guided training prototype.
  - Entry point: `index.html`.
  - Training definitions: `data/trainings.js`.
  - UI simulation and guided-step logic: `app.js`.
  - CROMS-like visual styling: `styles.css`.

- `docs/DSMB_guided_workflow_microtraining_catalog.md`
  - Catalog of DSMB workflow ideas and micro-training candidates.

- `docs/DSMB_training_conversation_context.md`
  - Compact history of the user request sequence, observations, and iteration path.

- `docs/DSMB_AI_collaboration_learning_guide.md`
  - Guide for teaching someone how this collaboration was done.

- `docs/DSMB_AI_collaboration_learning_guide.docx`
  - Word version of the collaboration learning guide.

- `docs/CROMS_DSMB_bulk_upload_discovery.md`
  - Separate DSMB source-code/API discovery notes. Useful context, but not required to run the prototype.

- `supporting_artifacts/`
  - Prior verification/snapshot notes and one prototype visual artifact.

- `optional/coi-entry-orientation/`
  - Older standalone COI orientation prototype. It is related but not the current DSMB guided trainer.

## Current State Of The Main Prototype

The main DSMB prototype has:

- 17 guided trainings.
- 109 guided steps.
- Deidentified/synthetic names, study identifiers, grant labels, email addresses, document names, and dates.
- CROMS-like DSMB Details, Meeting Details, Documents, COI, and Member Approval screens.
- Guided interactions for buttons, dropdowns, lookup selections, radio options, free-text entry, attendance capture, document workflow, COI review, and approval package review.
- Active target styling that should not look disabled or greyed out while a user is being asked to click/type/select.

## Verification To Re-run

From `dsmb-training-prototype/`:

```bash
node --check app.js
node --check data/trainings.js
```

Recommended browser verification:

- Open the prototype in a browser.
- Start several trainings.
- Confirm highlighted controls are not greyed out.
- Confirm free-text steps require typing and dropdown steps show selectable options.
- Confirm all trainings can complete.

The previous full Playwright verification checked:

- 17 trainings.
- 109 steps.
- 0 missing targets.
- 0 disabled active controls.
- 0 low-opacity active controls.
- 0 muted active controls.

## What Was Not Included

Original external reference materials were intentionally excluded.

Reason:

- They are not needed to run or continue the standalone prototype.
- The prototype already incorporates the relevant visual/function lessons using synthetic data.

Potential blocker:

- A future Codex will not be able to inspect the original visual references directly. If more UI fidelity is needed, a human should provide newly deidentified reference material or explicit written UI notes.

Existing zip files from the working folder were also excluded.

Reason:

- They duplicate the same content and can make the package confusing or stale.
- This transfer package is the source of truth.

Older Playwright PNG captures from `output/playwright/` were excluded.

Reason:

- They were visual artifacts from an older COI orientation pass and may not reflect the current state.
- If visual captures are needed, regenerate them from the current files after opening the package.

Local CROMS source code and the meeting-summary document referenced in `docs/CROMS_DSMB_bulk_upload_discovery.md` were not included.

Reason:

- They live outside this training package and may be access-controlled or too large.

Potential blocker:

- If someone needs to wire this training into the actual CROMS application or validate backend/API behavior, they will need access to the real CROMS source repository and relevant environment documentation.

## Suggested Prompt For The Next Codex

Use `handoff_prompt_for_next_codex.txt` as the first message or attach it with this package.
