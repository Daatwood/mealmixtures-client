/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
export default function oauthSignIn() {
  const ruuid = `g-${Date.now()}`
  sessionStorage.setItem("g-oauth-id", ruuid);


  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  const redirectBase = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://mealmixtures.com';

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '579454524874-4b2t2vs9f7jvernrm76htb3ghp35pcs2.apps.googleusercontent.com',
                'redirect_uri': redirectBase + '/auth/google/code',
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/userinfo.email',
                'include_granted_scopes': 'true',
                'state': ruuid};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}