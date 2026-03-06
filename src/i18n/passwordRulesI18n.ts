// src/i18n/passwordRulesI18n.ts
import type { Lang } from './useI18n';

export const passwordRuleTranslations: Record<Lang, {
  ruleHeaderText: string,
  ruleMinLength: string;
  ruleLowercase: string;
  ruleUppercase: string;
  ruleNumber: string;
  ruleSpecial: string;
  ruleNotGuessable: string;
  ruleFreeText: string; 

}> = {
  sv: {
    ruleHeaderText: "Krav",
    ruleMinLength: 'Minst {n} tecken',
    ruleLowercase: 'Minst en liten bokstav',
    ruleUppercase: 'Minst en stor bokstav',
    ruleNumber: 'Minst {n} siffra/siffror',
    ruleSpecial: 'Minst ett specialtecken',
    ruleNotGuessable: 'Får ej vara för enkelt (t.ex. 123 eller aaa)',
    ruleFreeText: 'Lösenordet bör inte innehålla ditt namn eller användarnamn.'
  },
  en: {
    ruleHeaderText: "Demand",
    ruleMinLength: 'At least {n} characters',
    ruleLowercase: 'At least one lowercase letter',
    ruleUppercase: 'At least one uppercase letter',
    ruleNumber: 'At least {n} digit(s)',
    ruleSpecial: 'At least one special character',
    ruleNotGuessable: 'Must not be too simple (e.g. 123 or aaa)',
    ruleFreeText: 'The password should not contain your name or username.'
  },
  no: {
    ruleHeaderText: "?",
    ruleMinLength: 'Minst {n} tegn',
    ruleLowercase: 'Minst én liten bokstav',
    ruleUppercase: 'Minst én stor bokstav',
    ruleNumber: 'Minst {n} tall',
    ruleSpecial: 'Minst ett spesialtegn',
    ruleNotGuessable: '?',
    ruleFreeText: '?'
  },
  fi: {
    ruleHeaderText: "?",
    ruleMinLength: 'Vähintään {n} merkkiä',
    ruleLowercase: 'Vähintään yksi pieni kirjain',
    ruleUppercase: 'Vähintään yksi iso kirjain',
    ruleNumber: 'Vähintään {n} numeroa',
    ruleSpecial: 'Vähintään yksi erikoismerkki',
    ruleNotGuessable: 'Must not be too simple (e.g. 123 or aaa)',
    ruleFreeText: 'The password should not contain your name or username.'
  }
};

export type RuleTranslationKey = keyof typeof passwordRuleTranslations['sv'];