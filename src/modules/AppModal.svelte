<script lang="ts">
  import "../types/ya-metrika.d.ts";
  import Modal from "@components/Modal.svelte";
  import { imask } from "@imask/svelte";
  import { onMount } from "svelte"; // Импортируем onMount для хуков жизненного цикла
  import type { MaskedPattern } from "imask";

  let phoneNumber = "";

  // Опции для маски телефона
  let phoneMaskOptions = {
    mask: "+{7}(000)000-00-00",
    lazy: false,
  };

  let phoneInput: HTMLInputElement | null = null;
  let maskRef: MaskedPattern | null = null;

  // Функция для инициализации маски
  function initMask() {
    if (phoneInput) {
      maskRef = imask(phoneInput, phoneMaskOptions) as unknown as MaskedPattern;
    }
  }

  // Хук для инициализации маски при монтировании компонента
  onMount(() => {
    initMask();
  });

  // Функция для обработки принятого значения
  function handleAccept() {
    if (maskRef) {
      console.log("Accepted: ", maskRef.value);
      phoneNumber = maskRef.value;
    }
  }

  // Функция для обработки завершенного ввода
  function handleComplete() {
    if (maskRef) {
      console.log("Completed: ", maskRef.unmaskedValue);
    }
  }

  let isModalVisible = false;
  let isFormSubmitted = false;

  // Отправка формы по email
  async function handleSendMail(event: SubmitEvent) {
    if (!event.target) {
      throw new Error("Invalid form target");
    }

    let formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await fetch("./send.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      console.log("Письмо успешно отправлено: ", data);
      return true;
    } catch (error) {
      console.error("Ошибка отправки почты: ", error);
      return false;
    }
  }

  // Отправка данных на CallTouch
  async function handleSendCallTouch(event: SubmitEvent) {
    if (!event.target) {
      throw new Error("Invalid form target");
    }

    let formData = new FormData(event.target as HTMLFormElement);
    let urlParams = new URLSearchParams();

    const name = formData.get("name")?.toString() || "";
    const phone =
      formData
        .get("phone")
        ?.toString()
        .replace(/[^\d;]/g, "") || "";

    urlParams.append("fio", name);
    urlParams.append("phoneNumber", phone);
    urlParams.append("subject", "Формы квиза Jaecoo");
    urlParams.append("requestUrl", location.href);
    // @ts-ignore
    urlParams.append("sessionId", window.call_value);

    const apiUrl = `https://api.calltouch.ru/calls-service/RestAPI/requests/62173/register/?${urlParams.toString()}`;

    try {
      const response = await fetch(apiUrl, { method: "GET" });
      const result = await response.text();
      console.log("Запрос CallTouch успешно отправлен: ", result);
      return true;
    } catch (error) {
      console.error("Ошибка отправки запроса CallTouch: ", error);
      return false;
    }
  }

  // Основная функция отправки формы
  async function handleFormSubmit(event: SubmitEvent) {
    event.preventDefault();

    const mailSent = await handleSendMail(event);
    const callTouchSent = await handleSendCallTouch(event);

    if (mailSent && callTouchSent) {
      isFormSubmitted = true;

      // Отправляем цель в Яндекс.Метрику
      ym(95046320, "reachGoal", "form_quiz_callback");
    } else {
      console.error("Ошибка при отправке формы");
    }
  }
</script>

<button
  class="callback-btn text-uppercase s12 py-2 px-2 px-xl-3 px-xxl-5 text-white w-100"
  on:click={() => (isModalVisible = true)}>
  Обратный звонок
</button>

<Modal bind:showModal={isModalVisible}>
  <h2 slot="header">Заказать обратный звонок</h2>
  <form
    class="finalForm header-modal"
    on:submit|preventDefault={handleFormSubmit}>
    <div class="container pb-1 pb-md-2">
      <div class="row">
        <!-- Поле для имени -->
        <div class="col-md-12">
          <div class="form-group mt-2">
            <label class="form-label mt-2 c-yablack">Имя*</label>
            <input
              type="text"
              class="rounded-0 form-control form-control-lg"
              name="name"
              placeholder="Представьтесь"
              required />
          </div>
        </div>

        <!-- Поле для телефона с маской -->
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-label mt-1">Телефон*</label>
            <input
              name="phone"
              id="phoneModal"
              class="rounded-0 form-control form-control-lg phone"
              required
              bind:this={phoneInput}
              on:input={handleAccept}
              on:blur={handleComplete} />
          </div>
        </div>

        <!-- Сообщение о успешной отправке -->
        {#if isFormSubmitted}
          <div class="thx-block w-100">
            <p class="text-thx mt-3 mb-1"><span>Спасибо за заявку!</span></p>
            <p class="feedback-txt">Мы перезвоним Вам в ближайшее время</p>
          </div>
        {:else}
          <!-- Кнопка отправки формы -->
          <div class="col-md-12 mt-2 pt-2">
            <button
              class="text-decoration-non form-button w-100"
              role="sendForm">
              Отправить
            </button>
          </div>

          <!-- Чекбокс согласия на обработку данных -->
          <div class="form-check-mark mw-100 pt-2 mt-1">
            <div>
              <input
                type="checkbox"
                class="me-1 me-sm-2 pb-2 mb-1"
                id="modalcheckbox"
                required />
            </div>
            <label class="s12 lh-sm c-yadarkgray c-yablack" for="modalcheckbox">
              Даю согласие на обработку своих
              <a
                href="https://yug-avto-jaecoo.ru/quiz/agreement.php"
                target="_blank">персональных данных</a>
              и соглашаюсь с
              <a
                href="https://yug-avto-jaecoo.ru/quiz/policy.php"
                target="_blank">политикой обработки персональных данных</a
              >.
            </label>
          </div>
        {/if}
      </div>
    </div>
  </form>
</Modal>

<style lang="scss">
  .callback-btn {
    letter-spacing: 1%;
    display: none;
    background: #00657b;
    color: #fff;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    width: 100%;

    @media (min-width: 768px) {
      display: block;
    }
  }

  h2,
  .header {
    max-width: 419px;
    margin-right: auto;
    color: #000;
    padding-left: 7px;
    padding-top: 12px;
  }

  .header-modal {
    input.form-control-lg {
      height: 57px;
      font-size: 17px;
    }
  }

  .form-group {
    text-align: left;

    label {
      color: #000;
      font-size: 17px;
    }
  }

  .container button {
    background: #00657b;
    color: #fff;
    text-decoration: none;
    width: 100%;
  }

  .form-check-mark {
    max-width: 14px;
    display: flex;
    align-items: center;
    padding-top: 1rem;

    #modalcheckbox {
      max-width: 100%;
      margin-bottom: 0;
      min-width: 16px;
      margin-right: 0.5rem;
    }

    label {
      color: #333;
      font-size: 12px;
      line-height: 1.4;
      text-align: left;

      a {
        color: #00657b;
      }
    }
  }

  .thx-block {
    width: 100%;
    padding: 1rem 0;

    p {
      color: #000;
      text-align: left;
    }

    .text-thx {
      font-size: 22px;
      font-weight: 500;
      margin-top: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .feedback-txt {
      font-size: 18px;
    }
  }

  @media (max-width: 576px) {
    .dialog-container {
      margin: 0 auto !important;
      padding: 0 10px;
    }

    .form-check-mark {
      padding-top: 3px;

      > div {
        max-height: 32px;
        margin-top: 5px;
      }

      > div input {
        height: 100%;
      }

      .s12 {
        font-size: 10px !important;
        padding-top: 6px;
      }
    }
  }
</style>
