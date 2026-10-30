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

## Current official release: 2026-10-30

**Successfully deployed at 2026-10-30 17:08:59 SGT (workflow last update). Source: [fdd220b](https://github.com/markliangjf/Agro-Alliance-/tree/fdd220b9b84b2ba402bca6f767950faede8aca63). Deployment: [successful GitHub Pages run](https://github.com/markliangjf/Agro-Alliance-/actions/runs/41031205684).**

- Add independent urea and ammonium sulphate sourcing guides, unique metadata, canonical URLs, structured data, internal links and sitemap entries.
- Simplify enquiries with optional quantity, expandable requirements and product preselection. Keep WhatsApp and email drafts available.
- Include privacy information and tested integrations; direct web delivery and GA4 remain disabled pending verified account setup. See [INTEGRATIONS.md](INTEGRATIONS.md).
- Six functional tests and static link/metadata checks passed; desktop and mobile previews reviewed. Live HTML, sitemap and all changed runtime scripts/styles returned HTTP 200 and matched approved source. Product-to-enquiry selection and disabled integration state verified on the live site.

See [VERSIONS.md](VERSIONS.md) for all ten successful official versions and deployment evidence.

## Source files

- `index.html`: homepage content
- `company.html`: company profile, supply and locations
- `assets/site.css`: responsive styles
- `assets/site.js`: navigation, product filters and gallery
- `assets/optimized/`: displayed photographs and maps
- `assets/media/`: video
- `scripts/build_preview.py`: linked standalone previews for all five pages


- `urea.html`, `ammonium-sulphate.html`: product sourcing guides
- `privacy.html`: enquiry data and optional analytics information
- `assets/growth.css`: enquiry and product-guide styles
- `assets/enquiry-core.js`, `assets/enquiry.js`: enquiry validation and delivery/draft handling
- `assets/analytics.js`, `assets/site-config.js`: optional analytics and public integration configuration
