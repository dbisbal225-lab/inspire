// Utilidades reutilizables - Optimizado para performance

const AVATAR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

const REGEX_PATTERNS = {
  DNI: /^\d{8}[A-Z]$/,
  NIE: /^[A-Z]\d{7}[A-Z]$/,
  PASSPORT: /^[A-Z0-9]{1,9}$/
};

const MAX_LENGTHS = {
  DNI: 9,
  NIE: 9,
  PASSPORT: 9
};

/**
 * Valida entrada según método de login
 * @param {string} method - Método: DNI, NIE, PASSPORT
 * @param {string} value - Valor a validar
 * @param {function} getTranslation - Función para obtener traducciones
 * @returns {object} {valid: boolean, message: string}
 */
export const validateInput = (method, value, getTranslation) => {
  const cleanValue = value.trim().toUpperCase();
  
  if (cleanValue.length === 0) {
    return { valid: false, message: '' };
  }
  
  if (cleanValue.length > MAX_LENGTHS[method]) {
    return { valid: false, message: `${method} no puede tener más de ${MAX_LENGTHS[method]} caracteres` };
  }
  
  if (!REGEX_PATTERNS[method].test(cleanValue)) {
    const errorKey = `${method.charAt(0) + method.slice(1).toLowerCase()}Error`;
    return { valid: false, message: getTranslation(errorKey) };
  }
  
  return { valid: true, message: '' };
};

/**
 * Obtiene color de avatar basado en el nombre
 * @param {string} name - Nombre del usuario
 * @returns {string} Color en formato hex
 */
export const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

/**
 * Determina el rol del usuario según tipo de documento
 * @param {string} docType - Tipo de documento
 * @param {function} getTranslation - Función para obtener traducciones
 * @returns {string} Rol determinado
 */
export const determineUserRole = (docType, getTranslation) => {
  const roles = {
    'DNI': getTranslation('paciente'),
    'NIE': getTranslation('visitante'),
    'PASSPORT': getTranslation('personalMedico')
  };
  return roles[docType] || getTranslation('usuario');
};

/**
 * Obtiene placeholder según método de login
 * @param {string} method - Método: DNI, NIE, PASSPORT
 * @param {function} getTranslation - Función para obtener traducciones
 * @returns {string} Placeholder
 */
export const getInputPlaceholder = (method, getTranslation) => {
  const placeholders = {
    'DNI': getTranslation('dniPlaceholder'),
    'NIE': getTranslation('niePlaceholder'),
    'PASSPORT': getTranslation('passportPlaceholder')
  };
  return placeholders[method] || '';
};

/**
 * Obtiene longitud máxima del input
 * @param {string} method - Método de login
 * @returns {number}
 */
export const getInputMaxLength = (method) => {
  return MAX_LENGTHS[method] || 9;
};
