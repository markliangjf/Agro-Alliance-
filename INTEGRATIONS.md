# Enquiry and measurement integrations

Implementation status: approved for publication on 2026-10-30 SGT. Web enquiry delivery and analytics remain disabled until the accounts below are connected and verified. VERSIONS.md records only confirmed successful deployments.

## What is implemented

- Shorter enquiry form with optional quantity and expandable shipment details.
- Product links preselect the corresponding product through an allowlisted query parameter.
- Formspree AJAX transport with explicit acceptance checks, loading and duplicate-click protection, timeout/rejection states and retained field values.
- Email and WhatsApp draft alternatives. Opening a draft does not count as a received enquiry.
- Urea and ammonium sulphate pages, distinct titles/descriptions, canonical URLs, WebPage/BreadcrumbList structured data, internal links and sitemap entries.
- Optional, consent-based GA4 events. No visitor form data is included in event parameters.
- A privacy page explaining submission routing and optional analytics. Review the description against the chosen provider configuration before publication.

## Still required before live website submissions

1. Sign in to the owner's Formspree account, or create one if needed. The owner must handle credentials, email verification and agreement acceptance.
2. Create a form named `Agro Alliance website enquiries`, routed to `info@agro-alliance.sg`. Confirm the receiving email.
3. Copy its public endpoint (`https://formspree.io/f/...`) to `formEndpoint` in `assets/site-config.js`. This is not a secret. Never put account credentials or server API keys in frontend code.
4. Check the provider's current plan limits, spam filtering and allowed-domain settings. Use the existing website origins; do not disable spam protections to make testing pass.
5. Complete one clearly labelled test submission through the real endpoint and verify both provider acceptance and arrival in the receiving inbox. Then set `formVerified: true`.
6. Confirm the actual Formspree response contract against the configured form. The client requires a successful response containing `ok: true`, not just any HTTP 200.

While unconfigured, production code hides the web-send button and leaves email/WhatsApp preparation available. Localhost and standalone exports always use clearly labelled preview states and never send enquiries. This draft cannot be described as delivering real enquiries until the end-to-end test succeeds.

## Still required before collecting analytics

1. Sign in to the owner's Google Analytics account and select/create the GA4 property and website stream for `https://agro-alliance.sg/`. Use Singapore time for reporting. Do not create duplicate properties if one already exists.
2. Put the public `G-...` measurement ID in `gaMeasurementId`. Never put a Measurement Protocol secret in the website.
3. Disable Enhanced Measurement automatic events for this stream (especially form interactions and outbound-click URLs); this integration sends its own allowlisted events. Disable user-provided data collection and advertising features.
4. Verify consent accepted, rejected and withdrawn; no Google script should load before consent. Supported DNT/GPC signals prevent initialization.
5. Verify events in the owner's realtime/debug report. Mark `generate_lead` as a key event only after the real form is connected and tested.

Events:

| Event | Meaning |
|---|---|
| page_view | A known website page was viewed after analytics consent. |
| product_view | A product card became at least 50% visible. |
| product_guide_view | A urea or ammonium sulphate guide was viewed. |
| enquiry_start | The visitor first entered information in the form. |
| enquiry_submit | A valid web submission was attempted. |
| generate_lead | The configured form service explicitly accepted a submission. This is not proof of inbox delivery, qualification or a sale. |
| enquiry_error | A submission could not be confirmed. |
| contact_click | An email or WhatsApp draft/contact link was opened; delivery is unknown. |

Only allowlisted page paths, product IDs, channel names and error categories are sent. Names, email addresses, company names, destination, quantity, free text, query strings and fragments are excluded. There is no analytics collector or historical visitor report until GA4 is connected.

For review, compare product-guide views, enquiry starts, confirmed service submissions and actual enquiries received in the mailbox. Consent and browser restrictions mean analytics will not represent every visit.

## Search Console

After the reviewed version is authorized and successfully deployed, use the owner's existing Search Console property to submit `https://agro-alliance.sg/sitemap.xml` and inspect the two new product URLs. Account/domain verification may require the owner. Do not claim indexing or ranking changes before they are observed. Product pages are editorial sourcing guides; they do not invent prices, stock, ratings or guaranteed certificates.

## Validation and previews

- `node --test scripts/enquiry.test.cjs`
- `python scripts/check_site.py`
- `python scripts/build_preview.py --output-dir <latest-preview-directory>`
- Browser: desktop/mobile form, optional quantity, product preselection, expandable fields, duplicate-submit protection and retained values on failure.
- Local-only failure demonstrations: `index.html?form-test=error#contact` and `index.html?form-test=timeout#contact`. They never enable external submissions.

The reviewed version must be explicitly approved before deployment. Only a successful deployment is added to VERSIONS.md and synchronized to the official backup branch.
