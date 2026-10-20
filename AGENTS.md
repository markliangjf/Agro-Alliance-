# Website working instructions

User preferences updated 2026-10-20 (SGT):

- Continue the existing design. Agro Alliance is the primary brand; Yaoda is supporting manufacturing background. General enquiries cover all products.
- Back up ONLY successfully deployed official website versions. Drafts, previews, experiments, undeployed and failed versions stay local. This supersedes the former every-update backup policy.
- Publish only after explicit user authorization for the reviewed version. Pushing approved source to main starts deployment; it is not evidence of success.
- Verify GitHub Pages success and live content before adding a formal backup. Record changes, SGT time, exact production commit and successful workflow link in VERSIONS.md.
- VERSIONS.md is the official backup index. Only successful production commits may appear as version rows. Do not label raw commit history as the backup list.
- The versions branch contains the latest successful website source plus backup-catalog documentation. Documentation-only maintenance is allowed when requested, is not a website release or backup, and must not change site files or update main.
- Before changing either branch, check its current head and preserve concurrent changes. Include current backup rules/catalog in the next authorized release so they are not lost when synchronizing versions.
- User requested removing non-release backup entries. These have been removed from the catalog; underlying ancestry is retained to preserve the original successful release SHAs and restore links. Do not claim Git objects have been deleted. Never rewrite formal release history without explicit agreement on changed links.
- Give the user the official index and exact successful production commit after a release.
- Locally keep only the latest source and latest preview. Preserve unrelated user files; verify the formal backup before removing superseded release copies.
- Source checks do not prove visual acceptance. Report desktop/mobile visual review accurately.
