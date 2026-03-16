import type { RuleTranslationKey } from '../../../i18n/passwordRulesI18n';

export const passwordConfig = {
  minLength: 6,
  requireLowercase: false,
  requireUppercase: true,
  minNumbers: 1,
  requireSpecial: true,
  requireNotGuessable: true,
  showFreeText: true,
};

export interface PasswordRule {
  id: string;
  labelKey: RuleTranslationKey;
  value?: number | string;
  test: (password: string) => boolean;
}

const isEasyToGuess = (pw: string): boolean => {
  if (pw.length < 3) return false;
  if (/(.)\1\1/.test(pw)) return true;
  const sequences = ['0123456789','9876543210','abcdefghijklmnopqrstuvwxyz','qwertyuiop','asdfghjkl','zxcvbnm'];
  const lowerPw = pw.toLowerCase();
  for (const seq of sequences) {
    for (let i = 0; i <= seq.length - 3; i++) {
      if (lowerPw.includes(seq.substring(i, i + 3))) return true;
    }
  }
  const forbidden = ['password','losenord','password123'];
  return forbidden.includes(lowerPw);
};

const buildRules = (): PasswordRule[] => {
  const rules: PasswordRule[] = [];
  rules.push({ id: 'minLength', labelKey: 'ruleMinLength', value: passwordConfig.minLength, test: (pw) => pw.length >= passwordConfig.minLength });
  if (passwordConfig.requireLowercase) rules.push({ id: 'lowercase', labelKey: 'ruleLowercase', test: (pw) => /[a-z]/.test(pw) });
  if (passwordConfig.requireUppercase) rules.push({ id: 'uppercase', labelKey: 'ruleUppercase', test: (pw) => /[A-Z]/.test(pw) });
  if (passwordConfig.minNumbers > 0) rules.push({ id: 'number', labelKey: 'ruleNumber', value: passwordConfig.minNumbers, test: (pw) => (pw.match(/\d/g) || []).length >= passwordConfig.minNumbers });
  if (passwordConfig.requireSpecial) rules.push({ id: 'special', labelKey: 'ruleSpecial', test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) });
  if (passwordConfig.requireNotGuessable) rules.push({ id: 'notGuessable', labelKey: 'ruleNotGuessable', test: (pw) => !isEasyToGuess(pw) });
  return rules;
};

export const passwordRules = buildRules();
export const passwordHeaderKey: RuleTranslationKey = 'ruleHeaderText';
export const freeTextKey: RuleTranslationKey = 'ruleFreeText';
