'use strict';
// Public configuration only. Never put passwords or API secrets in this file.
window.AGRO_CONFIG = Object.freeze({
  formEndpoint: '', // Verified Formspree endpoint: https://formspree.io/f/<form-id>
  formVerified: false, // Enable only after a real submission reaches info@agro-alliance.sg.
  gaMeasurementId: '', // GA4 web-stream measurement ID. Optional analytics stays off until configured.
  productionHosts: ['agro-alliance.sg', 'www.agro-alliance.sg']
});
