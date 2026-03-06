// src/components/RightViews/PasswordDemands/passwordRules.ts
import type { RuleTranslationKey } from '../../../i18n/passwordRulesI18n';



/**
 * CENTRAL KONFIGURATION FÖR LÖSENORDSKRAV
 * * Här styr du "reglerna för spelet". Ändringar här slår igenom både i 
 * valideringslogiken (test-funktionerna) och i den text som visas för användaren.
 */
export const passwordConfig = {
  // Ange minsta antal tecken (t.ex. 8, 10 eller 12)
  minLength: 6,
  
  // Kräva minst en gemen (true = ja, false = nej)
  requireLowercase: false,
  
  // Kräva minst en versal (true = ja, false = nej)
  requireUppercase: true,
  
  // Ange minsta antal siffror som krävs. 
  // Sätt till 0 för att ta bort kravet på siffror helt.
  minNumbers: 1,
  
  // Kräva minst ett specialtecken (!@#$ osv) (true = ja, false = nej)
  requireSpecial: true,
  
  //Lösenord får inte vara lätt att gissa sig till
  requireNotGuessable: true, 

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

    const isEasyToGuess = (pw: string): boolean => {
      if (pw.length < 3) return false; // För kort för att testa mönster

      // 1. Kolla efter upprepade tecken (t.ex. "aaa", "111")
      const repeats = /(.)\1\1/;
      if (repeats.test(pw)) return true;

      // 2. Kolla efter enkla tangentbordssekvenser (t.ex. "123", "abc", "qwe")
      const sequences = [
        '0123456789',
        '9876543210',
        'abcdefghijklmnopqrstuvwxyz',
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm'
      ];
      
      const lowerPw = pw.toLowerCase();
      for (const seq of sequences) {
        for (let i = 0; i <= seq.length - 3; i++) {
          if (lowerPw.includes(seq.substring(i, i + 3))) return true;
        }
      }

      // 3. Kolla efter vanliga förbjudna ord
      const forbidden = ['password', 'losenord', 'password123'];
      if (forbidden.includes(lowerPw)) return true;

      return false;
    };

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

  if (passwordConfig.requireNotGuessable) {
    rules.push({ 
      id: 'notGuessable', 
      labelKey: 'ruleNotGuessable', 
      test: (pw) => !isEasyToGuess(pw) // Vi vill att den INTE ska vara lättgissad
    });
  }

  return rules;
};

export const passwordRules = buildRules();
export const passwordHeaderKey: RuleTranslationKey = 'ruleHeaderText';
export const freeTextKey: RuleTranslationKey = 'ruleFreeText';
