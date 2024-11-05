<script lang="ts">
  export let amountCars: number = 0;
</script>

<div class="final-text">
  <p class="h4">За вашим номером закреплен бонус от салона:</p>
  <p class="h1 pt-1">КАСКО В ПОДАРОК**</p>
  <p class="h5 pt-3">По вашим параметрам найдено {amountCars} автомобилей</p>
</div>

<style lang="scss">
  .final-text {
    text-align: left;
  }

  @media (max-width: 767.98px) {
    .final-text .h4 {
      font-size: 15px;
    }

    .final-text .h1 {
      font-size: 30px;
      font-family: "Dopis Bold";
    }

    .final-text .h5 {
      font-size: 14px;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .final-text .h4 {
      font-size: 19px;
    }

    .final-text .h1 {
      font-size: calc(1.175rem + 1.35vw) !important;
    }

    .final-text .h5 {
      font-size: 17px;
    }
  }
</style>
