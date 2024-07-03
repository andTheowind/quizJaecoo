<script lang="ts">
  import BannerItem from "@components/BannerItem.svelte";
</script>

<ul class="banner-list">
  <BannerItem imgSrc="./img/icons/icon-banner-1.svg">Дарим бонусы по TRADE IN</BannerItem>
  <BannerItem imgSrc="./img/icons/icon-banner-2.svg">Авторассрочка до 84 месяцев</BannerItem>
  <BannerItem imgSrc="./img/icons/icon-banner-3.svg">Автомобили в наличии с ПТС</BannerItem>
  <BannerItem imgSrc="./img/icons/icon-banner-4.svg">Гарантия до 7 лет</BannerItem>
</ul>

<style lang="scss">
  .banner-list {
    backdrop-filter: blur(10px);
    color: #000;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    padding: 20px 22px 20px 20px;
    margin-left: 0;
    z-index: 3;
  }

  @media (max-width: 767.98px) {
    .banner-list {
      margin-left: 0;
      padding: 17px 19px 17px 17px;
    }
  }

  @media (max-width: 479.98px) {
    .banner-list {
      margin-bottom: 0px;
      padding: 15px 17px 15px 15px;
    }
  }

  @media (max-width: 374.98px) {
    .banner-list {
      padding: 12px 14px 12px 12px;
    }
  }

  @media (min-width: 1200px) and (max-width: 1919.98px) {
    .banner-list {
      margin-bottom: 2.5rem;  
    }
  }

  @media (min-width: 1920px) {
    .banner-list {
      margin-bottom: 4rem;  
    }
  }
</style>
