# Enigma Encryption Module

This module will implement the Enigma machine-like encryption system.

## Features:
- 6 Rotors
- 4 Reflectors
- 10 Connectors
- Support for special characters, numbers, and uppercase letters.
- Character-by-character encryption with intermediate code generation.
- Inverse encryption for decryption.

## TODO:
1. Define Rotor, Reflector, and Plugboard (Connector) configurations.
2. Implement the core encryption/decryption logic.
3. Create methods for initializing the Enigma machine with a given configuration.
4. Add methods for encrypting and decrypting messages.
5. Develop methods for securely storing and retrieving encryption configurations.
6. Ensure the system handles errors gracefully. 

// --- Enigma Component Definitions ---

export type Alphabet = string; // e.g., "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !@#$%^&*()_+=-`~[]{}|;:'\",./<>?"

export interface Rotor {
  id: string;
  wiring: Alphabet;
  ringSetting: number; // Offset for the entry wheel
  notch: string;       // Character that triggers next rotor step
}

export interface Reflector {
  id: string;
  wiring: Alphabet;
}

export interface Plugboard {
  connections: Map<string, string>; // Map characters to their paired character
}

// --- Initial Configurations ---

const fullAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !@#$%^&*()_+=-`~[]{}|;:'\",./<>?";

const generateWiring = (alphabet: Alphabet): Alphabet => {
    const alphabetArray = alphabet.split('');
    for (let i = alphabetArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alphabetArray[i], alphabetArray[j]] = [alphabetArray[j], alphabetArray[i]];
    }
    return alphabetArray.join('');
};

// Rotors: Example wirings and notches
const rotors: Rotor[] = [
  { id: 'I', wiring: generateWiring(fullAlphabet), ringSetting: 0, notch: 'q' },
  { id: 'II', wiring: generateWiring(fullAlphabet), ringSetting: 0, notch: 'e' },
  { id: 'III', wiring: generateWiring(fullAlphabet), ringSetting: 0, notch: 'v' },
  { id: 'IV', wiring: generateWiring(fullAlphabet), ringSetting: 0, notch: 'j' },
  { id: 'V', wiring: generateWiring(fullAlphabet), ringSetting: 0, notch: 'z' },
  { id: 'VI', wiring: generateWiring(fullAlphabet), ringSetting: 0, notch: 'z' } 
];

// Reflectors: Example wirings
const reflectors: Reflector[] = [
  { id: 'A', wiring: generateWiring(fullAlphabet) },
  { id: 'B', wiring: generateWiring(fullAlphabet) },
  { id: 'C', wiring: generateWiring(fullAlphabet) },
  { id: 'D', wiring: generateWiring(fullAlphabet) }
];

// Plugboard (Connectors): Example connections (10 connectors, pairs of characters)
// Note: In a real scenario, this would be dynamically generated or configured.
// Here we create a map for demonstration.
const plugboardConnections = new Map<string, string>();
const connectorPairs = [
    ['A', 'X'], ['B', 'Y'], ['C', 'Z'], ['D', 'W'], ['E', 'V'],
    ['F', 'U'], ['G', 'T'], ['H', 'S'], ['I', 'R'], ['J', 'Q']
];

connectorPairs.forEach(([char1, char2]) => {
    plugboardConnections.set(char1, char2);
    plugboardConnections.set(char2, char1);
});

const plugboard: Plugboard = {
    connections: plugboardConnections
};

// Exporting configurations for use in the Enigma machine logic
export const enigmaConfigurations = {
    rotors,
    reflectors,
    plugboard,
    alphabet: fullAlphabet
};

export interface EnigmaConfig {
  rotorIDs: string[];
  reflectorID: string;
  plugboardConnections?: Map<string, string>;
  initialRotorPositions?: number[];
}

// --- Enigma Machine Class ---

class EnigmaMachine {
    private rotors: Rotor[];
    private reflector: Reflector;
    private plugboard: Plugboard;
    private alphabet: Alphabet;

    // Current positions of the rotors (0-indexed)
    private rotorPositions: number[] = [0, 0, 0, 0, 0, 0];
    private currentConfig: EnigmaConfig;

    constructor(rotorConfig: Rotor[], reflector: Reflector, plugboard: Plugboard, alphabet: Alphabet) {
        this.rotors = [...rotorConfig]; // Use provided rotors
        this.reflector = reflector;
        this.plugboard = plugboard;
        this.alphabet = alphabet;
        // Initialize rotor positions (e.g., to 0 or based on a key)
        this.rotorPositions = Array(this.rotors.length).fill(0);
        this.currentConfig = {
            rotorIDs: rotorConfig.map(r => r.id),
            reflectorID: reflector.id,
            plugboardConnections: plugboard.connections,
            initialRotorPositions: [...this.rotorPositions]
        };
    }

    // Helper to get the index of a character in the alphabet
    private getCharIndex(char: string): number {
        const index = this.alphabet.indexOf(char);
        if (index === -1) {
            // Handle characters not in the alphabet, perhaps by returning them unchanged or throwing an error
            console.warn(`Character '${char}' not found in alphabet.`);
            return -1; // Indicate invalid character
        }
        return index;
    }

    // Helper to get the character at a given index in the alphabet
    private getCharFromIndex(index: number): string {
        // Ensure index wraps around the alphabet length
        const wrappedIndex = (index % this.alphabet.length + this.alphabet.length) % this.alphabet.length;
        return this.alphabet[wrappedIndex];
    }

    // Simulate a single key press (encipher character)
    encipherChar(char: string): string {
        if (!this.alphabet.includes(char)) {
            return char; // Return non-alphabetic characters unchanged
        }

        // 1. Step the rotors (before enciphering)
        this.stepRotors();

        let charIndex = this.getCharIndex(char);
        if (charIndex === -1) return char; // Handle characters not in alphabet

        // 2. Pass through plugboard (forward)
        const charFromPlugboard = this.plugboard.connections.get(this.getCharFromIndex(charIndex)) || this.getCharFromIndex(charIndex);
        charIndex = this.getCharIndex(charFromPlugboard);

        // 3. Pass through rotors (forward)
        for (let i = this.rotors.length - 1; i >= 0; i--) {
            const rotor = this.rotors[i];
            const effectiveIndex = (charIndex + this.rotorPositions[i] + rotor.ringSetting) % this.alphabet.length;
            const substitutedChar = rotor.wiring[effectiveIndex];
            charIndex = this.getCharIndex(substitutedChar) - this.rotorPositions[i];
        }

        // 4. Pass through reflector
        const charFromReflector = this.reflector.wiring[charIndex];
        charIndex = this.getCharIndex(charFromReflector);

        // 5. Pass through rotors (backward)
        for (let i = 0; i < this.rotors.length; i++) {
            const rotor = this.rotors[i];
            let currentAlphabetIndex = this.getCharIndex(this.getCharFromIndex(charIndex + this.rotorPositions[i]));
            
            // Find the input character for this rotor's output
            let substitutedCharBackward = '';
            let found = false;
            for (let j = 0; j < rotor.wiring.length; j++) {
                if (rotor.wiring[j] === this.getCharFromIndex(currentAlphabetIndex)) {
                    substitutedCharBackward = this.getCharFromIndex(j);
                    found = true;
                    break;
                }
            }

            if (!found) {
                console.error(`Enigma logic error: Cannot find inverse mapping for rotor ${rotor.id}`);
                return char; // Error case
            }
            charIndex = this.getCharIndex(substitutedCharBackward) - this.rotorPositions[i];
        }

        // 6. Pass through plugboard (backward)
        const finalChar = this.plugboard.connections.get(this.getCharFromIndex(charIndex)) || this.getCharFromIndex(charIndex);

        return finalChar;
    }

    // Method to step the rotors
    private stepRotors(): void {
        const turnoverNotches = this.rotors.map(r => r.notch);
        const rotorCount = this.rotors.length;

        // Middle rotor double-stepping anomaly
        for (let i = 1; i < rotorCount - 1; i++) {
            if (this.alphabet[this.rotorPositions[i]] === turnoverNotches[i] && this.alphabet[this.rotorPositions[i-1]] === turnoverNotches[i-1]) {
                this.rotorPositions[i] = (this.rotorPositions[i] + 1) % this.alphabet.length;
                this.rotorPositions[i-1] = (this.rotorPositions[i-1] + 1) % this.alphabet.length;
            }
        }

        // Normal stepping
        this.rotorPositions[rotorCount - 1] = (this.rotorPositions[rotorCount - 1] + 1) % this.alphabet.length;
        for (let i = rotorCount - 1; i > 0; i--) {
            if (this.alphabet[this.rotorPositions[i]] === turnoverNotches[i] && i > 0) {
                 this.rotorPositions[i - 1] = (this.rotorPositions[i - 1] + 1) % this.alphabet.length;
            } else {
                break;
            }
        }
    }

    // Encipher a full string
    encipherString(text: string): string {
        let result = '';
        for (const char of text) {
            result += this.encipherChar(char);
        }
        return result;
    }

    private currentConfig: EnigmaConfig;

    // Method to encrypt a message
    encrypt(message: string, initialRotorPositions?: number[]): string {
        try {
            // Use provided initial positions or reset to default if none are given
            const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length
                ? initialRotorPositions
                : [...this.currentConfig.initialRotorPositions!]; // Use default from config
            
            this.setInitialRotorPositions(positionsToUse);
            return this.encipherString(message);
        } catch (error) {
            console.error('Error encrypting message:', error);
            return message; // Return original message or throw error as appropriate
        }
    }

    // Method to decrypt a message
    // Decryption in Enigma is identical to encryption with the same settings
    decrypt(encryptedMessage: string, initialRotorPositions?: number[]): string {
        try {
            // Use provided initial positions or reset to default if none are given
            const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length
                ? initialRotorPositions
                : [...this.currentConfig.initialRotorPositions!]; // Use default from config
            
            this.setInitialRotorPositions(positionsToUse);
            return this.encipherString(encryptedMessage);
        } catch (error) {
            console.error('Error decrypting message:', error);
            return encryptedMessage; // Return original encrypted message or throw error
        }
    }

    

        // Method to encrypt a message

        encrypt(message: string, initialRotorPositions?: number[]): string {

            try {

                // Use provided initial positions or reset to default if none are given

                const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length

                    ? initialRotorPositions

                    : [...this.currentConfig.initialRotorPositions!]; // Use default from config

                

                this.setInitialRotorPositions(positionsToUse);

                return this.encipherString(message);

            } catch (error) {

                console.error('Error encrypting message:', error);

                return message; // Return original message or throw error as appropriate

            }

        }

    

        // Method to decrypt a message

        // Decryption in Enigma is identical to encryption with the same settings

        decrypt(encryptedMessage: string, initialRotorPositions?: number[]): string {

            try {

                // Use provided initial positions or reset to default if none are given

                const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length

                    ? initialRotorPositions

                    : [...this.currentConfig.initialRotorPositions!]; // Use default from config

                

                this.setInitialRotorPositions(positionsToUse);

                return this.encipherString(encryptedMessage);

            } catch (error) {

                console.error('Error decrypting message:', error);

                return encryptedMessage; // Return original encrypted message or throw error

            }

        }

    

        // Method to set initial rotor positions (e.g., from a key)

        setInitialRotorPositions(positions: number[]): void {

            if (positions.length === this.rotorPositions.length) {

                this.rotorPositions = positions.map(pos => pos % this.alphabet.length);

            } else {

                console.error(`Invalid number of initial rotor positions provided. Expected ${this.rotorPositions.length}, got ${positions.length}.`);

            }

        }

    

        // --- Configuration Management ---

    

        // Get the current Enigma configuration

        getConfiguration(): EnigmaConfig {

            // Return a copy to prevent external modification

            return {

                ...this.currentConfig,

                plugboardConnections: new Map(this.currentConfig.plugboardConnections)

            };

        }

    

        // Set a new Enigma configuration (e.g., for decryption)

        // This resets the machine state including rotor positions

        setConfiguration(newConfig: EnigmaConfig): void {

            try {

                const selectedRotors = enigmaConfigurations.rotors.filter(r => newConfig.rotorIDs.includes(r.id));

                const selectedReflector = enigmaConfigurations.reflectors.find(r => r.id === newConfig.reflectorID);

                const currentPlugboard = newConfig.plugboardConnections ? { connections: newConfig.plugboardConnections } : enigmaConfigurations.plugboard;

    

                if (selectedRotors.length !== newConfig.rotorIDs.length || !selectedReflector) {

                    throw new Error("Invalid rotor or reflector ID provided in configuration.");

                }

                

                this.rotors = selectedRotors;

                this.reflector = selectedReflector;

                this.plugboard = currentPlugboard;

                this.alphabet = enigmaConfigurations.alphabet; // Assuming alphabet is constant

    

                this.setInitialRotorPositions(newConfig.initialRotorPositions || Array(this.rotors.length).fill(0));

                

                // Update the stored configuration

                this.currentConfig = {

                    rotorIDs: selectedRotors.map(r => r.id),

                    reflectorID: selectedReflector.id,

                    plugboardConnections: currentPlugboard.connections,

                    initialRotorPositions: [...this.rotorPositions]

                };

            } catch (error) {

                console.error('Error setting Enigma configuration:', error);

                throw new Error('Failed to set Enigma configuration.');

            }

        }

    

        

    

            // Method to encrypt a message

    

            encrypt(message: string, initialRotorPositions?: number[]): string {

    

                try {

    

                    // Use provided initial positions or reset to default if none are given

    

                    const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length

    

                        ? initialRotorPositions

    

                        : [...this.currentConfig.initialRotorPositions!]; // Use default from config

    

                    

    

                    this.setInitialRotorPositions(positionsToUse);

    

                    return this.encipherString(message);

    

                } catch (error) {

    

                    console.error('Error encrypting message:', error);

    

                    return message; // Return original message or throw error as appropriate

    

                }

    

            }

    

        

    

            // Method to decrypt a message

    

            // Decryption in Enigma is identical to encryption with the same settings

    

            decrypt(encryptedMessage: string, initialRotorPositions?: number[]): string {

    

                try {

    

                    // Use provided initial positions or reset to default if none are given

    

                    const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length

    

                        ? initialRotorPositions

    

                        : [...this.currentConfig.initialRotorPositions!]; // Use default from config

    

                    

    

                    this.setInitialRotorPositions(positionsToUse);

    

                    return this.encipherString(encryptedMessage);

    

                } catch (error) {

    

                    console.error('Error decrypting message:', error);

    

                    return encryptedMessage; // Return original encrypted message or throw error

    

                }

    

            }

    

        

    

            // Method to set initial rotor positions (e.g., from a key)

    

            setInitialRotorPositions(positions: number[]): void {

    

                if (positions.length === this.rotorPositions.length) {

    

                    this.rotorPositions = positions.map(pos => pos % this.alphabet.length);

    

                } else {

    

                    console.error(`Invalid number of initial rotor positions provided. Expected ${this.rotorPositions.length}, got ${positions.length}.`);

    

                }

    

            }

    

        

    

            // --- Configuration Management ---

    

        

    

            // Get the current Enigma configuration

    

            getConfiguration(): EnigmaConfig {

    

                // Return a copy to prevent external modification

    

                return {

    

                    ...this.currentConfig,

    

                    plugboardConnections: new Map(this.currentConfig.plugboardConnections)

    

                };

    

            }

    

        

    

            // Set a new Enigma configuration (e.g., for decryption)

    

            // This resets the machine state including rotor positions

    

            setConfiguration(newConfig: EnigmaConfig): void {

    

                try {

    

                    const selectedRotors = enigmaConfigurations.rotors.filter(r => newConfig.rotorIDs.includes(r.id));

    

                    const selectedReflector = enigmaConfigurations.reflectors.find(r => r.id === newConfig.reflectorID);

    

                    const currentPlugboard = newConfig.plugboardConnections ? { connections: newConfig.plugboardConnections } : enigmaConfigurations.plugboard;

    

        

    

                    if (selectedRotors.length !== newConfig.rotorIDs.length || !selectedReflector) {

    

                        throw new Error("Invalid rotor or reflector ID provided in configuration.");

    

                    }

    

                    

    

                    this.rotors = selectedRotors;

    

                    this.reflector = selectedReflector;

    

                    this.plugboard = currentPlugboard;

    

                    this.alphabet = enigmaConfigurations.alphabet; // Assuming alphabet is constant

    

        

    

                    this.setInitialRotorPositions(newConfig.initialRotorPositions || Array(this.rotors.length).fill(0));

    

                    

    

                    // Update the stored configuration

    

                    this.currentConfig = {

    

                        rotorIDs: selectedRotors.map(r => r.id),

    

                        reflectorID: selectedReflector.id,

    

                        plugboardConnections: currentPlugboard.connections,

    

                        initialRotorPositions: [...this.rotorPositions]

    

                    };

    

                } catch (error) {

    

                    console.error('Error setting Enigma configuration:', error);

    

                    throw new Error('Failed to set Enigma configuration.');

    

                }

    

            }

    

        

    

            

    

        

    

            

    

        

    

            // --- Secure Storage/Retrieval (Placeholder) ---

    

        

    

            

    

        

    

            // Basic simulation of encryption for configuration data (In a real app, use a robust crypto library)

    

        

    

            const encryptConfigData = (data: string, key: string): string => {

    

        

    

                let encrypted = '';

    

        

    

                for (let i = 0; i < data.length; i++) {

    

        

    

                    // Simple XOR encryption for demonstration

    

        

    

                    encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));

    

        

    

                }

    

        

    

                return btoa(encrypted); // Base64 encode the result

    

        

    

            };

    

        

    

            

    

        

    

            // Basic simulation of decryption for configuration data

    

        

    

            const decryptConfigData = (encryptedData: string, key: string): string => {

    

        

    

                try {

    

        

    

                    let decrypted = '';

    

        

    

                    const data = atob(encryptedData);

    

        

    

                    for (let i = 0; i < data.length; i++) {

    

        

    

                        decrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));

    

        

    

                    }

    

        

    

                    return decrypted;

    

        

    

                } catch (error) {

    

        

    

                    console.error('Failed to decrypt configuration data:', error);

    

        

    

                    return ''; // Return empty string or handle error appropriately

    

        

    

                }

    

        

    

            };

    

        

    

            

    

        

    

            // Function to encrypt an EnigmaConfig object

    

        

    

            const secureEnigmaConfig = (config: EnigmaConfig, key: string): string => {

    

        

    

                // JSON.stringify can have issues with Map, so convert it first

    

        

    

                const configToSave = {

    

        

    

                    ...config,

    

        

    

                    plugboardConnections: config.plugboardConnections ? Object.fromEntries(config.plugboardConnections) : undefined

    

        

    

                };

    

        

    

                const configString = JSON.stringify(configToSave);

    

        

    

                return encryptConfigData(configString, key);

    

        

    

            };

    

        

    

            

    

        

    

            // Function to decrypt an EnigmaConfig object

    

        

    

            const decryptEnigmaConfig = async (encryptedConfig: string, key: string): Promise<EnigmaConfig | null> => {

    

        

    

                try {

    

        

    

                    const decryptedConfigString = decryptConfigData(encryptedConfig, key);

    

        

    

            

    

        

    

                    if (!decryptedConfigString) {

    

        

    

                        throw new Error('Decryption failed.');

    

        

    

                    }

    

        

    

            

    

        

    

                    const decryptedConfig = JSON.parse(decryptedConfigString);

    

        

    

            

    

        

    

                    // Ensure the decrypted object conforms to EnigmaConfig (basic check)

    

        

    

                    if (decryptedConfig && decryptedConfig.rotorIDs && decryptedConfig.reflectorID) {

    

        

    

                         // Convert Map from JSON string back to Map object if necessary

    

        

    

                         const plugboardMap = decryptedConfig.plugboardConnections ? new Map(Object.entries(decryptedConfig.plugboardConnections)) : undefined;

    

        

    

                         return { ...decryptedConfig, plugboardConnections: plugboardMap };

    

        

    

                    } else {

    

        

    

                        throw new Error('Decrypted configuration is invalid.');

    

        

    

                    }

    

        

    

                } catch (error) {

    

        

    

                    console.error('Error decrypting Enigma configuration:', error);

    

        

    

                    return null; // Return null if decryption or parsing fails

    

        

    

                }

    

        

    

            };

    

        

    

            

    

        

    

            

    

        

    

            // --- Enigma Machine Class ---

    

        

    

            

    

        

    

            class EnigmaMachine {

    

        

    

                private rotors: Rotor[];

    

        

    

                private reflector: Reflector;

    

        

    

                private plugboard: Plugboard;

    

        

    

                private alphabet: Alphabet;

    

        

    

            

    

        

    

                // Current positions of the rotors (0-indexed)

    

        

    

                private rotorPositions: number[] = [0, 0, 0, 0, 0, 0];

    

        

    

            

    

        

    

                // Stores the current configuration for this machine instance

    

        

    

                private currentConfig: EnigmaConfig;

    

        

    

            

    

        

    

                constructor(rotorConfig: Rotor[], reflector: Reflector, plugboard: Plugboard, alphabet: Alphabet) {

    

        

    

                    this.rotors = [...rotorConfig]; // Use provided rotors

    

        

    

                    this.reflector = reflector;

    

        

    

                    this.plugboard = plugboard;

    

        

    

                    this.alphabet = alphabet;

    

        

    

                    // Initialize rotor positions (e.g., to 0 or based on a key)

    

        

    

                    this.rotorPositions = Array(this.rotors.length).fill(0);

    

        

    

                    

    

        

    

                    // Set initial configuration based on constructor arguments

    

        

    

                    this.currentConfig = {

    

        

    

                        rotorIDs: rotorConfig.map(r => r.id),

    

        

    

                        reflectorID: reflector.id,

    

        

    

                        plugboardConnections: plugboard.connections,

    

        

    

                        initialRotorPositions: [...this.rotorPositions]

    

        

    

                    };

    

        

    

                }

    

        

    

            

    

        

    

                // Helper to get the index of a character in the alphabet

    

        

    

                private getCharIndex(char: string): number {

    

        

    

                    const upperChar = char.toUpperCase();

    

        

    

                    const index = this.alphabet.indexOf(upperChar);

    

        

    

                    if (index === -1) {

    

        

    

                        // Handle characters not in the alphabet, perhaps by returning them unchanged or throwing an error

    

        

    

                        console.warn(`Character '${char}' not found in alphabet.`);

    

        

    

                        return -1; // Indicate invalid character

    

        

    

                    }

    

        

    

                    return index;

    

        

    

                }

    

        

    

            

    

        

    

                // Helper to get the character at a given index in the alphabet

    

        

    

                private getCharFromIndex(index: number): string {

    

        

    

                    // Ensure index wraps around the alphabet length

    

        

    

                    const wrappedIndex = (index % this.alphabet.length + this.alphabet.length) % this.alphabet.length;

    

        

    

                    return this.alphabet[wrappedIndex];

    

        

    

                }

    

        

    

            

    

        

    

                // Simulate a single key press (encipher character)

    

        

    

                encipherChar(char: string): string {

    

        

    

                    if (!this.alphabet.includes(char.toUpperCase())) {

    

        

    

                        return char; // Return non-alphabetic characters unchanged

    

        

    

                    }

    

        

    

            

    

        

    

                    // 1. Step the rotors (before enciphering)

    

        

    

                    this.stepRotors();

    

        

    

            

    

        

    

                    let charIndex = this.getCharIndex(char);

    

        

    

                    if (charIndex === -1) return char; // Handle characters not in alphabet

    

        

    

            

    

        

    

                    // 2. Pass through plugboard (forward)

    

        

    

                    const charFromPlugboard = this.plugboard.connections.get(this.getCharFromIndex(charIndex)) || this.getCharFromIndex(charIndex);

    

        

    

                    charIndex = this.getCharIndex(charFromPlugboard);

    

        

    

            

    

        

    

                    // 3. Pass through rotors (forward)

    

        

    

                    for (let i = this.rotors.length - 1; i >= 0; i--) {

    

        

    

                        const rotor = this.rotors[i];

    

        

    

                        const effectiveIndex = (charIndex + this.rotorPositions[i] + rotor.ringSetting) % this.alphabet.length;

    

        

    

                        const substitutedChar = rotor.wiring[effectiveIndex];

    

        

    

                        charIndex = this.getCharIndex(substitutedChar) - this.rotorPositions[i];

    

        

    

                    }

    

        

    

            

    

        

    

                    // 4. Pass through reflector

    

        

    

                    const charFromReflector = this.reflector.wiring[charIndex];

    

        

    

                    charIndex = this.getCharIndex(charFromReflector);

    

        

    

            

    

        

    

                    // 5. Pass through rotors (backward)

    

        

    

                    for (let i = 0; i < this.rotors.length; i++) {

    

        

    

                        const rotor = this.rotors[i];

    

        

    

                        let currentAlphabetIndex = this.getCharIndex(this.getCharFromIndex(charIndex + this.rotorPositions[i]));

    

        

    

                        

    

        

    

                        // Find the input character for this rotor's output

    

        

    

                        let substitutedCharBackward = '';

    

        

    

                        let found = false;

    

        

    

                        for (let j = 0; j < rotor.wiring.length; j++) {

    

        

    

                            if (rotor.wiring[j] === this.getCharFromIndex(currentAlphabetIndex)) {

    

        

    

                                substitutedCharBackward = this.getCharFromIndex(j);

    

        

    

                                found = true;

    

        

    

                                break;

    

        

    

                            }

    

        

    

                        }

    

        

    

            

    

        

    

                        if (!found) {

    

        

    

                            console.error(`Enigma logic error: Cannot find inverse mapping for rotor ${rotor.id}`);

    

        

    

                            return char; // Error case

    

        

    

                        }

    

        

    

                        charIndex = this.getCharIndex(substitutedCharBackward) - this.rotorPositions[i];

    

        

    

                    }

    

        

    

            

    

        

    

                    // 6. Pass through plugboard (backward)

    

        

    

                    const finalChar = this.plugboard.connections.get(this.getCharFromIndex(charIndex)) || this.getCharFromIndex(charIndex);

    

        

    

            

    

        

    

                    return finalChar;

    

        

    

                }

    

        

    

            

    

        

    

                // Encipher a full string

    

        

    

                encipherString(text: string): string {

    

        

    

                    let result = '';

    

        

    

                    for (const char of text) {

    

        

    

                        result += this.encipherChar(char);

    

        

    

                    }

    

        

    

                    return result;

    

        

    

                }

    

        

    

            

    

        

    

                // Method to encrypt a message

    

        

    

                encrypt(message: string, initialRotorPositions?: number[]): string {

    

        

    

                    try {

    

        

    

                        // Use provided initial positions or reset to default if none are given

    

        

    

                        const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length

    

        

    

                            ? initialRotorPositions

    

        

    

                            : [...this.currentConfig.initialRotorPositions!]; // Use default from config

    

        

    

                        

    

        

    

                        this.setInitialRotorPositions(positionsToUse);

    

        

    

                        return this.encipherString(message);

    

        

    

                    } catch (error) {

    

        

    

                        console.error('Error encrypting message:', error);

    

        

    

                        return message; // Return original message or throw error as appropriate

    

        

    

                    }

    

        

    

                }

    

        

    

            

    

        

    

                // Method to decrypt a message

    

        

    

                // Decryption in Enigma is identical to encryption with the same settings

    

        

    

                decrypt(encryptedMessage: string, initialRotorPositions?: number[]): string {

    

        

    

                    try {

    

        

    

                        // Use provided initial positions or reset to default if none are given

    

        

    

                        const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length

    

        

    

                            ? initialRotorPositions

    

        

    

                            : [...this.currentConfig.initialRotorPositions!]; // Use default from config

    

        

    

                        

    

        

    

                        this.setInitialRotorPositions(positionsToUse);

    

        

    

                        return this.encipherString(encryptedMessage);

    

        

    

                    } catch (error) {

    

        

    

                        console.error('Error decrypting message:', error);

    

        

    

                        return encryptedMessage; // Return original encrypted message or throw error

    

        

    

                    }

    

        

    

                }

    

        

    

            

    

        

    

                // Method to set initial rotor positions (e.g., from a key)

    

        

    

                setInitialRotorPositions(positions: number[]): void {

    

        

    

                    if (positions.length === this.rotorPositions.length) {

    

        

    

                        this.rotorPositions = positions.map(pos => pos % this.alphabet.length);

    

        

    

                    } else {

    

        

    

                        console.error(`Invalid number of initial rotor positions provided. Expected ${this.rotorPositions.length}, got ${positions.length}.`);

    

        

    

                    }

    

        

    

                }

    

        

    

            

    

        

    

                // --- Configuration Management ---

    

        

    

            

    

        

    

                // Get the current Enigma configuration

    

        

    

                getConfiguration(): EnigmaConfig {

    

        

    

                    // Return a copy to prevent external modification

    

        

    

                    return {

    

        

    

                        ...this.currentConfig,

    

        

    

                        plugboardConnections: new Map(this.currentConfig.plugboardConnections)

    

        

    

                    };

    

        

    

                }

    

        

    

            

    

        

    

                // Set a new Enigma configuration (e.g., for decryption)

    

        

    

                // This resets the machine state including rotor positions

    

        

    

                setConfiguration(newConfig: EnigmaConfig): void {

    

        

    

                    try {

    

        

    

                        const selectedRotors = enigmaConfigurations.rotors.filter(r => newConfig.rotorIDs.includes(r.id));

    

        

    

                        const selectedReflector = enigmaConfigurations.reflectors.find(r => r.id === newConfig.reflectorID);

    

        

    

                        const currentPlugboard = newConfig.plugboardConnections ? { connections: newConfig.plugboardConnections } : enigmaConfigurations.plugboard;

    

        

    

            

    

        

    

                        if (selectedRotors.length !== newConfig.rotorIDs.length || !selectedReflector) {

    

        

    

                            throw new Error("Invalid rotor or reflector ID provided in configuration.");

    

        

    

                        }

    

        

    

                        

    

        

    

                        this.rotors = selectedRotors;

    

        

    

                        this.reflector = selectedReflector;

    

        

    

                        this.plugboard = currentPlugboard;

    

        

    

                        this.alphabet = enigmaConfigurations.alphabet; // Assuming alphabet is constant

    

        

    

            

    

        

    

                        this.setInitialRotorPositions(newConfig.initialRotorPositions || Array(this.rotors.length).fill(0));

    

        

    

                        

    

        

    

                        // Update the stored configuration

    

        

    

                        this.currentConfig = {

    

        

    

                            rotorIDs: selectedRotors.map(r => r.id),

    

        

    

                            reflectorID: selectedReflector.id,

    

        

    

                            plugboardConnections: currentPlugboard.connections,

    

        

    

                            initialRotorPositions: [...this.rotorPositions]

    

        

    

                        };

    

        

    

                    } catch (error) {

    

        

    

                        console.error('Error setting Enigma configuration:', error);

    

        

    

                        throw new Error('Failed to set Enigma configuration.');

    

        

    

                    }

    

        

    

                }

    

        

    

            

    

        

    

                // --- Secure Storage/Retrieval (Placeholder) ---

    

        

    

            

    

        

    

                // Simulate saving Enigma configuration to user preferences

    

        

    

                async saveUserEnigmaConfig(config: EnigmaConfig): Promise<void> {

    

        

    

                    // In a real app, this would involve calling an API to update user preferences

    

        

    

                    // For demonstration, we'll just log it and assume success.

    

        

    

                    const encryptionKey = 'aethra-super-secret-key'; // This key should be managed securely!

    

        

    

            

    

        

    

                    try {

    

        

    

                        // JSON.stringify can have issues with Map, so convert it first

    

        

    

                        const configToSave = {

    

        

    

                            ...config,

    

        

    

                            plugboardConnections: config.plugboardConnections ? Object.fromEntries(config.plugboardConnections) : undefined

    

        

    

                        };

    

        

    

                        const configString = JSON.stringify(configToSave);

    

        

    

                        const encryptedConfig = encryptConfigData(configString, encryptionKey);

    

        

    

                        

    

        

    

                        console.log('Simulating saving encrypted Enigma configuration:', encryptedConfig);

    

        

    

                        // Example: authService.updateProfile({ preferences: { ...currentUser.preferences, enigmaConfigEncrypted: encryptedConfig } });

    

        

    

                        

    

        

    

                        // For demonstration, we'll update the machine's internal config state directly after encrypting

    

        

    

                        this.setConfiguration(config);

    

        

    

                        console.log('Enigma machine configuration updated internally.');

    

        

    

                    } catch (error) {

    

        

    

                        console.error('Error saving Enigma configuration:', error);

    

        

    

                        throw new Error('Failed to save Enigma configuration.');

    

        

    

                    }

    

        

    

                }

    

        

    

            

    

        

    

                // Simulate retrieving Enigma configuration from user preferences

    

        

    

                async getUserEnigmaConfig(): Promise<EnigmaConfig | null> {

    

        

    

                    // In a real app, this would involve fetching user data from an API

    

        

    

                    // For demonstration, we'll simulate retrieving and decrypting a config.

    

        

    

                    console.log('Simulating retrieving Enigma configuration...');

    

        

    

                    // Example: const currentUser = await authService.getCurrentUser();

    

        

    

                    // const encryptedConfig = currentUser?.preferences?.enigmaConfigEncrypted;

    

        

    

                    

    

        

    

                    // For demonstration, we'll use the machine's current internal config as a simulated retrieved value

    

        

    

                    const retrievedConfigData = this.getConfiguration(); // Simulate retrieval

    

        

    

            

    

        

    

                    if (!retrievedConfigData) {

    

        

    

                        console.warn('No Enigma configuration found.');

    

        

    

                        return null;

    

        

    

                    }

    

        

    

            

    

        

    

                    try {

    

        

    

                        const encryptionKey = 'aethra-super-secret-key'; // This key should be managed securely!

    

        

    

                        const configString = JSON.stringify(retrievedConfigData);

    

        

    

                        const encryptedConfig = encryptConfigData(configString, encryptionKey); // Simulate re-encryption for retrieval logic

    

        

    

                        const decryptedConfigString = decryptConfigData(encryptedConfig, encryptionKey);

    

        

    

            

    

        

    

                        if (!decryptedConfigString) {

    

        

    

                            throw new Error('Decryption failed.');

    

        

    

                        }

    

        

    

            

    

        

    

                        const decryptedConfig = JSON.parse(decryptedConfigString);

    

        

    

            

    

        

    

                        // Ensure the decrypted object conforms to EnigmaConfig (basic check)

    

        

    

                        if (decryptedConfig && decryptedConfig.rotorIDs && decryptedConfig.reflectorID) {

    

        

    

                             // Convert Map from JSON string back to Map object if necessary

    

        

    

                             const plugboardMap = decryptedConfig.plugboardConnections ? new Map(Object.entries(decryptedConfig.plugboardConnections)) : undefined;

    

        

    

                             return { ...decryptedConfig, plugboardConnections: plugboardMap };

    

        

    

                        } else {

    

        

    

                            throw new Error('Decrypted configuration is invalid.');

    

        

    

                        }

    

        

    

                    } catch (error) {

    

        

    

                        console.error('Error retrieving or decrypting Enigma configuration:', error);

    

        

    

                        return null; // Return null if decryption or parsing fails

    

        

    

                    }

    

        

    

                }

    

        

    

            }

    

        

    

            

    

        

    

            // Function to create and return an Enigma machine instance with specific settings

    

        

    

            export const createEnigmaMachine = (

    

        

    

                rotorIDs: string[],

    

        

    

                reflectorID: string,

    

        

    

                plugboardConnections?: Map<string, string>,

    

        

    

                initialRotorPositions?: number[]

    

        

    

            ): EnigmaMachine => {

    

        

    

                const selectedRotors = enigmaConfigurations.rotors.filter(r => rotorIDs.includes(r.id));

    

        

    

                const selectedReflector = enigmaConfigurations.reflectors.find(r => r.id === reflectorID);

    

        

    

                const currentPlugboard = plugboardConnections ? { connections: plugboardConnections } : enigmaConfigurations.plugboard;

    

        

    

            

    

        

    

                if (selectedRotors.length !== rotorIDs.length || !selectedReflector) {

    

        

    

                    throw new Error("Invalid rotor or reflector ID provided.");

    

        

    

                }

    

        

    

            

    

        

    

                const machine = new EnigmaMachine(selectedRotors, selectedReflector, currentPlugboard, enigmaConfigurations.alphabet);

    

        

    

                

    

        

    

                if (initialRotorPositions && initialRotorPositions.length === machine.rotorPositions.length) {

    

        

    

                    machine.setInitialRotorPositions(initialRotorPositions);

    

        

    

                }

    

        

    

            

    

        

    

                return machine;

    

        

    

            }

    

        

    

            

    

        

    