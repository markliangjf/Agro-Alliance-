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

## Current official release: 2026-10-24

**Successfully deployed at 2026-10-24 02:03:19 SGT (workflow last update). Source: [ceea8ce](https://github.com/markliangjf/Agro-Alliance-/tree/ceea8ce1041ab37b93872c596b6096d89c972692).**

- Refresh homepage proportions, emphasize Agro Alliance, and remove the repeated hero logo.
- Add scroll reveals and hover interactions with reduced-motion support; simplify homepage text and collapse product details.
- Add company.html with company profile, manufacturing heritage, supply and shipping, documentation guidance and location maps.
- Keep the eight-product range and general enquiries; add the company page to sitemap.xml.
- JavaScript syntax and internal links checked; desktop, tablet and mobile layouts visually reviewed before deployment. GitHub Pages succeeded; live HTML, CSS, JavaScript and sitemap returned HTTP 200 and matched approved source text. Live company navigation and image loading verified with no browser console errors observed.

See [VERSIONS.md](VERSIONS.md) for successful official versions and deployment evidence.

## Source files

- `index.html`: homepage content
- `company.html`: company profile, supply and locations
- `assets/site.css`: responsive styles
- `assets/site.js`: navigation, product filters, gallery and enquiry builder
- `assets/optimized/`: displayed photographs and maps
- `assets/media/`: video
- `scripts/build_preview.py`: linked standalone previews for both pages

