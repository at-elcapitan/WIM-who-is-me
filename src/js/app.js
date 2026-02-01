const { createApp, ref, watch, onMounted } = Vue;
const { createI18n, useI18n } = VueI18n;

const messages = {
    en: {
		left: {
			card: {
				1: {
					name: "Vladislav Nazarov",
					sub: "ElCapitan・he/him"
				},
				easter: {
					initial: "Copy username",
					1: "Copied!",
					2: "Double Copy!",
					3: "Tripple Copy!",
					4: "Dominating!!",
					5: "Rampage!!",
					6: "Megacopy!!",
					7: "Unstoppable!!",
					8: "Wicked Sick!!",
					9: "Moster Copy!!!",
					10: "GODLIKE!!!",
					11: "BEYOND GODLIKE!!!!"
				}
			}
		}
	},
	ua: {
		left: {
			card: {
				1: {
					name: "Владислав Назаров",
					sub: "Ель-Капітан・він/його"
				},
				easter: {
					initial: "Копіювати ім'я користувача",
					1: "Скопійовано!",
					2: "Подвійна копія!",
					3: "Потрійна копія!",
					4: "Неможливо!",
					5: "Божевілля!",
					6: "Мегакопія!",
					7: "Тримайте мене всі!!!",
					8: "Здуріти можна!!!",
					9: "Мегакопія!!!",
					10: "ОЙ БОЖЕЧКИ!!!",
					11: "ОЙ БОЖЕЧКИ ТА ЩЕ ТРІШКИ!!!"
				}
			}
		}
	},
	jp: {

	}
};

const browserLanguage = navigator.language;
const mapping = {
    'en': 'en',
    'ja': 'jp',
    'uk': 'ua',
};

const i18n = createI18n({
    legacy: false,
    globalInjection: false,
    locale: mapping[browserLanguage.split('-')[0]] || 'en',
    messages
});

const app = createApp({
    setup() {
        const { t, locale } = useI18n();
		const copied = ref(null);
		const copiedText = ref(null);

		let times = 1;
		let timer = null;
		let subtimer = null;
		let clicked = false;

		function timerAction() {
			copied.value.style.opacity = 0;

			setTimeout(() => {
				copied.value.classList.remove("copied");
				copied.value.classList.remove("godlike");
				copiedText.value.innerHTML = t("left.card.easter.initial");
				clicked = false;
			}, 200);

			subtimer = setTimeout(() => {
				times = 1;
			}, 1000);
		}

		function discordCopy() {
			if (timer !== null) {
				clearTimeout(timer);
			}

			if (subtimer !== null) {
				clearTimeout(subtimer);
			}

			if (clicked) {
				timer = setTimeout(() => {
					timerAction();
				}, 1000);
				
				return;
			}

			clicked = true;
			copied.value.style.opacity = 1;
			copiedText.value.innerHTML = t(`left.card.easter.${times}`);

    		navigator.clipboard.writeText("venturam");

			if (times < 10) {
				copied.value.classList.add("copied");
			} else if (times < 12) {
				copied.value.classList.remove("copied");
				copied.value.classList.add("godlike");
			}

			if (times < 11) {
				times++;
			}

			timer = setTimeout(() => {
				timerAction();
			}, 1000);
		}


		function setFavicon() {
			const link = document.getElementById("favicon");
			const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

			if (isDark) {
				link.href = "static/favicon/white.png";

				return;
			}

			link.href = "static/favicon/dark.png";	
		}

		function onHover() {
			copied.value.style.opacity = "1";
		}

		function onUnhover() {
			if(!clicked) {
				copied.value.style.opacity = "0";
			}
		}

		onMounted(() => {
			setFavicon();

			document.documentElement.setAttribute('data-theme', "auto");
		});

        return { locale, t, copied, copiedText, discordCopy, onHover, onUnhover };
    }
});

app.use(i18n).mount("#app");
