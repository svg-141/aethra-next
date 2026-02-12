import { EnigmaMachine, enigmaConfigurations } from './enigmaService';

const ENCRYPTION_KEY = process.env.URL_ENCRYPTION_KEY || 'supersecretkey'; // Use a strong key from environment variables

// Initialize Enigma Machine with a fixed configuration for URLs
// In a real application, configuration would be managed more securely.
const enigmaMachine = new EnigmaMachine(
  enigmaConfigurations.rotors,
  enigmaConfigurations.reflectors[0],
  enigmaConfigurations.plugboard,
  enigmaConfigurations.alphabet
);

// Helper to encode/decode strings for btoa/atob to handle UTF-8
const utf8ToBase64 = (str: string): string => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
};

const base64ToUtf8 = (str: string): string => {
  return decodeURIComponent(atob(str).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};

export const encryptUrlPath = (path: string): string => {
  if (!path || path === '/') return path;

  const encodedPath = utf8ToBase64(path);
  const encryptedPath = enigmaMachine.encrypt(encodedPath, [0, 0, 0, 0, 0, 0]); // Use a consistent initial position
  return encryptedPath;
};

export const decryptUrlPath = (encryptedPath: string): string => {
  if (!encryptedPath || encryptedPath === '/') return encryptedPath;

  try {
    const decryptedPath = enigmaMachine.decrypt(encryptedPath, [0, 0, 0, 0, 0, 0]); // Use the same consistent initial position
    const decodedPath = base64ToUtf8(decryptedPath);
    return decodedPath;
  } catch (error) {
    console.error("Error decrypting URL path:", error);
    return encryptedPath; // Return original if decryption fails
  }
};
