document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form.send-to-sheet");

  forms.forEach((form) => {
    const nameInput = form.querySelector('input[name="your-name"]');
    const phoneInput = form.querySelector('input[name="your-phone"]');
    const purposeSelect = form.querySelector('select[name="purpose"]');
    const checkbox = form.querySelector('input[type="checkbox"]');
    const formAcceptInput = form.querySelector(".form-accept-item-input");
    const submitBtn = form.querySelector(".submit-btn");

    const statusMessage = document.createElement("p");
    statusMessage.style.marginTop = "10px";
    statusMessage.style.marginBottom = "10px";
    statusMessage.style.color = "#21b66e";
    statusMessage.style.textAlign = "center";
    statusMessage.style.fontWeight = "bold";
    statusMessage.style.padding = "10px";
    statusMessage.style.borderRadius = "4px";
    submitBtn.insertAdjacentElement("afterend", statusMessage);

    // ✅ Всегда checked и видим активное состояние
    if (checkbox) {
      checkbox.checked = true;
      formAcceptInput?.classList.add("active");
    }

    // Убираем ненужный обработчик checkbox.addEventListener(...)

    // При фокусе — вставляем 380, если нет кода
    phoneInput.addEventListener("focus", () => {
      if (!phoneInput.value.startsWith("380")) {
        phoneInput.value = "380";
      }
      phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    });

    nameInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐʼ\s\-]/g, "");
    });

    phoneInput.addEventListener("input", () => {
      let val = phoneInput.value;

      if (!val.startsWith("380")) {
        val = "380" + val.replace(/\D/g, "");
      } else {
        val = val.replace(/\D/g, "");
      }

      if (val.length > 3 && val[3] === "0") {
        val = val.slice(0, 3) + val.slice(4);
      }

      val = val.slice(0, 12);
      phoneInput.value = val;
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusMessage.textContent = "";

      const name = nameInput.value.trim();
      let phone = phoneInput.value.trim();
      const purpose = purposeSelect.value;

      if (!name || !phone || !purpose) {
        statusMessage.textContent = "Будь ласка, заповніть всі поля.";
        return;
      }
      if (phone.length !== 12) {
        statusMessage.textContent = "Введіть коректний номер телефону з 380 на початку";
        return;
      }

      console.log("Номер для відправки:", phone);

      const data = {
        "your-name": name,
        "your-phone": phone,
        purpose: purpose,
      };

      submitBtn.disabled = true;

      fetch("https://script.google.com/macros/s/AKfycbyCMpaNe4jKzSmdF460con1VoTx6nQQIkWZRHa6f3p13klmspkTZa-2ymlbJqPuiIRd/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams(data),
      })
        .then((res) => res.text())
        .then(resultText => {
          let result;
          try {
            result = JSON.parse(resultText);
          } catch {
            statusMessage.textContent = "Помилка при надсиланні. Спробуйте пізніше.";
            submitBtn.disabled = false;
            return;
          }
          if (result.result === "success") {
            statusMessage.textContent = "Дякуємо! Вашу заявку надіслано.";
            form.reset();

            // ✅ Поддерживаем checkbox после очистки формы
            if (checkbox) {
              checkbox.checked = true;
              formAcceptInput?.classList.add("active");
            }

            submitBtn.disabled = true;
          } else {
            statusMessage.textContent = "Помилка при надсиланні. Спробуйте пізніше.";
            submitBtn.disabled = false;
          }
        })

        .catch(() => {
          statusMessage.textContent = "Помилка при надсиланні. Спробуйте пізніше.";
          submitBtn.disabled = false;
        });
    });
  });
});
