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

## Current official release: 2026-10-21

**Successfully deployed at 2026-10-21 02:05:12 SGT (workflow last update). Source: [94a93b5](https://github.com/markliangjf/Agro-Alliance-/tree/94a93b5da853bb86d9f68b856a856cb83a8e3b70).**

- Title: Agro Alliance | International Fertilizer Trade.
- Add brand favicon PNG and multi-size ICO, preserving the full company logo.
- Add WebSite identity and explicit Organization logo metadata; align search/share title and description.
- Add robots.txt and sitemap.xml.
- Successful deployment and live HTTP 200 checks confirmed for HTML, icons, robots.txt and sitemap.xml. Desktop preview was visually inspected. Google search display remains subject to recrawling and selection. Search Console submission and hosting redirects were not changed.

See [VERSIONS.md](VERSIONS.md) for successful official versions and deployment evidence.

## Source files

- `index.html`: page content
- `assets/site.css`: responsive styles
- `assets/site.js`: navigation, product filters, gallery and enquiry builder
- `assets/optimized/`: displayed photographs and maps
- `assets/media/`: video
- `scripts/build_preview.py`: standalone preview export

