import { db } from "./firebase-config.js";
import {
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const writeMessageBtn = document.getElementById("write");
const seeMessagesBtn = document.querySelector(".see-messages");
const popups = document.querySelectorAll(".pop-up");
const writePopup = popups[0];
const seePopup = popups[1];

function centerPopup(popup) {
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.zIndex = "9999";
  popup.style.background = "white";
  popup.style.padding = "20px";
  popup.style.borderRadius = "10px";
}

function openPopup(popup) {
  centerPopup(popup);
  popup.style.display = "block";
}

function closePopup(popup) {
  popup.style.display = "none";
}

writeMessageBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openPopup(writePopup);
});

seeMessagesBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openPopup(seePopup);
});

document.addEventListener("click", (e) => {
  const clickedInsideWrite = writePopup.contains(e.target);
  const clickedInsideSee = seePopup.contains(e.target);
  const clickedWriteBtn = writeMessageBtn.contains(e.target);
  const clickedSeeBtn = seeMessagesBtn.contains(e.target);

  if (
    !clickedInsideWrite &&
    !clickedInsideSee &&
    !clickedWriteBtn &&
    !clickedSeeBtn
  ) {
    closePopup(writePopup);
    closePopup(seePopup);
  }
});

const sendButton = document.getElementById("send-password");
const passwordInput = document.getElementById("password-input");
const correctpassword = "panconchocolate";

sendButton.addEventListener("click", (e) => {
  e.preventDefault();

  const password = passwordInput.value.trim();

  if (password === correctpassword) {
    window.location.href = "letters.html";
  }
});

// -------------------------
// GUARDAR MENSAJE EN DB
// -------------------------

const btnEnviarMensaje = document.getElementById("btn-enviar-mensaje");
const mensajeInput = document.getElementById("mensaje-texto");
const firmaInput = document.getElementById("mensaje-firma");

btnEnviarMensaje.addEventListener("click", async () => {
  const texto = mensajeInput.value.trim();
  const firma = firmaInput.value.trim();

  if (!texto || !firma) {
    alert("Por favor escribe un mensaje y una firma.");
    return;
  }

  try {
    const mensajesRef = ref(db, "mensajes");
    const nuevo = push(mensajesRef);

    await set(nuevo, {
      texto,
      firma,
      fecha: Date.now(),
    });

    mensajeInput.value = "";
    firmaInput.value = "";
    closePopup(writePopup);
    alert("Mensaje enviado con éxito ❤️");
  } catch (error) {
    console.error("Error guardando mensaje:", error);
    alert("Error guardando el mensaje.");
  }
});
