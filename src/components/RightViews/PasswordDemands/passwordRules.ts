// src/components/RightViews/PasswordDemands/passwordRules.ts
import type { RuleTranslationKey } from '../../../i18n/passwordRulesI18n';



/**
 * CENTRAL KONFIGURATION FÖR LÖSENORDSKRAV
 * * Här styr du "reglerna för spelet". Ändringar här slår igenom både i 
 * valideringslogiken (test-funktionerna) och i den text som visas för användaren.
 */
export const passwordConfig = {
  // Ange minsta antal tecken (t.ex. 8, 10 eller 12)
  minLength: 8,
  
  // Kräva minst en liten bokstav (true = ja, false = nej)
  requireLowercase: true,
  
  // Kräva minst en stor bokstav (true = ja, false = nej)
  requireUppercase: true,
  
  // Ange minsta antal siffror som krävs. 
  // Sätt till 0 för att ta bort kravet på siffror helt.
  minNumbers: 1,
  
  // Kräva minst ett specialtecken (!@#$ osv) (true = ja, false = nej)
  requireSpecial: true,
  
  // Visa eller dölj den extra informationstexten (fritexten) under listan
  showFreeText: true, 
};

/**
 * 
 * 
 */


export interface PasswordRule {
  id: string;
  labelKey: RuleTranslationKey;
  value?: number | string;
  test: (password: string) => boolean;
}

const buildRules = (): PasswordRule[] => {
  const rules: PasswordRule[] = [];

  // Längd
  rules.push({ 
    id: 'minLength', 
    labelKey: 'ruleMinLength', 
    value: passwordConfig.minLength, 
    test: (pw) => pw.length >= passwordConfig.minLength 
  });

  // Små bokstäver
  if (passwordConfig.requireLowercase) {
    rules.push({ id: 'lowercase', labelKey: 'ruleLowercase', test: (pw) => /[a-z]/.test(pw) });
  }

  // Stora bokstäver
  if (passwordConfig.requireUppercase) {
    rules.push({ id: 'uppercase', labelKey: 'ruleUppercase', test: (pw) => /[A-Z]/.test(pw) });
  }

  // Siffror
  if (passwordConfig.minNumbers > 0) {
    rules.push({ 
      id: 'number', 
      labelKey: 'ruleNumber', 
      value: passwordConfig.minNumbers,
      test: (pw) => (pw.match(/\d/g) || []).length >= passwordConfig.minNumbers 
    });
  }

  // Specialtecken
  if (passwordConfig.requireSpecial) {
    rules.push({ id: 'special', labelKey: 'ruleSpecial', test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) });
  }

  return rules;
};

export const passwordRules = buildRules();
export const passwordHeaderKey: RuleTranslationKey = 'ruleHeaderText';
export const freeTextKey: RuleTranslationKey = 'ruleFreeText';