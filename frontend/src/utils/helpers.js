// Funções utilitárias para a aplicação

/**
 * Formata uma data para exibição
 * @param {string|Date} date - Data a ser formatada
 * @returns {string} Data formatada
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Formata um número para exibição de views
 * @param {number} num - Número a ser formatado
 * @returns {string} Número formatado
 */
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Trunca um texto com ellipsis
 * @param {string} text - Texto a ser truncado
 * @param {number} maxLength - Tamanho máximo
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Gera uma cor baseada em uma string (para avatares)
 * @param {string} string - String base
 * @returns {string} Cor em hexadecimal
 */
export const stringToColor = (string) => {
  if (!string) return '#e50914';
  
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#e50914', '#ff6b6b', '#feca57', '#48dbfb', 
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Verifica se uma imagem existe
 * @param {string} url - URL da imagem
 * @returns {Promise<boolean>} Se a imagem existe
 */
export const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * Debounce function
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera
 * @returns {Function} Função debounced
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo
 * @returns {Function} Função throttled
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default {
  formatDate,
  formatNumber,
  truncateText,
  stringToColor,
  checkImageExists,
  debounce,
  throttle,
};
