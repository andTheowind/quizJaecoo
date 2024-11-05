<script lang="ts">
  import "../types/ya-metrika.d.ts";
  import { imask } from "@imask/svelte";
  import ActionButton from "../components/ActionButton.svelte";

  const callTouchApiUrl =
    "https://api.calltouch.ru/calls-service/RestAPI/requests/62173/register/";
  const mailApiUrl = "./send.php";

  export let color: string;
  export let tradeIn: string;
  export let paymentMethod: string;
  export let isMailSent = false;

  let agreeProcessing = false;
  let agreeCommunication = false;

  let fullName = "";
  let phoneNumber = "";

  let fullNameError = false;
  let phoneNumberError = false;
  let agreeError = false;
  let marketingError = false;

  $: phoneNumber = phoneNumber.replace(/[^\d;]/g, "");
  const phoneNumberOptions = {
    mask: "+{7}(000) 000-00-00",
    lazy: false,
  };

  // Для обновления состояния ошибок
  function updateErrorState(field: string, value: string | boolean) {
    switch (field) {
      case "fullName":
        fullNameError = !(value as string).trim();
        break;
      case "phoneNumber":
        phoneNumberError = !(value as string).trim();
        break;
      case "agreeProcessing":
        agreeError = !value;
        break;
      case "agreeCommunication":
        marketingError = !value;
        break;
    }
  }

  const objectToFormData = (data: { [key: string]: any }): FormData => {
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    return formData;
  };

  function validateInputs() {
    fullNameError = fullName.trim() === "";
    phoneNumberError = phoneNumber.trim() === "";
    agreeError = !agreeProcessing;
    marketingError = !agreeCommunication;
  }

  async function sendMail(): Promise<boolean> {
    const response = await fetch(mailApiUrl, {
      method: "POST",
      body: objectToFormData({
        name: fullName,
        phone: phoneNumber,
        valueColorCar: color,
        valueTradeIn: tradeIn,
        valuePayment: paymentMethod,
      }),
    });

    if (!response.ok) {
      console.error("Ошибка при отправке на email");
      return false;
    }

    console.log("Отправлено на email");
    return true;
  }

  async function sendCallTouch(): Promise<boolean> {
    const requestUrl = new URL(callTouchApiUrl);
    // @ts-ignore
    requestUrl.searchParams.set("sessionId", window.call_value);
    requestUrl.searchParams.set("fio", fullName);
    requestUrl.searchParams.set("phoneNumber", phoneNumber);
    requestUrl.searchParams.set("subject", "Формы квиза Jaecoo");
    requestUrl.searchParams.set("requestUrl", location.href);

    const response = await fetch(requestUrl, { method: "GET" });
    if (!response.ok) {
      console.error("Ошибка при отправке запроса");
      return false;
    } else {
      console.log("Отправлен запрос на Calltouch");
    }
    return true;
  }

  async function sendAll() {
    validateInputs();

    if (fullNameError || phoneNumberError || agreeError || marketingError) {
      return;
    }
    if (!agreeProcessing || !agreeCommunication) return;

    const mailOk = await sendMail();
    const callTouchOk = await sendCallTouch();

    isMailSent = mailOk && callTouchOk;

    if (isMailSent) {
      ym(95046320, "reachGoal", "form_quiz");
    }
  }
</script>

<div class="final-form-wrap mt-4">
  <form id="finalForm" class="finalForm">
    <div class="me-0 me-lg-3 mb-2 mb-lg-3 pb-1 pb-lg-0">
      <input
        type="text"
        class:border-danger={fullNameError}
        name="name"
        id="name"
        placeholder="Имя"
        bind:value={fullName}
        on:input={() => updateErrorState("fullName", fullName)}
        required />
    </div>
    <div class="me-0 me-lg-3 mb-2 mb-lg-2 pb-1 pb-lg-0">
      <input
        class:border-danger={phoneNumberError}
        name="phone"
        id="phone"
        bind:value={phoneNumber}
        use:imask={phoneNumberOptions}
        on:input={() => updateErrorState("phoneNumber", phoneNumber)}
        required />
    </div>
    <div class="d-flex align-items-center">
      <div class="d-flex flex-column me-0 me-sm-1 me-lg-2 pt-1 pt-md-0">
        <label class="s12 agree-label" for="agree">
          <input
            type="checkbox"
            bind:checked={agreeProcessing}
            class:border-danger={agreeError}
            id="agree"
            on:change={() =>
              updateErrorState("agreeProcessing", agreeProcessing)}
            required />
          <span>
            Я соглашаюсь на обработку
            <a href="./policy.php">персональных данных</a>
          </span>
        </label>
        <label class="s12 agree-label" for="marketing">
          <input
            type="checkbox"
            bind:checked={agreeCommunication}
            class:border-danger={marketingError}
            id="marketing"
            on:change={() =>
              updateErrorState("agreeCommunication", agreeCommunication)}
            required />
          <span>
            Я соглашаюсь на
            <a href="./agreement.php">рекламную коммуникацию</a>
          </span>
        </label>
      </div>
    </div>
    <div class="ms-0 ms-lg-1 ms-lg-0">
      <ActionButton
        type="submit"
        class="w-100 border-0 text-uppercase"
        id="finalButton"
        on:click={() => sendAll()}>
        <span class="py-2 ps-2 pe-3 me-1">Получить подборку</span>
      </ActionButton>
    </div>
  </form>
</div>

<style lang="scss">
  #finalForm {
    text-align: left;

    div {
      > input,
      #name {
        border-width: 2px;
        background-color: transparent !important;
      }
    }

    #name {
      width: 100%;
      margin-bottom: 0;
      color: #919191;
    }

    .border-danger#agree,
    .border-danger#marketing {
      outline: 2px solid rgba(var(--bs-danger-rgb), var(--bs-border-opacity));
    }

    label {
      input {
        cursor: pointer;
      }
    }

    #agree,
    #marketing {
      margin-bottom: auto;
      padding-top: 3px;
      margin-top: 1px;
      margin-right: 4px;
    }

    @media (max-width: 991.98px) {
      input:not([type="checkbox"]),
      #finalButton {
        height: 40px;
        font-size: 13px;
        padding: 0px 17px;
      }

      input::placeholder {
        font-size: 13px;
      }

      #finalButton {
        max-width: 100%;
      }

      span {
        padding-top: 1px;
      }
    }

    @media (max-width: 479.98px) {
      #finalButton {
        margin-top: 8px;
      }
    }
  }

  .agree-label {
    margin-left: 1px;
    padding-top: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      padding: 0px 0 1px 3px;
    }

    a {
      color: #00657b;
    }

    @media (max-width: 479.98px) {
      input {
        margin-right: 2px;
        margin-bottom: auto;
      }

      span {
        display: inline-block;
        padding-left: 0;
        padding-top: 6px;
        padding-bottom: 0 !important;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    #finalForm #finalButton {
      height: 56px;
      font-size: 16px;
      max-width: 520px;
      padding: 0px 17px;
    }
  }
</style>
