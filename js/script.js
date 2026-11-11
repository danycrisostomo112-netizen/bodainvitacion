/* =========================================================
   INVITACIÓN XV AÑOS DANIA
   JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. CUENTA REGRESIVA
     ======================================================= */

  /*
    Fecha del evento:
    01 de diciembre de 2026 a las 18:00 horas.

    -06:00 corresponde al horario de Guatemala.
  */

  const targetDate =
    new Date("2026-11-29T15:30:00-06:00").getTime();


  const daysEl =
    document.getElementById("days");

  const hoursEl =
    document.getElementById("hours");

  const minutesEl =
    document.getElementById("minutes");

  const secondsEl =
    document.getElementById("seconds");

  const countdownMessage =
    document.getElementById("countdownMessage");


  function pad(number) {
    return String(number).padStart(2, "0");
  }


  function updateCountdown() {

    const now = Date.now();

    const distance =
      targetDate - now;


    if (distance <= 0) {

      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      countdownMessage.textContent =
        "¡Hoy es el gran día!";

      return;
    }


    const days =
      Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (distance /
          (1000 * 60 * 60)) %
          24
      );


    const minutes =
      Math.floor(
        (distance /
          (1000 * 60)) %
          60
      );


    const seconds =
      Math.floor(
        (distance / 1000) % 60
      );


    daysEl.textContent =
      pad(days);

    hoursEl.textContent =
      pad(hours);

    minutesEl.textContent =
      pad(minutes);

    secondsEl.textContent =
      pad(seconds);
  }


  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );


  /* =======================================================
     2. ANIMACIONES AL HACER SCROLL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }

        });

      },
      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -40px 0px"
      }
    );


  revealElements.forEach(
    (element) =>
      observer.observe(element)
  );


  /* =======================================================
     3. BOTÓN ABRIR INVITACIÓN
     ======================================================= */

  const openInvitation =
    document.getElementById(
      "openInvitation"
    );


  const messageSection =
    document.getElementById(
      "mensaje"
    );


  openInvitation.addEventListener(
    "click",
    () => {

      messageSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      startMusic();
    }
  );


  /* =======================================================
     4. MÚSICA
     ======================================================= */

  const music =
    document.getElementById(
      "backgroundMusic"
    );


  const musicButton =
    document.getElementById(
      "musicButton"
    );


  async function startMusic() {

    if (!music) {
      return;
    }


    try {

      await music.play();

      musicButton.classList.add(
        "is-playing"
      );

      musicButton.setAttribute(
        "aria-label",
        "Pausar música"
      );

    } catch (error) {

      /*
        Los navegadores pueden bloquear
        reproducción automática.

        En ese caso el usuario puede
        tocar el botón de música.
      */

      console.info(
        "La reproducción automática fue bloqueada por el navegador."
      );
    }
  }


  musicButton.addEventListener(
    "click",
    async () => {

      if (music.paused) {

        await startMusic();

      } else {

        music.pause();

        musicButton.classList.remove(
          "is-playing"
        );

        musicButton.setAttribute(
          "aria-label",
          "Activar música"
        );
      }

    }
  );

});
