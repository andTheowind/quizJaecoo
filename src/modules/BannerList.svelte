<script lang="ts">
  import BannerItem from "@components/BannerItem.svelte";
</script>

<ul class="banner-list row col-12 col-lg-8 col-xl-7 offset-xl-1 ps-0 pe-0 mb-0">
  <BannerItem imgSrc="./img/icons/icon-banner-2.svg">
    Автомобили в наличии с ПТС
  </BannerItem>
  <BannerItem imgSrc="./img/icons/icon-banner-4.svg">
    7 лет поддержки
  </BannerItem>
  <BannerItem imgSrc="./img/icons/icon-banner-3.svg">
    Авторассрочка до 84 месяцев
  </BannerItem>
  <BannerItem imgSrc="./img/icons/icon-banner-1.svg">
    Дарим бонусы по TRADE IN
  </BannerItem>
</ul>

<style lang="scss">
  .banner-list {
    color: #000;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: center;
    margin-left: 0;
    z-index: 3;

    @media (max-width: 991.98px) {
      margin-left: var(--bs-gutter-y);
      margin-right: var(--bs-gutter-y);
    }

    @media (max-width: 767.98px) {
      margin-left: 0;
    }

    @media (max-width: 479.98px) {
      margin-bottom: 0;
    }

    @media (min-width: 1200px) and (max-width: 1919.98px) {
      // margin-bottom: 2rem;
    }

    @media (min-width: 1920px) {
      // margin-bottom: 4rem;
    }
  }
</style>
