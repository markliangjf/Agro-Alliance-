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

## Current official release: 2026-10-27

**Successfully deployed at 2026-10-27 17:33:40 SGT (workflow last update). Source: [8b7759a](https://github.com/markliangjf/Agro-Alliance-/tree/8b7759ad2f9c0212813660c91e9c75382238aa6d). Deployment: [successful GitHub Pages run](https://github.com/markliangjf/Agro-Alliance-/actions/runs/40481581008).**

- Size desktop homepage sections around the available browser viewport while preserving natural mobile scrolling and readable expanded content.
- Replace the company teaser image with the supplied industrial campus architectural rendering, clearly labelled as a rendering.
- Add actual ammonium sulphate packaging photography and preserve full image proportions in the gallery.
- Make the eight-product range easier to discover with visible counts, prominent next/previous controls, direct page buttons and reduced-motion-aware arrow cues.
- JavaScript syntax and internal references checked; desktop and mobile previews reviewed. Production HTML, CSS, JavaScript and both new images returned HTTP 200 and matched approved local files. Product pagination verified on the live site.

See [VERSIONS.md](VERSIONS.md) for all nine successful official versions and deployment evidence.

## Source files

- `index.html`: homepage content
- `company.html`: company profile, supply and locations
- `assets/site.css`: responsive styles
- `assets/site.js`: navigation, product filters, gallery and enquiry builder
- `assets/optimized/`: displayed photographs and maps
- `assets/media/`: video
- `scripts/build_preview.py`: linked standalone previews for both pages

