<script lang="ts">
  import type { CarColor } from "../stores/carInfoStore";
  export let variant: CarColor | undefined;
</script>

<div
  class="selected-card-el"
  style="--primary-color: {variant?.primaryColor}; --secondary-color: {variant?.secondaryColor}; --tick-color: {variant?.tickColor};">
</div>
<div>
  {variant?.displayName}
</div>
