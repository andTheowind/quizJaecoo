<script lang="ts">
  export let imgSrc: string;
</script>

<li class="banner-list-item">
  <img src={imgSrc} />
  <span><slot /></span>
</li>

<style lang="scss">
  .banner-list-item {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 24px;

    &:not(:last-child) {
      margin-bottom: 17px;
    }
  }

  img {
    margin-right: 20px;
  }

  @media (max-width: 767.98px) {
    .banner-list-item {
      font-size: 16px;
      line-height: 20px;

      &:not(:last-child) {
        margin-bottom: 8px;
      }

      img {
        height: 24px;
        width: 24px;
      }
    }
  }

  @media (max-width: 479.98px) {

    .banner-list-item {
      font-size: 15px;

      &:not(:last-child) {
        margin-bottom: 6px;
      }
      span {
        padding-top: 3px;
      }
    }

  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .banner-list-item {
      font-size: 18px;

      &:not(:last-child) {
        margin-bottom: 14px;
      }
    }
  }

  @media (min-width: 992px) and (max-width: 1199.98px) {
    .banner-list-item {
      font-size: 19px;
    }
  }

  @media (min-width: 1200px) and (max-width: 1919.98px) {
    .banner-list-item {
      font-size: 21px;
    }
  }
</style>
