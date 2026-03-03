export interface PasswordRule {
  id: string
  label: string
  test: (password: string) => boolean
}

export const passwordRules: PasswordRule[] = [
  { id: 'minLength', label: 'Minst 8 tecken', test: (pw) => pw.length >= 8 },
  { id: 'lowercase', label: 'Minst en liten bokstav', test: (pw) => /[a-z]/.test(pw) },
  { id: 'uppercase', label: 'Minst en stor bokstav', test: (pw) => /[A-Z]/.test(pw) },
  { id: 'number', label: 'Minst en siffra', test: (pw) => /\d/.test(pw) },
  { id: 'special', label: 'Minst ett specialtecken', test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) }
]