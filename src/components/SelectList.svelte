<script lang="ts">
  import { ListKey, type ListContext } from "@lib/list";
  import { setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";

  let selectedValue: Writable<string> = writable("");

  setContext(ListKey, {
    value: selectedValue,
    setValue: (value: string) => {
      $selectedValue = value;
    },
  } as ListContext<string>);

  export let value: string | undefined;
  $: value = $selectedValue;
</script>

<slot />
