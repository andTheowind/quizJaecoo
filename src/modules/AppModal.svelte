<script lang="ts">
  import Modal from "@components/Modal.svelte";
  import { imask } from "@imask/svelte";

  let value: string;
  let options = {
    mask: "+{7}(000)000-00-00",
    lazy: false,
  };

  function accept({ detail: maskRef }: { detail: any }) {
    console.log("accept ", maskRef.value);
    value = maskRef.value;
  }

  function complete({ detail: maskRef }: { detail: any }) {
    console.log("complete ", maskRef.unmaskedValue);
  }

  let showModal = false;
  let formSubmitted = false;

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
        t = new URLSearchParams;
    t.append("fio", ((n = e.get("name")) == null ? void 0 : n.toString()) || ""), 
    t.append("phoneNumber", ((r = e.get("phone")) == null ? void 0 : r.toString().replace(/[^\d;]/g, '')) || ""), 
    t.append("subject", "Формы квиза Jaecoo"), 
    t.append("requestUrl", location.href), 
    // @ts-ignore
    t.append("sessionId", window.call_value); 
    let s = `https://api.calltouch.ru/calls-service/RestAPI/requests/62173/register/?${t.toString()}`;
    try {
        const l = await (await fetch(s, {
            method: "GET"
        })).text();
        console.log("Успешная отправка, параметры:", t), console.log("complete, url = ", s)
    } catch (a) {
        console.error("Ошибка при отправке запроса:", a)
    }
  }

  async function sendAll(event: SubmitEvent) {
    await sendMail(event);
    await sendMailCalltouch(event);
    formSubmitted = true;
  }
</script>

<button
  class="callback-btn text-uppercase s12 py-2 px-2 px-xl-3 px-xxl-5 text-white w-100"
  on:click={() => (showModal = true)}>
  Обратный звонок
</button>

<Modal bind:showModal>
  <h2 slot="header">Заказать обратный звонок</h2>
  <form class="finalForm header-modal" on:submit|preventDefault={sendAll}>
    <div class="container pb-1 pb-md-2">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group mt-2">
            <label class="form-label mt-2 c-yablack">Имя*</label>
            <input
              type="name"
              class="rounded-0 form-control form-control-lg"
              name="name"
              placeholder="Представьтесь"
              required />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-label mt-1">Телефон*</label>
            <input
              name="phone"
              id="phoneModal"
              class="rounded-0 form-control form-control-lg phone"
              required
              {value}
              use:imask={options}
              on:input={(event) =>
                accept({ detail: { maskRef: event.target } })} />
          </div>
        </div>
        {#if formSubmitted}
          <div class="thx-block w-100">
            <p class="text-thx mt-3 mb-1"><span>Спасибо за заявку!</span></p>
            <p class="feedback-txt">Мы перезвоним Вам в ближайшее время</p>
          </div>
        {:else}
          <div class="col-md-12 mt-2 pt-2">
            <button
              class="text-decoration-non form-button w-100"
              role="sendForm">
              Отправить
            </button>
          </div>
          <div class="form-check-mark mw-100 pt-2 mt-1">
            <div>
              <input
                type="checkbox"
                class="me-1 me-sm-2 pb-2 mb-1"
                id="modalcheckbox"
              />
            </div>
            <label class="s12 lh-sm c-yadarkgray c-yablack" for="modalcheckbox">
              Даю согласие на обработку своих
              <a href="https://yug-avto-jaecoo.ru/quiz/agreement.php" target="_blank">
                персональных данных
              </a>
              и соглашаюсь с
              <a href="https://yug-avto-jaecoo.ru/quiz/policy.php" target="_blank"
                >политикой обработки персональных данных
              </a>
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

  .callback-btn,
  .container button {
    background: #00657b;
  }

  .form-check-mark {
    max-width: 14px;
    display: flex;
    align-items: center;

    #modalcheckbox {
      max-width: 100%;
      margin-bottom: 0;
      min-width: 16px;
    }
    a {
      color: #00657b;
    }
  }

  .thx-block p,
  .form-check-mark label {
    color: #000;
    text-align: left;
  }

  .thx-block p.text-thx {
    font-size: 22px;
  }

  .text-thx {
    font-weight: 500;
  }

  .feedback-txt {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    .dialog-container {
      margin-left: 10px auto !important;
      margin-right: 10px auto !important;
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
  @media (min-width: 768px) {
    .callback-btn {
      display: block;
    }
  }
</style>
