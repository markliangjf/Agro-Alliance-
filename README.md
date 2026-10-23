# Agro Alliance Website

Static website for https://agro-alliance.sg/.

## Official backups

Open [VERSIONS.md](VERSIONS.md) for the verified successful releases, their Singapore deployment times, change summaries, source downloads and deployment evidence. Drafts, previews and undeployed records have been removed from this catalog.

Only successfully deployed official versions are backed up. Drafts and previews stay local. Raw Git history includes implementation steps and catalog maintenance; it is not the formal backup list. Existing ancestry remains to preserve official commit IDs and restore links.

To download a release, open its source link in VERSIONS.md and choose **Code > Download ZIP**. Open index.html after extraction, or run python scripts/build_preview.py to build the self-contained preview.

## Local working copy

Keep only the latest source and latest generated preview locally. Do not accumulate dated archives or old version folders. Keep history on GitHub. Verify the remote backup before removing an older local copy, and never delete unrelated user files.

The generated `agro-alliance-brand-preview.html` is a convenience export. The versioned source and assets are the backup of record.

## Deployment

Production uses GitHub Pages from main. Publish only after explicit user authorization, verify deployment success and live content, then add the official version to VERSIONS.md and synchronize versions. Failed deployments do not create formal backups. Requested catalog-only maintenance may update documentation on versions without publishing or creating a website release. Preserve these rules and the catalog in the next authorized release.

## Current official release: 2026-10-22

**Successfully deployed at 2026-10-22 01:18:38 SGT (workflow last update). Source: [53bb17b](https://github.com/markliangjf/Agro-Alliance-/tree/53bb17b21e4d7cb89d4d57045070cfc0707fe8ca).**

- Add potassium nitrate and calcium nitrate product cards, filters, comparison rows and enquiry selections.
- Update homepage product range and search/share descriptions.
- Use public-domain reference photographs by Ondrej Mangl, with on-page reference-image labels and source credits. Full source details: [assets/PHOTO-SOURCES.md](assets/PHOTO-SOURCES.md).
- Specifications, appearance and documents remain subject to enquiry; no unverified grades or certifications added.
- GitHub Pages succeeded. Live HTML and both photo URLs returned HTTP 200. Desktop photo layout and image loading inspected; new enquiry selections were verified during preview. No mobile visual review performed for this release.

See [VERSIONS.md](VERSIONS.md) for successful official versions and deployment evidence.

## Source files

- `index.html`: page content
- `assets/site.css`: responsive styles
- `assets/site.js`: navigation, product filters, gallery and enquiry builder
- `assets/optimized/`: displayed photographs and maps
- `assets/media/`: video
- `scripts/build_preview.py`: standalone preview export

