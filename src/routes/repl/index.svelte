<script>
  import Repl from "@sveltejs/svelte-repl";
  import { onMount } from "svelte";
  import InputOutputToggle from "../../components/Repl/InputOutputToggle.svelte";
  import { svelteUrl, rollupUrl } from "../../config";
  import helloWorld from "./hello-world";
  import AppControls from "./_components/AppControls/index.svelte";

  let repl;
  let gist;
  let zen_mode = false;
  let width = process.browser ? window.innerWidth : 1000;
  let checked = false;

  const data = helloWorld;
  let name = data.name;

  const components = data.files.map((file) => {
    const dot = file.name.lastIndexOf(".");
    let fileName = file.name.slice(0, dot);
    let type = file.name.slice(dot + 1);

    if (type === "html") type = "svelte"; // TODO do this on the server
    return { name: fileName, type, source: file.source };
  });

  onMount(() => {
    repl.set({ components });
  });

  function handle_fork(event) {
    console.log("> handle_fork", event);
  }

  $: mobile = width < 540;
</script>

<style>
  .repl-outer {
    position: relative;
    height: 100vh;
    --app-controls-h: 5.6rem;
    --pane-controls-h: 4.2rem;
    overflow: hidden;
    background-color: var(--back);
    padding: var(--app-controls-h) 0 0 0;
    /* margin: 0 calc(var(--side-nav) * -1); */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .viewport {
    width: 100%;
    height: 100%;
  }

  .mobile .viewport {
    width: 200%;
    height: calc(100% - 42px);
    transition: transform 0.3s;
    flex: 1;
  }

  .mobile .offset {
    transform: translate(-50%, 0);
  }

  /* temp fix for #2499 and #2550 while waiting for a fix for https://github.com/sveltejs/svelte-repl/issues/8 */

  .viewport :global(.tab-content),
  .viewport :global(.tab-content.visible) {
    pointer-events: all;
    opacity: 1;
  }
  .viewport :global(.tab-content) {
    visibility: hidden;
  }
  .viewport :global(.tab-content.visible) {
    visibility: visible;
  }

  .zen-mode {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 111;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

<svelte:head>
  <title>{name} • REPL • Svelte</title>

  <meta name="twitter:title" content="Svelte REPL" />
  <meta name="twitter:description" content="Cybernetically enhanced web apps" />
  <meta name="Description" content="Interactive Svelte playground" />
</svelte:head>

<svelte:window bind:innerWidth={width} />

<div class="repl-outer {zen_mode ? 'zen-mode' : ''}" class:mobile>
  <AppControls {gist} {repl} bind:name bind:zen_mode on:forked={handle_fork} />

  {#if process.browser}
    <div class="viewport" class:offset={checked}>
      <Repl
        bind:this={repl}
        workersUrl="workers"
        {svelteUrl}
        {rollupUrl}
        relaxed={true}
        fixed={mobile} />
    </div>

    {#if mobile}
      <InputOutputToggle bind:checked />
    {/if}
  {/if}
</div>
