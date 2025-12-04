import { db } from "./firebase-config.js";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const masonry = document.getElementById("masonry");

function cargarMensajes() {
  const mensajesRef = ref(db, "mensajes");

  onValue(mensajesRef, (snapshot) => {
    const data = snapshot.val();

    masonry.innerHTML = "";

    if (!data) return;

    // Convertimos a array y ordenamos por fecha descendente
    const mensajes = Object.values(data)
      .filter((m) => m?.texto && m?.firma) // ← evita errores si hay registros vacíos
      .sort((a, b) => b.fecha - a.fecha);

    mensajes.forEach((msg) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <p>${msg.texto}</p>
        <hr>
        <p>by ${msg.firma}</p>
      `;
      masonry.appendChild(card);
    });
  });
}

cargarMensajes();
