<script lang="ts">
  import SelectList from "./SelectList.svelte";
  import ListItem from "./ListItem.svelte";
  import RadioButton from "./RadioButton.svelte";
  import { createEventDispatcher } from "svelte";
  type Value = {
    value: string;
    displayName: string;
  };
  export let selectedValue: string | undefined = undefined;
  export let values: Value[] = [];

  const dispatcher = createEventDispatcher();
</script>

<SelectList bind:value={selectedValue}>
  {#each values as { value, displayName }}
    <ListItem {value} let:select let:itemSelected>
      <RadioButton
        {displayName}
        on:click={() => {
          select();
          dispatcher("click", selectedValue);
        }}
        disabled={!itemSelected} />
    </ListItem>
  {/each}
</SelectList>
