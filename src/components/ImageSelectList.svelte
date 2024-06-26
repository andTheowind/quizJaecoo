<script lang="ts">
  import ImageButton from "./ImageButton.svelte";
  import SelectList from "./SelectList.svelte";
  import ListItem from "./ListItem.svelte";
  import { createEventDispatcher } from "svelte";

  export let selectedValue: string | undefined = undefined;
  export let values: { value: string; image: string }[] = [];

  const dispatcher = createEventDispatcher();
</script>

<SelectList bind:value={selectedValue}>
  {#each values as { value, image }}
    <ListItem {value} let:select let:itemSelected>
      <ImageButton
        {image}
        on:click={() => {
          console.log('Image List');
          select();
          dispatcher("click", selectedValue);
        }}
        disabled={!itemSelected} />
    </ListItem>
  {/each}
</SelectList>
