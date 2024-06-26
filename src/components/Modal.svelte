<script lang="ts">
  export let showModal: boolean; // boolean

  let dialog: HTMLDialogElement; // Explicitly typed as HTMLDialogElement

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="dialog-container" on:click|stopPropagation>
    <slot name="header" />
    <slot />
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={() => dialog.close()}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <line
          x1="0.646447"
          y1="14.9306"
          x2="14.7886"
          y2="0.788491"
          stroke="#333333"></line>
        <line
          x1="1.35355"
          y1="0.646447"
          x2="15.4957"
          y2="14.7886"
          stroke="#333333"></line>
      </svg>
    </button>
  </div>
</dialog>

<style lang="scss">
  dialog {
    max-width: 34em;
    border: none;
    padding: 0;
    background-color: transparent;

    .dialog-container {
      position: relative;
      background-color: #fff;
    }
    &::backdrop {
      background: rgba(0, 0, 0, 0.46);
    }
    &[open] {
      animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    > div {
      padding: 1em 1.25em 0.5em 1.25em;
    }
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  button {
    position: absolute;
    content: " ";
    width: 16px;
    height: 16px;
    top: 4px;
    right: 4px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
    background: transparent;

    svg {
      min-width: 16px;

      line {
        stroke-width: 2px;
      }
    }
  }

  @media (max-width: 576px) {
    .dialog-container {
      margin-left: auto !important;
      margin-right: auto !important;
      max-width: 93%;
    }
  }
</style>
