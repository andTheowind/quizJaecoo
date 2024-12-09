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
  import SelectedCarElement from "@/components/SelectedCarElement.svelte";

  const { width } = windowSize();
  $: isMobile = $width < 992;

  let canGoNext: boolean;
  let canGoPrevious: boolean;
  let goNext: () => boolean;
  let goPrevious: () => boolean;

  let isModelError = false;
  let isColorError = false;
  let isTradeInError = false;
  let isPaymentMethodError = false;

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
    isModelError = false;
    goNext();
  }

  function onColorChange(event?: any) {
    if (selectedModel) {
      selectedColor = selectedColor;
      isColorError = false;
      goNext();
    } else {
      isModelError = true;
    }
  }

  function onTradeInChange(event?: any) {
    if (selectedColor) {
      selectedTradeIn = event.detail.event;
      isTradeInError = false;
      goNext();
    } else {
      isColorError = true;
    }
  }

  function onPaymentMethodChange(event?: any) {
    if (selectedTradeIn) {
      selectedPaymentMethod = event.detail.event || "";
      isPaymentMethodError = false;
      goNext();
    } else {
      isPaymentMethodError = true;
    }
  }
  let isMailSent = false;
</script>

{#if !(selectedColor && selectedTradeIn && selectedPaymentMethod)}
  <section class="pages">
    <div class="container my-4">
      <div class="row">
        <Pager bind:canGoNext bind:canGoPrevious bind:goNext bind:goPrevious>
          <Page let:pageSelected>
            <div class="col-lg-3">
              <div
                class="quiz-step"
                class:active={pageSelected}
                class:error={isModelError}>
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
              <div
                class="quiz-step"
                class:active={pageSelected}
                class:error={isColorError}>
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
                  <div
                    class="quiz-step"
                    class:active={pageSelected}
                    class:error={isTradeInError}>
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
                  <div
                    class="quiz-step"
                    class:active={pageSelected}
                    class:error={isPaymentMethodError}>
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
              <FinalText amountCars={carInfo?.amountCars}></FinalText>
            {/await}
            <MailSender
              bind:color={selectedColor}
              bind:tradeIn={selectedTradeIn}
              bind:paymentMethod={selectedPaymentMethod}
              bind:isMailSent />
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
          <DisclamerForm></DisclamerForm>
        </div>
      </div>
    </div>
  </section>
{/if}

<style lang="scss">
  .quiz-step {
    opacity: 0.5;

    &.active {
      opacity: 1;
    }

    @media (max-width: 991.98px) {
      display: none;

      &.active {
        display: block;
      }
    }
  }

  .error {
    border: 1px solid red;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #c0ccce;

    .bg-yawhite {
      background-color: #fff;
    }

    button {
      color: #000;

      &:disabled {
        color: #abbbbe;

        img {
          opacity: 0.4;
        }
      }
    }

    .next-button:last-child {
      display: none;
    }
  }

  .preview-img-wrap {
    display: flex;
    justify-content: flex-end;

    @media (min-width: 1440px) {
      img {
        min-width: 671px;
      }
    }

    @media (min-width: 1200px) and (max-width: 1919.98px) {
      max-width: 686px;
      margin-left: auto;
      padding-right: 15px;
    }
  }

  .final-info-wrap {
  }

  .final-name-car {
    span {
      color: rgb(171, 187, 190);
      font-size: 86px;
      font-weight: 700;
      font-family: "Dopis Bold";
      line-height: 112px;
      letter-spacing: 0%;
      text-align: left;
      text-transform: uppercase;
    }

    @media (max-width: 1199.98px) {
      span {
        font-size: 72px;
      }
    }

    @media (max-width: 850.98px) {
      span {
        font-size: 60px;
      }
    }

    @media (max-width: 767.98px) {
      span {
        font-size: 45px;
      }
    }
  }

  .choosed {
    background: #f6f7f7;
    padding-top: 75px;
    padding-bottom: 70px;

    .card-title {
      margin-bottom: 0;
    }

    .selected-card-wrap {
      padding-bottom: 14px;
    }

    @media (max-width: 991.98px) {
      padding: 18px 0 25px 0;
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

  .disclamer-wrapper {
    @media (max-width: 767.98px) {
      display: none;
    }
  }

  .disclamer-wrapper-mob {
    text-align: left;

    @media (min-width: 768px) {
      display: none;
    }
  }
</style>
