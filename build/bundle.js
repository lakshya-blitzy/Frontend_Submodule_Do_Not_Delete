/**
 * Generates a random secure password based on specified criteria.
 * 
 * @param {number} length - The character length of the password.
 * @param {object} options - Configuration options for character pools.
 * @returns {string} The generated password.
 */
function generateRandomPassword(length = 12, options = {}) {
  // 1. Define default options and character pools
  const defaults = {
    includeUpper: true,
    includeLower: true,
    includeNumbers: true,
    includeSymbols: true
  };
  
  const config = { ...defaults, ...options };
  
  const pools = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  // 2. Build the master character pool based on configuration
  let characterPool = '';
  let guaranteedCharacters = [];

  if (config.includeUpper) {
    characterPool += pools.upper;
    // Ensure at least one uppercase letter is included
    guaranteedCharacters.push(pools.upper[Math.floor(Math.random() * pools.upper.length)]);
  }
  if (config.includeLower) {
    characterPool += pools.lower;
    // Ensure at least one lowercase letter is included
    guaranteedCharacters.push(pools.lower[Math.floor(Math.random() * pools.lower.length)]);
  }
  if (config.includeNumbers) {
    characterPool += pools.numbers;
    // Ensure at least one number is included
    guaranteedCharacters.push(pools.numbers[Math.floor(Math.random() * pools.numbers.length)]);
  }
  if (config.includeSymbols) {
    characterPool += pools.symbols;
    // Ensure at least one symbol is included
    guaranteedCharacters.push(pools.symbols[Math.floor(Math.random() * pools.symbols.length)]);
  }

  // Fallback if no criteria are selected
  if (characterPool.length === 0) {
    throw new Error('At least one character type must be selected.');
  }

  // 3. Fill the rest of the password length randomly
  let generatedPassword = [...guaranteedCharacters];
  const remainingLength = length - guaranteedCharacters.length;

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    generatedPassword.push(characterPool[randomIndex]);
  }

  // 4. Shuffle the final array to prevent predictable patterns
  return generatedPassword
    .sort(() => Math.random() - 0.5)
    .join('');
}

// --- Execution Examples ---

// Generate a standard 12-character password
const defaultPassword = generateRandomPassword();
console.log(`Default Secure Password: ${defaultPassword}`);

// Generate a long, numbers-only PIN
const customPassword = generateRandomPassword(8, {
  includeUpper: false,
  includeLower: false,
  includeSymbols: false
});
console.log(`8-Digit Numeric PIN: ${customPassword}`);
