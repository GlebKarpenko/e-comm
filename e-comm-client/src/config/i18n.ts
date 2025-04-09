import { createI18n } from "vue-i18n";
import uk from "@/assets/lang/uk.json";
import en from "@/assets/lang/en.json";

type MessageSchema = typeof uk;

export enum Locales {
    UKR = 'uk',
    ENG = 'en'
}

const i18n = createI18n<[MessageSchema], Locales>({
    locale: Locales.UKR,
    fallbackLocale: Locales.ENG,
    messages: {
        'uk': uk,
        'en': en
    },
});

export default i18n;