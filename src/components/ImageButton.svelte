<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let image: string;
  export let disabled: boolean = false;

  const dispatcher = createEventDispatcher();
  let onClick = (event?: any) => {
    dispatcher("click", event);
  };
</script>

<label
  class="d-flex align-items-center justify-content-center justify-content-lg-start mb-0 mb-lg-3 pb-1">
  <div class="car-model-btn-wrap">
    <button
      class="bg-transparent car-model-btn border-1 p-0"
      class:opacity-100={disabled}
      on:click={onClick}>
      <img src={image} class="img-fluid" alt="" />
    </button>
  </div>
</label>

<style lang="scss">
  .car-model-btn-wrap {
    cursor: pointer;
    border: 1px solid rgb(171, 187, 190);
  }

  .car-model-btn {
    display: inline-block;
    transform: scale(0.93);
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    transition: all 1s ease;
    overflow: hidden;

    img {
      transition: 0.85s;
      display: block;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
</style>
