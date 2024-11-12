<script lang="ts">
  export let total: number;
  export let active: number;
</script>

<div class="lines pb-3 pb-lg-0 mb-2 mb-lg-0">
  {#each Array(total) as _, index}
    <div class="line" class:active={index >= active} />
  {/each}
</div>

<style lang="scss">
  .lines {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 1rem;
    margin-bottom: 0.5rem;

    @media (min-width: 992px) {
      display: none;
    }

    .line {
      background-color: #054856;
      height: 5px;
      margin: 0 2%;
      width: 25%;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &.active {
        background-color: #abbbbe;
      }
    }
  }
</style>
