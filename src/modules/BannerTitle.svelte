<div class="banner-content-title pt-1 pt-sm-2 pt-md-3">
  <div class="banner-content-title-friday">
    <span class="display-2 text-white text-effect">ЧЕРНАЯ ПЯТНИЦА</span>
    <div>
      <p
        class="h2 d-none d-md-block text-white fw-normal py-1 py-md-2 py-lg-1 mt-lg-2">
        <img src="./img/date-black-friday.svg" class="img-fluid" alt="" />
      </p>
    </div>
  </div>
  <div>
    <div class="pt-xxl-desktp pb-md-2 pb-xl-1 pb-xxl-3">
      <span
        class="text-white display-5 fw-bold"
        style="font-family: 'Dopis Bold';">JAECOO J7</span>
    </div>
    <div class="shadow-effect-wrap d-inline-flex mb-1 mb-lg-2">
      <div class="shadow-effect d-md-flex">
        <h1 class="h1 d-inline-block text-white py-md-1 py-md-2 py-xl-3">
          <span class="h2 fw-normal">Выгода до <span>899 000</span></span><b
            class="nowrap"
            ><span class="fw-normal h3 ps-1" id="rubleSymbol">₽</span></b>
        </h1>
      </div>
      <div class="d-md-none">
        <p class="h2 text-white fw-normal py-0 py-md-2 py-lg-1 mt-lg-2 ms-2">
          <img src="./img/date-black-friday.svg" class="img-fluid" alt="" />
        </p>
      </div>
    </div>
  </div>
  <!-- <p class="h3 text-white pt-1 pt-lg-2">до 30 сентября</p> -->
</div>

<style lang="scss">
  .banner-content-title {
    margin-top: 44px;
    margin-bottom: 44px;

    .banner-content-title-friday {
      span {
        font-weight: 700;
        font-family: "Dopis Bold";
        display: inline-block;
        max-width: 450px;
      }
      .text-effect {
        text-shadow:
          10px 0px 58.36px #0dcccf,
          10px 0px 22.74px #0dbfcf,
          10px 10px 75.8px #0dbfcf;
      }
    }

    .shadow-effect {
      font-size: 34px;
      font-weight: 700;
      line-height: 0px;
      text-align: left;
      display: flex;
      border: 2px solid #00ffe1;
      box-shadow: 0px 0px 20px 0px rgb(0, 255, 225);
      border-radius: 10px;

      h1 {
        .h2 {
          font-family: "Dopis Bold";
          font-weight: 700;
        }
      }
    }

    .nowrap {
      white-space: nowrap;
    }

    .h1 {
      font-size: 76px;
      font-weight: 700;
      font-family: "Dopis Bold";
      line-height: 0.85;
      padding: 10px 24px 0px 24px;
      margin-bottom: 0;

      .fw-normal {
        font-weight: 400;
        font-family: "Dopis Light";
      }

      #rubleSymbol {
        font-family: "Noto Sans", sans-serif !important;
        font-weight: 300;
      }
    }

    .h2 {
      font-size: 45px;
      font-family: "Dopis Light";
      line-height: 53px;

      &.second-title {
        font-size: 52px;

        b {
          font-size: 58px;
          font-family: "Dopis Bold";
          line-height: 58px;
          letter-spacing: 1px;
        }

        #rubleSymbol {
          font-family: "Noto Sans", sans-serif !important;
        }
      }
    }

    .h3 {
      font-size: 36px;
      font-family: "Dopis Light";
      font-weight: 400 !important;
      line-height: 40px;
    }

    @media (max-width: 1199.98px) {
      .h1 {
        font-size: 28px;
        line-height: 1;
        padding: 7px 18px 0px 18px;
      }

      .h2 {
        font-size: 24px;
      }

      .h2.second-title {
        font-size: 28px;

        b {
          font-size: 38px;
          line-height: 38px;
        }
      }

      .h3 {
        font-size: 26px;
        line-height: 26px;
      }
    }

    @media (max-width: 767.98px) {
      margin-top: 8px;
      padding-bottom: 96px;
      margin-bottom: 2px;
      position: relative;
      z-index: 6;

      .display-2 {
        margin-top: 10px;
        font-size: calc(1.175rem + 3.9vw);
      }

      .shadow-effect-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .shadow-effect {
        box-shadow: 0px 0px 12px 0px rgb(0, 255, 225);
      }

      .pt-xxl-desktp {
        margin-top: 207px;
      }

      .h1 {
        font-size: 24px;
        margin-bottom: 0;
        padding: 13px 14px 3px 14px;
        display: flex;
        align-items: center;
      }

      .h2 {
        font-size: 21px;
        margin-bottom: 0;
        line-height: 1.25;

        span {
          font-size: 24px;
        }
      }

      .h2 {
        .h3 {
          font-size: 16px;
        }
      }

      .h2.second-title {
        font-size: 26px;

        b {
          font-size: 32px;
          line-height: 21px;
        }
      }

      .h3 {
        font-size: 21px;
        line-height: 25px;
      }
    }

    @media (max-width: 479.98px) {
      margin-top: 5px;
      padding-bottom: 5px;

      .h1 {
        font-size: 29px;
        padding-top: 3px;
      }

      .shadow-effect {
        max-height: 40px;
      }

      .h2 {
        font-size: 17px;
        line-height: 1.2;

        span {
          font-size: 21px;
        }
      }

      .h2.second-title {
        font-size: 25px;

        b {
          font-size: 28px;
        }
      }

      .h3 {
        font-size: 15px;
        line-height: 26px;
      }

      .shadow-effect-wrap {
        .d-md-none {
          max-width: 30%;
        }
      }
    }

    @media (max-width: 419.98px) {
      margin-top: 7px;

      .h1 {
        font-size: 24px;
        line-height: 1;
      }

      .h2 {
        font-size: 19px;
        line-height: 1.1;
      }

      .h2.second-title {
        font-size: 23px;

        b {
          font-size: 27px;
        }
      }

      .h3 {
        font-size: 17px;
        line-height: 22px;
      }
    }

    @media (max-width: 405.98px) {
      .h2 {
        font-size: 16px;
      }
    }

    @media (max-width: 374.98px) {
      .h2 {
        font-size: 15px;
      }

      .h2.second-title {
        font-size: 21px;
      }
    }

    @media (max-width: 364.98px) {
      .h1 {
        font-size: 29px;
        line-height: 0.55;
      }

      .h2 {
        font-size: 12px;

        span {
          font-size: 17px;
        }
      }

      .display-2 {
        font-size: calc(1rem + 3.7vw);
      }
    }

    @media (min-width: 480px) and (max-width: 599.98px) {
      padding-bottom: 0px;

      .shadow-effect-wrap {
        .d-md-none {
          max-width: 36%;
        }
      }
    }

    @media (min-width: 600px) and (max-width: 767.98px) {
      padding-bottom: 0px;

      .shadow-effect-wrap {
        .d-md-none {
          max-width: 34%;
        }
      }
    }

    @media (min-width: 740px) and (max-width: 991.98px) {
      .banner-content-title-friday {
        span {
          max-width: 660px;
        }
      }
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      .h2 {
        line-height: 1.15;
      }
    }

    @media (min-width: 992px) and (max-width: 1199.98px) {
      .h1 {
        line-height: 0.9;
      }

      .h2 {
        line-height: 39px;
      }
    }

    @media (min-width: 1200px) {
      height: 100%;

      .h1.py-xl-3 {
        padding-top: 0.75rem !important;
        padding-bottom: 0.6rem !important;
      }
    }

    @media (min-width: 1200px) and (max-width: 1919.98px) {
      margin-top: 18px;
      margin-bottom: 14px;

      .h1 {
        font-size: 44px;
        line-height: 0.65;
      }

      .h2 {
        font-size: 37px;
        line-height: 1.15;
      }

      .h2.second-title {
        font-size: 46px;

        b {
          font-size: 50px;
        }
      }

      .h3 {
        font-size: 32px;
        line-height: 36px;
      }
    }

    @media (min-width: 1920px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 18px;

      .shadow-effect-wrap {
        padding-top: 25px;
      }

      .h1 {
        font-size: 56px;
        line-height: 0.7;
      }
    }

    @media (min-width: 1920px) and (min-width: 1080px) {
      .pt-xxl-desktp {
        padding-top: 25px;
      }
    }
  }
</style>
