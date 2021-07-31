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

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '579454524874-4b2t2vs9f7jvernrm76htb3ghp35pcs2.apps.googleusercontent.com',
                'redirect_uri': 'http://localhost:3000/auth/google/code',
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

// IN THE END

/*

http://localhost:3000/auth/google/code#state=pass-through%20value&access_token=ya29.a0ARrdaM-cVXCVX7oJoHn_faJdW3VnQ3VnUs_MgUUkRb60eb7wrbc43QSYHEpeSNc97iuaCjFbeIoubb5CSAcLqC03vFgcFAbxI8HFG7SO3hw_pLeXqyMVpl4N-QHHYtsz-vU_X-OUKdexsX4cs1HqMpsk-NuC&token_type=Bearer&expires_in=3599&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=0&prompt=consent
*/