<script lang="ts">
  import { onMount } from "svelte";

  const cookieName: string = "CodingStatus";
  const cookieValue: string = "Coding Tutorials";
  const cookieExpireDays: number = 7;

  function createCookie(
    cookieName: string,
    cookieValue: string,
    cookieExpireDays: number,
  ): void {
    const currentDate: Date = new Date();
    currentDate.setTime(
      currentDate.getTime() + cookieExpireDays * 24 * 60 * 60 * 1000,
    );
    const expires: string = "expires=" + currentDate.toUTCString();
    document.cookie =
      cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    if (document.cookie) {
      const cookiePopup: HTMLElement | null =
        document.getElementById("cookiePopup");
      if (cookiePopup) {
        cookiePopup.style.display = "none";
      }
    } else {
      alert(
        "Невозможно установить файл cookie. Пожалуйста, разрешите все файлы cookie на сайте в настройках файлов cookie вашего браузера.",
      );
    }
  }

  function getCookie(cookieName: string): string {
    const name: string = cookieName + "=";
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const ca: string[] = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c: string = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie(): void {
    const check: string = getCookie(cookieName);
    const cookiePopup: HTMLElement | null =
      document.getElementById("cookiePopup");
    if (check === "") {
      if (cookiePopup) {
        cookiePopup.style.display = "flex";
      }
    } else {
      if (cookiePopup) {
        cookiePopup.style.display = "none";
      }
    }
  }

  onMount(() => {
    checkCookie();
  });

  function handleAccept() {
    createCookie(cookieName, cookieValue, cookieExpireDays);
  }
</script>

<div id="cookiePopup">
  <div
    class="d-flex flex-column flex-md-row align-items-start align-items-lg-center">
    <p class="me-lg-2 mb-2 mb-md-1">
      Мы используем файлы cookies для улучшения работы сайта. Оставаясь на нашем
      сайте, вы соглашаетесь с условиями использования файлов cookies. Чтобы
      ознакомиться с нашими Положениями о обработки данных и об использовании
      файлов cookie, <a href="./policy.php" target="_blank">нажмите здесь</a>
    </p>
    <div>
      <button
        class="button btn btn-primary btn-sm rounded-0"
        on:click={handleAccept}>Я согласен</button>
    </div>
  </div>
</div>

<style lang="scss">
  #cookiePopup {
    position: fixed;
    bottom: 15px;
    left: 50%;
    max-width: 900px;
    transform: translateX(-50%);
    padding: 14px 17px;
    background-color: #ffffff;
    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.4);
    z-index: 99999;

    p {
      margin: 0;
      font-size: 0.7rem;
      text-align: left;
      color: #000;
    }

    a {
      color: #000;
    }

    #acceptCookie {
      width: 20%;
      min-width: 106px;
      white-space: nowrap;
    }

    .btn {
      min-width: 92px;

      &.btn-primary {
        background-color: #00657b;
        border-color: #00657b;
      }
    }

    @media (max-width: 575.98px) {
      padding: 10px;
      min-width: 96%;
      bottom: 28px;

      .cookie_accept {
        margin-top: 5px;
      }

      .button.btn.btn-sm {
        font-size: 12px;
      }

      p {
        font-size: 0.6125rem;
      }

      &.show {
        display: block;
        text-align: left;
      }
    }

    @media (min-width: 576px) {
      &.show {
        display: flex;
      }
    }

    @media (min-width: 1280px) {
      width: 100%;
      max-width: 872px;
    }
  }
</style>
