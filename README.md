# Agro Alliance Website

Static website for https://agro-alliance.sg/.

## Official backups

Open [VERSIONS.md](VERSIONS.md) for the five verified successful releases, their Singapore deployment times, change summaries, source downloads and deployment evidence. Drafts, previews and undeployed records have been removed from this catalog.

Only successfully deployed official versions are backed up. Drafts and previews stay local. Raw Git history includes implementation steps and catalog maintenance; it is not the formal backup list. Existing ancestry remains to preserve official commit IDs and restore links.

To download a release, open its source link in VERSIONS.md and choose **Code > Download ZIP**. Open index.html after extraction, or run python scripts/build_preview.py to build the self-contained preview.

## Local working copy

Keep only the latest source and latest generated preview locally. Do not accumulate dated archives or old version folders. Keep history on GitHub. Verify the remote backup before removing an older local copy, and never delete unrelated user files.

The generated `agro-alliance-brand-preview.html` is a convenience export. The versioned source and assets are the backup of record.

## Deployment

Production uses GitHub Pages from main. Publish only after explicit user authorization, verify deployment success and live content, then add the official version to VERSIONS.md and synchronize versions. Failed deployments do not create formal backups. Requested catalog-only maintenance may update documentation on versions without publishing or creating a website release. Preserve these rules and the catalog in the next authorized release.

## Current official release: 2026-10-20

**Successfully deployed on 2026-10-20 at 14:43:20 SGT (workflow last update). Source: 865e187.**

See [VERSIONS.md](VERSIONS.md) for change summaries, Singapore timestamps and links to successful official backups and deployments. The Actions result confirms publication status.

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

