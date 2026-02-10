const validateFibonacci = (value) => {
  if (typeof value !== 'number') {
    return {
      isValid: false,
      message: 'Fibonacci value must be a number',
    };
  }

  if (!Number.isInteger(value)) {
    return {
      isValid: false,
      message: 'Fibonacci value must be an integer',
    };
  }

  if (value < 0) {
    return {
      isValid: false,
      message: 'Fibonacci value must be non-negative',
    };
  }

  if (value > 10000) {
    return {
      isValid: false,
      message: 'Fibonacci value too large (max 10000)',
    };
  }

  return { isValid: true };
};

const validateNumberArray = (value, operation) => {
  if (!Array.isArray(value)) {
    return {
      isValid: false,
      message: `${operation} value must be an array of numbers`,
    };
  }

  if (value.length === 0) {
    return {
      isValid: false,
      message: `${operation} array cannot be empty`,
    };
  }

  if (value.length > 1000) {
    return {
      isValid: false,
      message: `${operation} array too large (max 1000 elements)`,
    };
  }

  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    if (typeof item !== 'number' || !Number.isInteger(item)) {
      return {
        isValid: false,
        message: `${operation} array must contain only integers`,
      };
    }
  }

  return { isValid: true };
};

const validateAIQuestion = (value) => {
  if (typeof value !== 'string') {
    return {
      isValid: false,
      message: 'AI value must be a string',
    };
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return {
      isValid: false,
      message: 'AI question cannot be empty',
    };
  }

  if (trimmed.length > 500) {
    return {
      isValid: false,
      message: 'AI question too long (max 500 characters)',
    };
  }

  return { isValid: true };
};

const validateBFHLRequest = (body) => {
  if (!body || typeof body !== 'object') {
    return {
      isValid: false,
      message: 'Request body must be a valid JSON object',
    };
  }

  const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
  const providedKeys = Object.keys(body);

  const operationKeys = providedKeys.filter((key) => validKeys.includes(key));

  if (operationKeys.length === 0) {
    return {
      isValid: false,
      message: `Request must contain exactly one of: ${validKeys.join(', ')}`,
    };
  }

  if (operationKeys.length > 1) {
    return {
      isValid: false,
      message: 'Request must contain only one operation key',
    };
  }

  const operation = operationKeys[0];
  const value = body[operation];

  switch (operation) {
    case 'fibonacci':
      return { ...validateFibonacci(value), operation, value };

    case 'prime':
      return { ...validateNumberArray(value, 'prime'), operation, value };

    case 'lcm':
      return { ...validateNumberArray(value, 'lcm'), operation, value };

    case 'hcf':
      return { ...validateNumberArray(value, 'hcf'), operation, value };

    case 'AI':
      return { ...validateAIQuestion(value), operation, value };

    default:
      return {
        isValid: false,
        message: 'Invalid operation',
      };
  }
};

module.exports = {
  validateBFHLRequest,
  validateFibonacci,
  validateNumberArray,
  validateAIQuestion,
};
