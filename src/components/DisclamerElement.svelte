<script>
  let showDetails = false;

  function toggleDetails() {
    showDetails = !showDetails;
  }
</script>

<div class="show-more s12 pt-md-2">
  <p class="mb-0 d-none">
    * Указан максимальный размер выгоды потребителя на JAECOO J7 (Джейку Джей 7)
    комплектации Active (Эктив), которая состоит из скидок:
    {#if showDetails}
      <div class="details visible">
        - программы Трейд-ин в размере 430 000 рублей. Под скидкой по программе
        Трейд-ин понимается единовременная и разовая скидка потребителю на все
        комплектации от розничной цены автомобиля, приобретаемого по Программе,
        при сдаче в зачёт его стоимости принадлежащего потребителю любого
        автомобиля с пробегом. Условия программы уточняйте в отделе продаж
        JAECOO Юг-Авто.
        <br />
        - скидки для клиента на новый автомобиль JAECOO J7 от дилерского центра JAECOO
        Юг-Авто. Информация действительна с 01.06.2024 по 30.06.2024.
        <br />
        Юридическая информация: ООО «Юг-Авто», ИНН 0107013299, ОГРН 1070107001304.
      </div>
    {/if}
    <a class="text-white" on:click={toggleDetails}>
      {#if showDetails}
        <span class="text-decoration-underline">скрыть</span>
      {:else}
        ... <span class="text-decoration-underline">подробнее</span>
      {/if}
    </a>
  </p>
</div>

<style lang="scss">
  .show-more {
    position: relative;
    z-index: 30;
    color: white;

    a {
      cursor: pointer;
    }
  }

  .details {
    display: none;
    .br {
      margin: 4px;
    }
  }

  .details.visible {
    display: block;
    padding-top: 5px;
  }

  @media (max-width: 479.98px) {
    .show-more {
      margin-top: -40px;
      min-height: 103px;
    }

    .show-more.s12 p {
      font-size: 9.5px !important;
    }
  }
</style>
