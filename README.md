# Agro Alliance Website

Static website for https://agro-alliance.sg/.

## Version records

- Latest saved work: https://github.com/markliangjf/Agro-Alliance-/tree/versions
- All saved versions: https://github.com/markliangjf/Agro-Alliance-/commits/versions/
- Published source history: https://github.com/markliangjf/Agro-Alliance-/commits/main/
- Deployment results: https://github.com/markliangjf/Agro-Alliance-/actions

Every completed update is saved as a new commit on `versions`. Each commit records a complete source tree, including its images, maps and video, and a description of the changes. Prior commits remain accessible. A backup commit does not by itself mean the version was published.

To retrieve a version, open its commit, select **Browse files**, then **Code > Download ZIP**. Open `index.html` after extraction, or run `python scripts/build_preview.py` to create a self-contained HTML preview.

## Local working copy

Keep only the latest source and latest generated preview locally. Do not accumulate dated archives or old version folders. Keep history on GitHub. Verify the remote backup before removing an older local copy, and never delete unrelated user files.

The generated `agro-alliance-brand-preview.html` is a convenience export. The versioned source and assets are the backup of record.

## Deployment

Production uses GitHub Pages from `main`. Updating `main` may publish immediately. Save preview work on `versions`; publish only after the user explicitly authorizes deployment of the reviewed version. Retain previous history; never force-push or reset it to roll back. Restore an earlier source tree with a new commit when a rollback is requested.

## Current saved update: 2026-10-20

**Preview only; not deployed.**

- Emphasize Agro Alliance in the homepage and company section.
- Present Fujian Yaoda as manufacturing background.
- Use the general **Send an Enquiry** homepage action.
- Correct Chinese product names and damaged punctuation.
- Preserve the existing product range, maps, photographs, video and enquiry form.

Source-level checks are complete. Desktop and mobile visual review remains pending because browser access was unavailable.

## Source files

- `index.html`: page content
- `assets/site.css`: responsive styles
- `assets/site.js`: navigation, product filters, gallery and enquiry builder
- `assets/optimized/`: displayed photographs and maps
- `assets/media/`: video
- `scripts/build_preview.py`: standalone preview export

