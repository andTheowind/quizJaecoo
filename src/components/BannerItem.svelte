<script lang="ts">
  export let imgSrc: string;
</script>

<li class="banner-list-item-wrap col-12 col-md-6 col-lg-6 ps-0 pe-0 ps-md-2">
  <div class="banner-list-item">
    <img src={imgSrc} />
    <span><slot /></span>
  </div>
</li>

<style lang="scss">
  .banner-list-item-wrap {
    list-style: none;
  }

  .banner-list-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    font-size: 18px;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.5);
    width: 100%;
    padding: 6px 10px;
    margin-bottom: 6px;

    &:not(:last-child) {
      margin-bottom: 17px;
    }

    img {
      margin-right: 20px;
      max-width: 24px;
      max-height: 24px;
    }

    @media (max-width: 767.98px) {
      font-size: 14px;
      line-height: 20px;
      padding: 4px 8px;

      &:not(:last-child) {
        margin-bottom: 8px;
      }

      img {
        height: 24px;
        width: 24px;
      }
    }

    @media (max-width: 479.98px) {
      font-size: 13px;
      padding: 3px 6px;

      &:not(:last-child) {
        margin-bottom: 6px;
      }

      span {
        padding-top: 3px;
      }
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 13px;

      &:not(:last-child) {
        margin-bottom: 14px;
      }
    }

    @media (min-width: 992px) and (max-width: 1199.98px) {
      font-size: 15px;
    }

    @media (min-width: 1200px) and (max-width: 1919.98px) {
      font-size: 16px;
    }
  }
</style>
