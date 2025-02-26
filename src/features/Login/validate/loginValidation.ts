// features/Login/validate/loginValidation.ts
export function validateEmail(email: string): boolean {
  // Expressão regular simples para validação de email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
