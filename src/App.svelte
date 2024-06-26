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
                <BannerList></BannerList>
                <div class="banner-btn-wrap">
                  <button
                    class="text-uppcase banner-btn"
                    on:click={() => (firstBanner = false)}>
                    Подобрать автомобиль
                  </button>
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
    background-color: #0e121d;
    position: relative;
  }

  .banner {
    background-image: url("./img/first-banner.jpg");
    background-repeat: no-repeat;
    background-position: 50% 50%;
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

  .banner::after,
  .banner::before {
    position: absolute;
    content: " ";
    opacity: 0.52;
  }

  .banner::after {
    top: 0;
    right: 0;
    background-image: url("./img/el-banner-1.svg");
    background-repeat: no-repeat;
    background-size: contain;
    width: 36%;
    height: 36%;
  }

  .banner::before {
    bottom: 0;
    left: 0;
    background-image: url("./img/el-banner-2.svg");
    background-repeat: no-repeat;
    background-size: contain;
    width: 45%;
    height: 33%;
  }

  .banner-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;

    .banner-btn-wrap {
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
    }
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


  @media (max-width: 767.98px) {
    .disclamer-wrapper {
      display: none;
    }

    .disclamer-wrapper-mob {
      text-align: left;
    }

    .banner {
      background-image: url("./img/first-banner-tb.jpg");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 40% 63%;
      max-height: 730px;
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
        max-width: 354px;
        text-transform: uppercase;
        height: 70px;
      }
    }
  }

  @media (max-width: 479.98px) {
    .banner-wrapper {
      padding-bottom: 10px;
    }

    .banner {
      background-image: url("./img/first-banner-sm.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 100%;
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
        }
      }
    }

    .banner-content {
      .banner-btn-wrap {
        margin-top: -12px;
        margin-bottom: 7px;
        padding-bottom: 4px;
      }
    }
  }

  @media (min-width: 768px) {
    .disclamer-wrapper-mob {
      display: none;
    }
  }

  @media (min-width: 480px) and (max-width: 599.98px) {
    .banner {
      background-position: 40% 100%;
    }
  }

  @media (min-width: 768px) and (max-width: 850.98px) {
    .banner {
      background-image: url("./img/first-banner.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 36% 54%;
    }
  }

  @media (min-width: 851px) and (max-width: 991.98px) {
    .banner {
      background-image: url("./img/first-banner.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 28% 52%;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .banner {
      min-height: calc(100vh - 133px);
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .banner {
      min-height: calc(100vh - 134px);
    }
  }

  @media (min-width: 1200px) and (max-width: 1919.98px) {
    .banner {
      .banner-btn-wrap {
        margin-top: 15px;
      }
    }
  }

  @media (min-width: 1200px) and (max-width: 1919.98px) {
    
    .banner {
      .banner-content {
        height: 100%;
        justify-content: space-around;
        padding-bottom: 20px;
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
