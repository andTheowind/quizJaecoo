<script lang="ts">
  import ImageButton from "./ImageButton.svelte";
  import SelectList from "./SelectList.svelte";
  import ListItem from "./ListItem.svelte";
  import { createEventDispatcher } from "svelte";

  export let selectedValue: string | undefined = undefined;
  export let values: { value: string; image: string }[] = [];

  export let selectedClass: string = "";
  let isFirstSelection = true;

  const dispatcher = createEventDispatcher();
</script>

<SelectList bind:value={selectedValue}>
  {#each values as { value, image }}
    <ListItem {value} let:select let:itemSelected>
      <div class:selected={value === selectedValue}>
        <ImageButton
          {image}
          on:click={() => {
            selectedValue = value;
            select();
            dispatcher("click", selectedValue);
          }}
          disabled={!itemSelected} />
      </div>
    </ListItem>
  {/each}
</SelectList>
