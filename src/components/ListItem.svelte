<script lang="ts">
  import { ListKey, type ListContext } from "@lib/list";
  import { getContext } from "svelte";

  export let value: string;
  export let selected: boolean = false;

  const { setValue, value: selectedValue } = getContext<ListContext<string>>(ListKey);
  $: selected = value === $selectedValue;
  const select = (): boolean => {
    if (value === $selectedValue) {
      return false;
    }
    setValue(value);
    return true;
  };
</script>

<slot {select} itemSelected={selected} />
