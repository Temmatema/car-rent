import "./swiper.js";
import "./phone.js";
import "./modal.js";
import "./accordeon.js";

document.addEventListener('DOMContentLoaded', function () {
	const image = document.querySelector('.app__image');
	const omodaBtn = document.querySelector('.name-omoda');
	const exeedBtn = document.querySelector('.name-exeed');
	const oraBtn = document.querySelector('.name-ora');

	function changeCarImage(src) {
		if (!image) return;
		image.style.opacity = 0;
		setTimeout(() => {
			image.src = src;
			image.onload = () => {
				image.style.opacity = 1;
			};
		}, 200);
	}

	if (image && omodaBtn && exeedBtn && oraBtn) {
		omodaBtn.addEventListener('click', () => changeCarImage('img/omoda-large.png'));
		exeedBtn.addEventListener('click', () => changeCarImage('img/exeed-large.png'));
		oraBtn.addEventListener('click', () => changeCarImage('img/ora-large.png'));
	}
});