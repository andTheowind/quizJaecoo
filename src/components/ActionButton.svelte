<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let className = "";
  export { className as class };
  export let id = "";
  export let type: "button" | "submit" | "reset" | null | undefined = "button";

  let executing = false;
  const dispatch = createEventDispatcher();

  async function onClick() {
    executing = true;
    try {
      await new Promise<void>((resolve) => {
        const detail = { done: resolve, async: false };
        dispatch("click", detail);

        if (detail.async == false) resolve();
      });
    } finally {
      executing = false;
    }
  }
</script>

{#if !executing}
  <button {type} on:click={onClick} class={className} {id}>
    <slot />
  </button>
{:else}
  [Executing]
{/if}
