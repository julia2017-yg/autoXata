	document.addEventListener('DOMContentLoaded', function () {
			const salonsWrapp = document.querySelector('.header-salons-wrapp');
			const salonsList = document.querySelector('.header-salons-list');

			function centerSalonsList() {
				const screenWidth = window.innerWidth;
				const listWidth = salonsList.offsetWidth;
				const right = (screenWidth - listWidth) / 2;

				salonsList.style.right = `${right}px`;
			}

			salonsWrapp.addEventListener('click', function (e) {
				e.preventDefault();
				salonsWrapp.classList.toggle('active');

				if (salonsWrapp.classList.contains('active')) {
					salonsList.style.display = 'block';
					centerSalonsList(); // Центруем
				} else {
					salonsList.style.display = 'none';
				}
			});

			// Закрытие при клике вне
			document.addEventListener('click', function (e) {
				if (!salonsWrapp.contains(e.target) && !salonsList.contains(e.target)) {
					salonsWrapp.classList.remove('active');
					salonsList.style.display = 'none';
				}
			});

			// Перецентровка при ресайзе
			window.addEventListener('resize', function () {
				if (salonsWrapp.classList.contains('active')) {
					centerSalonsList();
				}
			});
		});
