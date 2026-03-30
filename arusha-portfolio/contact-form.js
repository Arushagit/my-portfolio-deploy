// contact-form.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const phone   = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  const submitBtn = form.querySelector("button[type='submit']");

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    await addDoc(collection(db, "contacts"), {
      name,
      email,
      phone,
      message,
      createdAt: serverTimestamp()
    });

    submitBtn.textContent = "Sent ✓";
    submitBtn.style.background = "#22c55e";
    form.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send";
      submitBtn.style.background = "";
    }, 3000);

  } catch (error) {
    console.error("Error saving to Firestore:", error);
    submitBtn.textContent = "Failed. Try again.";
    submitBtn.disabled = false;
  }
});