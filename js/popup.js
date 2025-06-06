
	document.addEventListener("DOMContentLoaded", function () {
			const popupWrapper = document.querySelector(".feedback-popup-wrapp");
			const popupInner = popupWrapper.querySelector(".feedback-popup");

			// Глобальная инициализация селекта на главной (не в попапе)
			const mainSelect = document.querySelector('select[name="your-choose"]');
			if (mainSelect) {
				new Choices(mainSelect, {
					searchEnabled: false,
					itemSelectText: '',
					shouldSort: false,
				});
			}

			document.querySelectorAll("a.open-popup").forEach(function (btn) {
				btn.addEventListener("click", function (e) {
					e.preventDefault();

					popupWrapper.classList.add("active", "feedback-popup-wrapp-consultation");
					popupInner.classList.add("active");
					document.querySelector(".popup-fill").style.display = "block";

				});
			});

			document.querySelectorAll(".close-popup").forEach(function (closeBtn) {
				closeBtn.addEventListener("click", function () {
					popupWrapper.classList.remove("active", "feedback-popup-wrapp-consultation");
					popupInner.classList.remove("active");
					document.querySelector(".popup-fill").style.display = "none";
				});
			});

			const popupFill = document.querySelector(".popup-fill");
			popupFill.addEventListener("click", function () {
				popupWrapper.classList.remove("active", "feedback-popup-wrapp-consultation");
				popupInner.classList.remove("active");
				popupFill.style.display = "none";
			});

			// Защита от закрытия при клике внутрь
			popupWrapper.addEventListener("click", function (e) {
				e.stopPropagation();
			});
		});