<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let displayName: string;
  export let primaryColor: string = "#fff";
  export let secondaryColor: string = "#FCFFFF";
  export let tickColor: string = "#000";
  export let disabled: boolean = false;

  const dispatcher = createEventDispatcher();
  let onClick = (event?: any) => {
    dispatcher("click", event);
  };
</script>

<label
  class="d-flex align-items-center variant-wrap mb-lg-3 pb-1"
  class:pressed-btn={!disabled}>
  <div>
    <input
      class="variant"
      type="radio"
      on:click={onClick}
      style="--primary-color: {primaryColor}; --secondary-color: {secondaryColor}; --tick-color: {tickColor};"
      checked={!disabled} />
  </div>
  <span
    class="d-inline-block text-start ps-1 ms-2 mt-1 pt-1 pt-lg-2 pb-1 pb-lg-2"
    >{displayName}</span>
</label>

<style lang="scss">
  .variant-wrap {
    border: 0.5px solid rgb(171, 187, 190);
    padding: 5px 15px 5px 16px;
    cursor: pointer;
    transition: 0.55s;

    div {
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      height: auto;
      border-radius: 50%;
    }

    @media (min-width: 992px) and (max-width: 1199.98px) {
      padding: 5px 12px 5px 13px;

      span {
        font-size: 13.5px;
      }
    }

    @media (max-width: 991.98px) {
      margin-bottom: 10px;
    }
  }

  .variant {
    appearance: none;
    position: relative;
    width: 22px;
    height: 22px;
    border: 1px solid var(--primary-color);
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    transition: background 0.3s ease;
    background: linear-gradient(
      to bottom,
      var(--secondary-color) 50%,
      var(--primary-color) 50%
    );

    &::before {
      content: " ";
      width: 24px;
      height: 24px;
      position: absolute;
      left: -2.5px;
      top: -2.5px;
      border-radius: inherit;
    }

    &:checked::before {
      left: -0.75px;
      top: 46%;
      height: 37%;
      width: 2px;
      background-color: var(--tick-color);
      transform: translateX(10px) rotate(-46deg);
      transform-origin: left bottom;
      border-radius: 0;
    }

    &::after {
      content: " ";
      position: absolute;
      opacity: 0;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    &:checked::after {
      top: 70%;
      height: 2px;
      width: 55%;
      left: -0.5px;
      background-color: var(--tick-color);
      transform: translateX(10px) rotate(-55deg);
      transform-origin: left bottom;
      opacity: 1;
    }

    &[value="white"]::after {
      opacity: 1;
    }
  }

  .pressed-btn {
    background-color: #abbbbe;
    transition: 0.85s;
  }

  @media (max-width: 479.98px) {
    label {
      font-size: 14px;
      padding-bottom: 1px !important;
    }
  }
</style>
