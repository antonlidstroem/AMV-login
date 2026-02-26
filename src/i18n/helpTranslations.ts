// src/i18n/helpTranslations.ts

export const helpTranslations = {
  sv: {
    forgotPassword: 'Jag har glömt mitt lösenord',
    forgotPasswordHelp:
      'Om du har glömt ditt lösenord kan du återställa det genom att klicka på "Glömt lösenord?" på inloggningssidan.',

    noEmailAccess: 'Jag har inte tillgång till min e-post',
    noEmailAccessHelp:
      'Om du inte längre har tillgång till den e-postadress som är kopplad till ditt konto, vänligen kontakta vår support.',

    systemError: 'Jag har stött på fel i systemet',
    systemErrorHelp:
      'Om du har stött på ett tekniskt fel, vänligen kontakta vår support och beskriv problemet så detaljerat som möjligt.'
  },

  en: {
    forgotPassword: 'I have forgotten my password',
    forgotPasswordHelp:
      'If you have forgotten your password, you can reset it by clicking "Forgot password?" on the login page.',

    noEmailAccess: "I don't have access to my email",
    noEmailAccessHelp:
      'If you no longer have access to the email address associated with your account, please contact our support.',

    systemError: 'I have encountered a system error',
    systemErrorHelp:
      'If you have encountered a technical error, please contact our support and describe the problem in as much detail as possible.'
  }
}

export type HelpLang = keyof typeof helpTranslations
export type HelpTranslationKey = keyof typeof helpTranslations['sv']