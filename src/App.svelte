<script lang="ts">
  import HeaderQuiz from "@modules/HeaderQuiz.svelte";
  import FooterQuiz from "@modules/FooterQuiz.svelte";
  import BannerTitle from "@modules/BannerTitle.svelte";
  import BannerList from "@modules/BannerList.svelte";
  import Quiz from "@modules/Quiz.svelte";
  import Cookie from "@components/Cookie.svelte";
  import DisclamerElement from "@components/DisclamerElement.svelte";

  let firstBanner = true;
</script>

<HeaderQuiz></HeaderQuiz>

<main>
  {#if firstBanner}
    <div class="container-fluid banner-wrapper px-0">
      <section class="banner">
        <div class="container">
          <div class="row w-100">
            <div class="col-12">
              <div class="banner-content text-start">
                <BannerTitle></BannerTitle>
                <div class="banner-btn-wrap">
                  <div class="container">
                    <div
                      class="row justify-content-between align-items-center align-items-lg-end">
                      <div class="col-12 col-lg-4 px-0">
                        <button
                          class="text-uppcase banner-btn"
                          on:click={() => (firstBanner = false)}>
                          <span>Подобрать автомобиль</span>
                        </button>
                        <div class="text-start pt-1 pt-xl-2">
                          <span class="d-block txt-sm fs-6 text-white">
                            Реклама. "ООО Юг-Авто". 2Vtzqwb4rC4
                          </span>
                        </div>
                      </div>
                      <BannerList></BannerList>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 
            <div class="col-12 text-white text-start disclamer-wrapper">
              <div class="pb-md-1 pb-lg-2">
                <DisclamerElement></DisclamerElement>
              </div>
            </div>
            -->
          </div>
        </div>
      </section>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="disclamer-wrapper-mob pt-0 pt-sm-2 pb-3 px-3">
              <DisclamerElement></DisclamerElement>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <Quiz></Quiz>
  {/if}

  <Cookie></Cookie>
</main>

<FooterQuiz></FooterQuiz>

<style lang="scss">
  .banner-wrapper {
    background-color: #191e18;
    position: relative;
  }

  .banner {
    background-image: url("./img/banner-lg-new-september2024-2.jpg?2");
    background-repeat: no-repeat;
    background-position: 50% 59%;
    background-size: cover;
    min-height: calc(100vh - 88px);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;

      > div {
        display: flex;
        flex-grow: 1;
      }
    }
  }

  .banner-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;

    .banner-btn-wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 25px;
      text-align: left;
      z-index: 3;
    }

    .banner-btn {
      display: inline-block;
      text-align: center;
      line-height: 1;
      background-color: #00657b;
      color: #fff;
      width: 100%;
      max-width: 354px;
      text-transform: uppercase;
      height: 70px;
      margin-bottom: 6px;
    }
  }

  .fw-bold {
    font-family: "Dopis Bold";
  }

  .page {
    opacity: 1;

    &.inactive {
      opacity: 0.5;
    }

    @media (max-width: 991.98px) {
      &.selected {
        display: block;
      }
      &:not(.selected) {
        display: none;
      }
    }
  }

  @media (max-width: 991.98px) {
    .banner-content {
      .banner-btn-wrap {
        .row {
          flex-direction: column-reverse;
        }
      }
    }
  }

  @media (max-width: 767.98px) {
    .disclamer-wrapper {
      display: none;
    }

    .disclamer-wrapper-mob {
      text-align: left;
    }

    .banner-wrapper {
      position: relative;
    }

    .banner {
      background-image: url("./img/banner-tablet-september2024-new-TB-2.jpg?2");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 40% 63%;
      min-height: calc(100vh - 122px);
      max-height: 730px;

      > .container {
        padding: 0;
      }
    }

    .banner::after {
      width: 55%;
      height: 55%;
    }

    .banner::before {
      background-image: url("./img/icons/decorative-bottom.svg");
      background-repeat: no-repeat;
      background-size: contain;
      bottom: 19%;
      width: 90%;
      height: 17%;
    }

    .banner-content {
      height: 100%;
      justify-content: space-between;
      padding-bottom: 4px;

      .banner-btn-wrap {
        margin-top: 4px;
        margin-bottom: 15px;
        padding-bottom: 14px;
        text-align: left;
      }

      .banner-btn {
        letter-spacing: 1%;
        font-size: 16px;
        width: 100%;
        max-width: 100%;
        text-transform: uppercase;
        height: 70px;
      }
    }

    .reklama.fs-6,
    .txt-sm.fs-6 {
      font-size: 12px !important;
    }
  }

  @media (max-width: 479.98px) {
    .banner-wrapper {
      padding-bottom: 10px;
    }

    .banner {
      background-image: url("./img/banner-sm-september2024-last-new-sm-2.jpg?2");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 63%;
      max-height: 610px;
      // min-height: calc(100vh - 160px);

      .banner-content {
        justify-content: space-around;

        .banner-btn-wrap {
          text-align: center;
        }

        .banner-btn {
          width: 100%;
          max-width: 100%;
          height: 48px;
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }

    .banner-content {
      .banner-btn-wrap {
        margin-top: 8px;
        margin-bottom: 7px;
        padding-bottom: 4px;
      }
    }

    .reklama.fs-6,
    .txt-sm.fs-6 {
      font-size: 10.5px !important;
    }
  }

  @media (min-width: 768px) {
    .disclamer-wrapper-mob {
      display: none;
    }
  }

  @media (min-width: 480px) and (max-width: 599.98px) {
    .banner {
      background-position: 40% 58%;
    }
  }

  @media (min-width: 600px) and (max-width: 767.98px) {
    .banner {
      background-position: 40% 53%;
    }
  }

  @media (min-width: 768px) and (max-width: 850.98px) {
    .banner {
      background-image: url("./img/banner-lg-new-september2024-2.jpg?2");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 36% 57%;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .banner-content {
      .banner-btn {
        max-width: 336px;
      }
    }
  }

  @media (min-width: 768px) {
    .reklama.fs-6,
    .txt-sm.fs-6 {
      font-size: 13px !important;
    }
  }

  @media (min-width: 851px) and (max-width: 991.98px) {
    .banner {
      background-image: url("./img/banner-lg-new-september2024-2.jpg?2");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 28% 72%;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .banner {
      min-height: calc(100vh - 133px);

      .banner-content {
        height: 100%;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .banner {
      min-height: calc(100vh - 134px);
    }
  }

  @media (min-width: 992px) and (max-width: 1199.98px) {
    .banner-content {
      height: 100%;

      .banner-btn {
        height: 55px;
      }
    }
  }

  @media (min-width: 1200px) and (max-width: 1919.98px) {
    .banner {
      .banner-btn-wrap {
        margin-top: 15px;
      }
      .banner-content {
        height: 100%;
        justify-content: space-between;
        padding-bottom: 20px;
      }
    }
  }

  @media (min-width: 1440px) {
    .banner {
      .banner-content {
        height: 100%;
        .banner-btn {
          font-size: 18px;
          height: 79px;
          span {
            padding-block: 12px;
          }
        }
      }
    }
  }

  @media (min-width: 1920px) {
    .banner {
      .banner-content {
        padding-bottom: 38px;
      }
    }
  }
</style>
