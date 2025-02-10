/**
 * Formata uma data usando a localidade especificada (padrão: 'pt-BR').
 * @param date A data a ser formatada.
 * @param locale Localidade para formatação (default: 'pt-BR').
 * @returns Uma string representando a data formatada.
 */
export function formatDate(date: Date, locale: string = 'pt-BR'): string {
    return new Intl.DateTimeFormat(locale).format(date);
  }
  
  /**
   * Gera uma string aleatória composta de letras e números.
   * @param length Tamanho desejado para a string (default: 8).
   * @returns Uma string aleatória.
   */
  export function generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  /**
   * Capitaliza a primeira letra de uma string.
   * @param str A string a ser capitalizada.
   * @returns A string com a primeira letra em maiúscula.
   */
  export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  /**
   * Trunca uma string se ela ultrapassar o tamanho máximo definido,
   * adicionando "..." no final.
   * @param str A string a ser truncada.
   * @param maxLength O tamanho máximo permitido.
   * @returns A string truncada, se necessário.
   */
  export function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  }
  