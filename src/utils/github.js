const AUTH_URL = "https://github.com/login/oauth/authorize";

export function login() {
  const state = encodeURIComponent(
    JSON.stringify({
      url: location.href,
    })
  );

  open(
    `${AUTH_URL}?client_id=${this.key}&state=${state}`,
    "popup"
  );
}
