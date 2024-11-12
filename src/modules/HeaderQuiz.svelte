<script lang="ts">
  import AppModal from "@modules/AppModal.svelte";
</script>

<header class="header bg-yadarksapphire py-2 py-lg-3">
  <div class="container">
    <div class="row justify-content-between align-items-center flex-wrap">
      <div
        class="сol-6 col-sm-auto first-header-block justify-content-between justify-content-xl-start col-md-12 col-xl-4 d-flex align-items-center">
        <div class="me-3 d-md-block">
          <a href="./" class="pt-0 pt-md-3 logo-link">
            <img src="./img/logo.svg" class="pt-1 pb-0" />
            <span class="c-yawhite bg-yawhite"></span>
          </a>
        </div>
        <div
          class="d-flex justify-content-start align-items-center c-yawhite ms-1">
          <div class="logo-wrap-txt text-white b-l-yawhite ps-lg-3 pt-1">
            <div class="s-xs-14 s18 m-0 text-uppercase pt-1">Юг-Авто</div>
            <div class="s13 pt-0">Официальный дилер</div>
          </div>
        </div>
      </div>
      <div
        class="сol-6 col-sm-auto second-header-block d-flex align-items-md-center justify-content-md-between pt-lg-2 pt-xl-0">
        <div
          class="header-group-blocks me-0 me-md-2 ms-2 ms-md-0 s-xs-12 s16 mb-2 mb-sm-0">
          <a
            href="tel:+78612032914"
            class="d-flex text-decoration-none c-yawhite">
            <img src="./img/header-mark.svg" class="ms-2 ps-1 me-1 me-md-2" />
            <span class="ms-1 d-inline-block text-white pe-3"
              >+7 (861) 203-29-14</span>
          </a>
        </div>
        <div
          class="header-group-blocks c-yawhite me-0 me-md-2 ms-2 ms-md-0 s-xs-12 s16">
          <a
            href="https://yandex.ru/maps/35/krasnodar/?ll=38.944918%2C44.974635&amp;mode=routes&amp;rtext=~44.974635%2C38.944918&amp;rtt=auto&amp;ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTk4ODgyNjg4EnjQoNC-0YHRgdC40Y8sINCg0LXRgdC_0YPQsdC70LjQutCwINCQ0LTRi9Cz0LXRjywg0LDRg9C7INCi0LDRhdGC0LDQvNGD0LrQsNC5LCDQmtGA0LDRgdC90L7QtNCw0YDRgdC60LDRjyDRg9C70LjRhtCwLCAzLzEiCg3UxxtCFeHlM0I%2C&amp;z=15.27"
            target="_blank"
            class="d-inline-flex w-auto pt-md-1">
            <img
              src="./img/header-phone.svg"
              class="ms-2 ps-1 me-1 me-md-2 pt-md-1" />
            <span
              class="ms-1 d-inline-flex d-md-inline flex-column text-white text-decoration-none pt-1">
              пос. Яблоновский,
              <span class="nowrap-sm">ул. Краснодарская,3</span>
            </span>
          </a>
        </div>
        <div class="header-group-blocks header-btn-wrap me-0 ms-md-2">
          <AppModal></AppModal>
        </div>
      </div>
    </div>
  </div>
</header>

<style lang="scss">
  .header {
    a,
    .header-group-blocks a {
      text-decoration: none;
    }

    .logo-wrap-txt {
      text-align: left;

      @media (max-width: 1199.98px) {
        border-left: none !important;
      }

      @media (min-width: 1200px) {
        position: relative;

        div {
          padding-left: 0.185rem;
        }

        &::before,
        &::after {
          content: "";
          position: absolute;
          left: -3px;
          width: 3px;
          background-color: #0d171a;
        }

        &::before {
          top: -2px;
          height: 14px;
        }

        &::after {
          bottom: -5px;
          height: 10px;
        }
      }
    }

    .header-group-blocks {
      .callback-btn,
      .first-header-block .head-btn {
        background-color: #00657b;
        color: #fff;
      }

      @media (max-width: 767.98px) {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: flex-end;

        a {
          width: 100%;
        }

        span {
          white-space: normal;
          text-align: left;
        }

        .header-group-blocks:first-child span {
          padding-top: 3px;
        }
      }

      @media (max-width: 479.98px) {
        .header-group-blocks:first-child a {
          align-items: center;
        }
      }
    }

    .header-wrap-icon {
      max-width: 22px;
      min-height: 22px;
    }

    .first-header-block {
      @media (max-width: 767.98px) {
        margin-top: 2px;
        display: flex;
        justify-content: flex-start !important;
        align-items: flex-start !important;
        flex-direction: column;
        width: 48%;

        .logo-link img {
          max-width: 100%;
          height: auto;
        }
      }

      @media (min-width: 992px) and (max-width: 1199.98px) {
        justify-content: flex-start !important;
      }

      @media (max-width: 393.98px) {
        padding-right: 0;
        width: 47%;
      }

      @media (max-width: 349.98px) {
        width: 45%;
      }
    }

    .second-header-block {
      @media (max-width: 991.98px) {
        margin-top: 20px;
        padding-bottom: 5px;
      }

      @media (max-width: 767.98px) {
        margin-top: 24px;
        margin-bottom: 5px;
        flex-direction: column;
        width: 52%;
      }

      @media (max-width: 393.98px) {
        width: 53%;
        padding-left: 0;
      }

      @media (max-width: 349.98px) {
        width: 55%;
      }

      @media (min-width: 768px) and (max-width: 1199.98px) {
        width: 100%;
      }
    }

    .first-header-block .s13,
    .header-group-blocks a,
    .header-group-blocks span {
      @media (max-width: 991.98px) {
        font-size: 14px !important;
      }

      @media (max-width: 479.98px) {
        font-size: 12px !important;
      }

      @media (max-width: 393.98px) {
        font-size: 11px !important;
      }

      @media (max-width: 349.98px) {
        font-size: 10px !important;
      }
    }

    .first-header-block .s-xs-14 {
      @media (max-width: 479.98px) {
        font-size: 14px;
      }

      @media (max-width: 393.98px) {
        font-size: 12px;
      }
    }

    .b-l-yawhite {
      @media (min-width: 1200px) {
        border-left: 1px solid #fff;
      }
    }

    .callback-btn {
      @media (min-width: 768px) and (max-width: 1199.98px) {
        padding-top: 9px !important;
        padding-bottom: 7px !important;
      }
    }
  }
</style>
