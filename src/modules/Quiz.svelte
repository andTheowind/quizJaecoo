<script lang="ts">
  import {
    CarInfoStore,
    type CarColor,
    type CarModel,
  } from "../stores/carInfoStore";

  import Pager from "@components/Pager.svelte";
  import Page from "@components/Page.svelte";
  import CardDefaultColumns from "@components/CardDefaultColumns.svelte";
  import CardTwelveColumns from "@components/CardTwelveColumns.svelte";
  import SelectedCardElement from "@components/SelectedCardElement.svelte";
  import CardHeader from "@components/CardHeader.svelte";
  import QuizCard from "@components/QuizCard.svelte";
  import PageLines from "@components/PageLines.svelte";
  import RadioSelectList from "@components/RadioSelectList.svelte";
  import ImageSelectList from "@components/ImageSelectList.svelte";
  import DisclamerForm from "@components/DisclamerForm.svelte";
  import RadioColoredSelectList from "@components/RadioColoredSelectList.svelte";
  import CardThreeColumns from "@components/CardThreeColumns.svelte";

  import FinalText from "@modules/FinalText.svelte";
  import MailSender from "@modules/MailSender.svelte";

  import { windowSize } from "@sveu/browser";
  import { imask } from "@imask/svelte";
  import SelectedCarElement from "@/components/SelectedCarElement.svelte";

  const { width } = windowSize();
  $: isMobile = $width < 992;

  let canGoNext: boolean;
  let canGoPrevious: boolean;
  let goNext: () => boolean;
  let goPrevious: () => boolean;

  export let selectedModel: string | undefined = undefined;
  export let selectedColor: string | undefined = undefined;
  export let selectedTradeIn: string | undefined = undefined;
  export let selectedPaymentMethod: string | undefined = undefined;

  let carModels = CarInfoStore.getModels();
  $: carColors = CarInfoStore.getColorsByModel(selectedModel ?? "");
  async function getVariantModelByValue(
    value: string,
  ): Promise<CarModel | undefined> {
    if (!selectedModel) {
      return;
    }
    const models = await CarInfoStore.getModels();
    const model = models.find((car) => car.name === value);
    return model;
  }

  async function getVariantByValue(
    value: string,
  ): Promise<CarColor | undefined> {
    if (!selectedModel) {
      return;
    }
    const cars = await CarInfoStore.getColorsByModel(selectedModel);
    return cars.find((car) => car.value === value);
  }

  async function getPreviewImage(value: string) {
    let variant = await getVariantByValue(value);
    if (variant === undefined) {
      return "./assets/img/black.png";
    }
    return variant.previewImage;
  }

  function onModelChange(event?: any) {
    selectedModel = selectedModel;
    goNext();
  }

  function onColorChange(event?: any) {
    selectedColor = selectedColor;
    goNext();
  }

  function onTradeInChange(event?: any) {
    selectedTradeIn = event.detail.event;
    goNext();
  }

  function onPaymentMethodChange(event?: any) {
    selectedPaymentMethod = event.detail.event || "";
    goNext();
  }

  let value = "";

  function accept({ detail: maskRef }: { detail: any }) {
    value = maskRef.value;
  }

  const options = {
    mask: "+{7}(000) 000-00-00",
    lazy: false,
  };

  let isMailSent = false;

  async function sendMail(event: SubmitEvent) {
    if (!event.target) {
      throw new Error("bad target");
    }
    let formData = new FormData(event.target as HTMLFormElement);

    const data = await fetch("./send.php", {
      method: "POST",
      body: formData,
    }).then((response) => response.text());
  }

  async function sendMailCalltouch(event: SubmitEvent) {
    var n, r;
    if (!event.target) {
      throw new Error("bad target");
    }

    let e = new FormData(event.target as HTMLFormElement),
      t = new URLSearchParams();
    t.append(
      "fio",
      ((n = e.get("name")) == null ? void 0 : n.toString()) || "",
    ),
      t.append(
        "phoneNumber",
        ((r = e.get("phone")) == null
          ? void 0
          : r.toString().replace(/[^\d;]/g, "")) || "",
      ),
      t.append("subject", "Формы квиза Jaecoo"),
      t.append("requestUrl", location.href),
      // @ts-ignore
      t.append("sessionId", window.call_value);
    let s = `https://api.calltouch.ru/calls-service/RestAPI/requests/62173/register/?${t.toString()}`;
    try {
      const l = await (
        await fetch(s, {
          method: "GET",
        })
      ).text();
      console.log("Успешная отправка, параметры:", t),
        console.log("complete, url = ", s);
    } catch (a) {
      console.error("Ошибка при отправке запроса:", a);
    }
  }

  async function sendAll(event: SubmitEvent) {
    await sendMail(event);
    await sendMailCalltouch(event);
    isMailSent = true;
  }

</script>

{#if !(selectedColor && selectedTradeIn && selectedPaymentMethod)}
  <section class="pages">
    <div class="container my-4">
      <div class="row">
        <Pager bind:canGoNext bind:canGoPrevious bind:goNext bind:goPrevious>
          <Page let:pageSelected>
            <div class="col-lg-3">
              <div class="quiz-step" class:active={pageSelected}>
                <CardDefaultColumns>
                  <CardHeader index={1} title="Выберите модель" />
                  <PageLines total={4} active={1} />
                  {#await carModels then models}
                    <ImageSelectList
                      values={models.map(({ name, image }) => {
                        return { value: name, image: image };
                      })}
                      on:click={onModelChange}
                      bind:selectedValue={selectedModel} />
                  {/await}
                </CardDefaultColumns>
              </div>
            </div>
          </Page>
          <Page let:pageSelected>
            <div class="col-lg-3">
              <div class="quiz-step" class:active={pageSelected}>
                <CardDefaultColumns>
                  <CardHeader index={2} title="Выберите цвет" />
                  <PageLines total={4} active={2} />
                  {#await carColors then values}
                    <RadioColoredSelectList
                      {values}
                      bind:selectedValue={selectedColor}
                      on:click={onColorChange} />
                  {/await}
                </CardDefaultColumns>
              </div>
            </div>
          </Page>
          <div class="col-lg-6">
            <div class="row">
              <Page let:pageSelected>
                <div class="col-lg-6">
                  <div class="quiz-step" class:active={pageSelected}>
                    <CardDefaultColumns>
                      <CardHeader
                        index={3}
                        title="Планируете ли сдавать свой авто в trade-in?" />
                      <PageLines total={4} active={3} />
                      <RadioSelectList
                        values={[
                          { value: "Да", displayName: "Да" },
                          { value: "Нет", displayName: "Нет" },
                          {
                            value: "Еще не определился",
                            displayName: "Еще не определился",
                          },
                        ]}
                        bind:selectedValue={selectedTradeIn}
                        on:click={onTradeInChange} />
                    </CardDefaultColumns>
                  </div>
                </div>
              </Page>
              <Page let:pageSelected>
                <div class="col-lg-6">
                  <div class="quiz-step" class:active={pageSelected}>
                    <CardDefaultColumns>
                      <CardHeader
                        index={4}
                        title="Как планируете приобретать автомобиль?" />
                      <PageLines total={4} active={4} />
                      <RadioSelectList
                        values={[
                          { value: "Кредит", displayName: "Кредит" },
                          { value: "Наличные", displayName: "Наличные" },
                          { value: "Лизинг", displayName: "Лизинг" },
                          { value: "Рассрочка", displayName: "Рассрочка" },
                        ]}
                        bind:selectedValue={selectedPaymentMethod}
                        on:click={onPaymentMethodChange} />
                    </CardDefaultColumns>
                  </div>
                </div>
              </Page>
              <CardTwelveColumns>
                <div class="preview-img-wrap text-end w-100">
                  {#if selectedColor && ((isMobile && canGoPrevious) || !isMobile)}
                    {#await getPreviewImage(selectedColor) then previewImage}
                      <img
                        src={previewImage}
                        class="img-fluid"
                        class:opacity-0={!selectedModel}
                        class:opacity-50={!selectedColor && selectedModel}
                        alt="" />
                    {/await}
                  {/if}
                </div>
              </CardTwelveColumns>
            </div>
          </div>
        </Pager>
      </div>
    </div>
  </section>

  {#if isMobile}
    <div class="controls">
      <button
        class="bg-yawhite"
        on:click={() => goPrevious()}
        disabled={!canGoPrevious}>
        <img src="./img/icons/arrow-left.svg" class="me-2" alt="" />
        Назад
      </button>
    </div>
  {/if}
{/if}

{#if isMobile && canGoNext}
  <!-- <div class="controls">
    <button
      class="bg-yawhite"
      on:click={() => goPrevious()}
      disabled={!canGoPrevious}>
      <img src="./img/icons/arrow-left.svg" class="me-2" alt="" />
      Назад
    </button>
    <button
      class="bg-yawhite next-button d-block"
      on:click={() => goNext()}
      disabled={!canGoNext}>
      Далее
      <img src="./img/icons/arrow-right.svg" class="ms-2" alt="" />
    </button>
  </div> -->
{/if}

{#if selectedModel && selectedColor && selectedTradeIn && selectedPaymentMethod}
  <div class="container pt-2 pt-lg-4">
    <div
      class="row flex-column-reverse flex-md-row my-2 my-md-3 my-lg-4 py-1 py-xl-2">
      <div class="col-12 col-md-6">
        <div class="final-image-wrap">
          {#if selectedColor}
            {#await getVariantByValue(selectedColor) then variant}
              <img src={variant?.finalImage} class="img-fluid" alt="" />
            {/await}
          {/if}
        </div>
        <div class="final-name-car">
          <span>
            {#if selectedModel}
              {#await getVariantModelByValue(selectedModel) then variant}
                <div class="text-center">{variant?.name}</div>
              {/await}
            {/if}
          </span>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="final-info-wrap h-100">
          {#if isMailSent}
            <div class="thx-txt-wrap d-flex align-items-center h-100">
              <div class="text-center w-100 text-md-start mt-3 mt-lg-0">
                <h2 class="h2 pb-2">
                  СПАСИБО! <br />
                  Заявка отправлена!
                </h2>
                <p class="fw-normal h4">
                  Наш менеджер свяжется <br />
                  с Вами в ближайшее время
                </p>
              </div>
            </div>
          {:else}
          {#await CarInfoStore.getModelByName(selectedModel) then carInfo}
            <FinalText amountCars={carInfo?.amountCars} ></FinalText>
          {/await}
            <MailSender
              bind:color={selectedColor}
              bind:tradeIn={selectedTradeIn}
              bind:paymentMethod={selectedPaymentMethod}
              bind:isMailSent />
            <!---
              <div class="final-form-wrap mt-4">
                <form
                  on:submit|preventDefault={sendAll}
                  id="finalForm"
                  class="finalForm">
                  <div>
                    <input
                      type="hidden"
                      class="w-100"
                      name="valueColorCar"
                      id="valueSelectedColorCar"
                      bind:value={selectedColor} />
                    <input
                      type="hidden"
                      class="w-100"
                      name="valueTradeIn"
                      id="valueSelectedTradeIn"
                      bind:value={selectedTradeIn} />
                    <input
                      type="hidden"
                      class="w-100"
                      name="valuePayment"
                      id="valueSelectedPayment"
                      bind:value={selectedPaymentMethod} />
                  </div>
                  <div class="me-0 me-lg-3 mb-2 mb-lg-3 pb-1 pb-lg-0">
                    <input
                      type="text"
                      class="w-100 mb-0"
                      name="name"
                      id="name"
                      placeholder="Имя"
                      required />
                  </div>
                  <div class="me-0 me-lg-3 mb-2 mb-lg-2 pb-1 pb-lg-0">
                    <input
                      name="phone"
                      id="phone"
                      {value}
                      use:imask={options}
                      on:input={(event) =>
                        accept({ detail: { maskRef: event.target } })} />
                  </div>
                  <div class="d-flex align-items-center">
                    <div
                      class="d-flex flex-column me-0 me-sm-1 me-lg-2 pt-1 pt-md-0">
                      <label class="s12 agree-label" for="agree">
                        <input
                          type="checkbox"
                          class="agree-policy"
                          id="agree"
                          required />
                        <span>
                          Я соглашаюсь на обработку
                          <a href="./policy.php">персональных данных</a>
                        </span>
                      </label>
                      <label class="s12 agree-label" for="marketing">
                        <input
                          type="checkbox"
                          class="agree-policy"
                          id="marketing"
                          required />
                        <span>
                          Я соглашаюсь на
                          <a href="./agreement.php">рекламную коммуникацию</a>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="ms-0 ms-lg-1 ms-lg-0">
                    <button
                      type="submit"
                      class="w-100 border-0 text-uppercase"
                      id="finalButton">
                      <span class="py-2 ps-2 pe-3 me-1">Получить подборку</span>
                    </button>
                  </div>
                </form>
              </div>
            --->
          {/if}
        </div>
      </div>
    </div>
  </div>
  <section class="choosed d-lg-block" id="choosed">
    <div class="container">
      <div class="row">
        <CardThreeColumns>
          <QuizCard>
            <CardHeader slot="cardHeader" index={1} title="Выбрана модель" />
          </QuizCard>
          {#if selectedModel}
            {#await getVariantModelByValue(selectedModel) then variant}
              <div class="text-start selected-card-wrap">
                <div class="selected-card-el"></div>
                <div class="text-start">{variant?.name}</div>
              </div>
            {/await}
          {/if}
        </CardThreeColumns>
        <CardThreeColumns>
          <QuizCard>
            <CardHeader slot="cardHeader" index={2} title="Выбран цвет" />
          </QuizCard>
          {#if selectedColor}
            {#await getVariantByValue(selectedColor) then variant}
              <SelectedCardElement>
                <SelectedCarElement {variant}></SelectedCarElement>
              </SelectedCardElement>
            {/await}
          {/if}
        </CardThreeColumns>
        <CardThreeColumns>
          <QuizCard>
            <CardHeader
              slot="cardHeader"
              index={3}
              title="Планируется ли сдавать свой авто в trade-in?" />
          </QuizCard>
          <SelectedCardElement>
            <div class="selected-card-el border border-dark"></div>
            <div>
              {selectedTradeIn}
            </div>
          </SelectedCardElement>
        </CardThreeColumns>
        <CardThreeColumns>
          <QuizCard>
            <CardHeader
              slot="cardHeader"
              index={4}
              title="Как планируется приобретать автомобиль?" />
          </QuizCard>
          <SelectedCardElement>
            <div class="selected-card-el border border-dark"></div>
            <div>
              {selectedPaymentMethod}
            </div>
          </SelectedCardElement>
        </CardThreeColumns>
      </div>
      <div class="row text-start">
        <div class="col mt-5 pt-4">
          <!-- 
            <a href="./legal.php" class="h5 text-decoration-underline pt-4">
              Политика конфиденциальности
            </a>
          -->
          <DisclamerForm></DisclamerForm>
        </div>
      </div>
    </div>
  </section>
{/if}

<style lang="scss">
  .controls {
    display: flex;
    justify-content: space-between;

    .bg-yawhite {
      background-color: #fff;
    }
    button {
      color: #000;
    }
    button:disabled {
      color: #abbbbe;

      img {
        opacity: 0.4;
      }
    }
  }

  .preview-img-wrap {
    display: flex;
    justify-content: flex-end;
  }
  .final-info-wrap {
  }

  .final-name-car span {
    color: rgb(171, 187, 190);
    font-size: 86px;
    font-weight: 700;
    font-family: "Dopis Bold";
    line-height: 112px;
    letter-spacing: 0%;
    text-align: left;
    text-transform: uppercase;
  }
  
  .choosed {
    background: #f6f7f7;
    padding-top: 75px;
    padding-bottom: 70px;
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

  @media (max-width: 1199.98px) {
    .final-name-car span {
      font-size: 72px;
    }
  }

  @media (max-width: 991.98px) {
    .quiz-step {
      display: none;
    }
    .quiz-step.active {
      display: block;
    }
    .final-image-wrap {
      margin-top: 22px;
    }
    .controls {
      border-top: 1px solid #c0ccce;
    }
    .controls > .next-button:last-child {
      display: none;
    }

    .choosed {
      padding: 18px 0 25px 0;

      .card-title {
        margin-bottom: 0;
      }
      .selected-card-wrap {
        padding-bottom: 14px;
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
    .final-name-car span {
      font-size: 45px;
    }
  }

  @media (min-width: 768px) {
    .disclamer-wrapper-mob {
      display: none;
    }
  }

  @media (min-width: 768px) and (max-width: 850.98px) {
    .final-name-car span {
      font-size: 60px;
    }
  }

  @media (min-width: 851px) and (max-width: 991.98px) {
    .final-name-car span {
      font-size: 62px;
    }
  }

  @media (min-width: 1200px) and (max-width: 1919.98px) {
    .preview-img-wrap {
      max-width: 686px;
      margin-left: auto;
      padding-right: 15px;
    }
  }

  @media (min-width: 1440px) {
    .preview-img-wrap img {
      min-width: 671px;
    }
  }
</style>
