// src/i18n/passwordRulesI18n.ts
import type { Lang } from './useI18n';

export const passwordRuleTranslations: Record<Lang, {
  ruleHeaderText: string,
  ruleMinLength: string;
  ruleLowercase: string;
  ruleUppercase: string;
  ruleNumber: string;
  ruleSpecial: string;
  ruleFreeText: string; 
}> = {
  sv: {
    ruleHeaderText: "Krav",
    ruleMinLength: 'Minst {n} tecken',
    ruleLowercase: 'Minst en liten bokstav',
    ruleUppercase: 'Minst en stor bokstav',
    ruleNumber: 'Minst {n} siffra/siffror',
    ruleSpecial: 'Minst ett specialtecken',
    ruleFreeText: "Lösenordet bör inte innehålla ditt namn eller användarnamn."
  },
  en: {
    ruleHeaderText: "Demand",
    ruleMinLength: 'At least {n} characters',
    ruleLowercase: 'At least one lowercase letter',
    ruleUppercase: 'At least one uppercase letter',
    ruleNumber: 'At least {n} digit(s)',
    ruleSpecial: 'At least one special character',
    ruleFreeText: "The password should not contain your name or username."
  },
  no: {
    ruleHeaderText: "?",
    ruleMinLength: 'Minst {n} tegn',
    ruleLowercase: 'Minst én liten bokstav',
    ruleUppercase: 'Minst én stor bokstav',
    ruleNumber: 'Minst {n} tall',
    ruleSpecial: 'Minst ett spesialtegn',
    ruleFreeText: "Passordet bør ikke inneholde navnet ditt eller brukernavnet ditt."
  },
  fi: {
    ruleHeaderText: "?",
    ruleMinLength: 'Vähintään {n} merkkiä',
    ruleLowercase: 'Vähintään yksi pieni kirjain',
    ruleUppercase: 'Vähintään yksi iso kirjain',
    ruleNumber: 'Vähintään {n} numeroa',
    ruleSpecial: 'Vähintään yksi erikoismerkki',
    ruleFreeText: "Salasana ei saa sisältää nimeäsi tai käyttäjätunnustasi."
  }
};

export type RuleTranslationKey = keyof typeof passwordRuleTranslations['sv'];