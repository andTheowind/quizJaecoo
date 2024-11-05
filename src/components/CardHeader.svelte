<script lang="ts">
  export let index: number;
  export let title: string;
</script>

<div class="card-title">
  <div class="card-index">
    <span>{index}</span>
  </div>
  <div class="card-quiestion">
    <p>{title}</p>
  </div>
</div>

<style scoped lang="scss">
  .card-title {
    display: flex;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid rgb(192, 204, 206);
    margin-bottom: 40px;
    padding-bottom: 30px;

    p {
      text-align: left;
      margin-bottom: 0;
      max-width: 190px;
      min-height: 74px;
      display: flex;
      align-items: center;
      font-size: 16.5px;
      font-weight: 700;
      line-height: 1.385;
      font-family: "Dopis Bold";
      padding-top: 4px;
      text-transform: uppercase;
    }
  }

  .page {
    .card-title {
      p {
        font-family: "Dopis";
        font-weight: 400;
        text-transform: uppercase;
      }
    }
  }

  .page.selected {
    .card-title {
      p {
        font-family: "Dopis Bold";
      }
    }
  }

  .card-index {
    display: inline-block;
    background-color: #abbbbe;
    padding: 8px 15px 2px 15px;
    margin-right: 20px;

    span {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 48px;
      color: #fff;
      line-height: 1;
      min-width: 26px;
    }
  }

  @media (max-width: 991.98px) {
    .card-title {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 12px;

      p {
        max-width: 295px;
        font-size: 14px;
        min-height: 34px;
      }
    }

    .card-index {
      span {
        padding-top: 6px;
      }
    }
  }

  @media (max-width: 767.98px) {
    .page {
      .card-title {
        p {
          font-size: 16px;
        }
      }
    }

    .card-index {
      padding: 4px 10px;

      span {
        font-size: 24px;
      }
    }
  }

  @media (min-width: 992px) and (max-width: 1199.98px) {
    .card-title {
      p {
        font-size: 14px;
      }
    }

    .page {
      .card-title {
        p {
          font-size: 15px;
        }
      }
    }

    .card-index {
      margin-right: 11px;
    }
  }
</style>
