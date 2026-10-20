# Website working instructions

User preferences confirmed 2026-10-20:

- Continue the existing design. Agro Alliance is the primary brand; Yaoda is supporting manufacturing background. General enquiries cover all products.
- Back up every completed website update to `markliangjf/Agro-Alliance-` on the `versions` branch. Append commits and preserve history; never force-push or reset.
- Check the remote branch head before saving; preserve concurrent changes.
- For every completed update, append a VERSIONS.md entry with the change summary, Singapore date/time (SGT, UTC+8), and verification/deployment status. GitHub commit and Actions timestamps remain authoritative. Preserve all prior entries.
- After saving, give the user the exact commit link and version history link.
- Backup does not authorize deployment. Keep preview-only work off `main`; updating main may immediately publish via GitHub Pages. Publish only after explicit user authorization for the reviewed version.
- Locally keep only the latest source and latest preview. Verify remote backup before removing obsolete local copies. Preserve unrelated user files.
- README.md documents the backup and deployment links. scripts/build_preview.py regenerates the standalone HTML from the versioned source and assets.
- Source checks are not visual acceptance. Report desktop/mobile review as pending until rendered inspection succeeds.

