const { KiteConnect } = require("kiteconnect");

const api_key = "y97q69n9pqqggpi0";
const api_secret = "tfxsypg6d3ztunyoedqfjy9dvw54uwa8";
const request_token = "wL03fMihw8xv1YadRlKCSRuHoSdC05kD"; // Paste here

const kc = new KiteConnect({ api_key });

kc.generateSession(request_token, api_secret)
  .then(response => {
    console.log("Your Access Token:", response.access_token);
    // Copy this token and paste into your .env as ZERODHA_ACCESS_TOKEN
  })
  .catch(err => {
    console.error("Error generating access token:", err);
  });
