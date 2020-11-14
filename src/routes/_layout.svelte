<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const AUTH_URL = "https://github.com/login/oauth/authorize";
  const GITHUB_CLIENT_ID = "702a29918029a0ad502c";

  setContext("app", {
    login: () => {
      const login_window = window.open(
        `${AUTH_URL}?client_id=${GITHUB_CLIENT_ID}`,
        "login",
        "width=600,height=400"
      );

      window.addEventListener("message", function handler(event) {
        login_window.close();
        window.removeEventListener("message", handler);
      });
    },

    logout: async () => {
      const r = await fetch(`/auth/logout`, {
        credentials: "include",
      });
    },

    session: writable({}),
  });
</script>

<style>
  main {
    position: relative;
    margin: 0 auto;
    overflow-x: hidden;
  }
</style>

<main>
  <slot />
</main>
