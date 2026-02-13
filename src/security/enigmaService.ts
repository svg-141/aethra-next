/**
 * Enigma Encryption Module - ADMIN PANEL EXCLUSIVE
 * 
 * This module implements an Enigma machine-like encryption system.
 * It is reserved for protecting sensitive data within the Admin Panel
 * and should NOT be used for public URL routing.
 */

// --- Enigma Component Definitions ---

export type Alphabet = string; // e.g., "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !@#$%^&*()_+=-`~[]{}|;:'",./<>?"

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

// FIXED STATIC WIRINGS (No Math.random()) to ensure consistency between Client and Server
const ROTOR_I_WIRING =   "EKMFLGDQVZNTOWYHXUSPAIBRCJekmflgdqvzntowyhxuspaibrcj9012345678!@#$%^&*()_+=-`~[]{}|;:'\",./<>?";
const ROTOR_II_WIRING =  "AJDKSIRUXBLHWTMCQGZNPYFVOEajdksiruxblhwtmcqgznpyfvoe1234567890@#$%^&*()_+=-`~[]{}|;:'\",./<>?!";
const ROTOR_III_WIRING = "BDFHJLCPRTXVZNYEIWGAKMUSQObdfhjlcprtxvznyeiwgakmusqo2345678901#$%^&*()_+=-`~[]{}|;:'\",./<>?!@";
const ROTOR_IV_WIRING =  "ESOVPZJAYQUIRHXLNFTGKDCMWBesovpzjayquirhxlnftgkdcmwb3456789012$%^&*()_+=-`~[]{}|;:'\",./<>?!@#";
const ROTOR_V_WIRING =   "VZBRGITYUPSDNHLXAWMJQOFECKvzbrgityupsdnhlxawmjqofeck4567890123%^&*()_+=-`~[]{}|;:'\",./<>?!@#$";
const ROTOR_VI_WIRING =  "JPGVOUMFYQBENHZRDKASXLICTWjpgvoumfyqbenhzrdkasxlictw5678901234^&*()_+=-`~[]{}|;:'\",./<>?!@#$%";

// Reflectors: Static wirings - MUST BE RECIPROCAL (A->B implies B->A) for encrypt() == decrypt()
// Since fullAlphabet length is 95 (odd), the middle character maps to itself.
// A simple reciprocal wiring is the reversed alphabet.
const REVERSED_ALPHABET = "?><,./\"':;|}{][~`-=+_)(*&^%$#@! 9876543210zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA";

const REFLECTOR_A_WIRING = REVERSED_ALPHABET;
const REFLECTOR_B_WIRING = REVERSED_ALPHABET; // Using same valid wiring for stability
const REFLECTOR_C_WIRING = REVERSED_ALPHABET;
const REFLECTOR_D_WIRING = REVERSED_ALPHABET;

// Rotors: Static wirings
const rotors: Rotor[] = [
  { id: 'I', wiring: ROTOR_I_WIRING, ringSetting: 0, notch: 'q' },
  { id: 'II', wiring: ROTOR_II_WIRING, ringSetting: 0, notch: 'e' },
  { id: 'III', wiring: ROTOR_III_WIRING, ringSetting: 0, notch: 'v' },
  { id: 'IV', wiring: ROTOR_IV_WIRING, ringSetting: 0, notch: 'j' },
  { id: 'V', wiring: ROTOR_V_WIRING, ringSetting: 0, notch: 'z' },
  { id: 'VI', wiring: ROTOR_VI_WIRING, ringSetting: 0, notch: 'z' } 
];

// Reflectors: Static wirings
const reflectors: Reflector[] = [
  { id: 'A', wiring: REFLECTOR_A_WIRING },
  { id: 'B', wiring: REFLECTOR_B_WIRING },
  { id: 'C', wiring: REFLECTOR_C_WIRING },
  { id: 'D', wiring: REFLECTOR_D_WIRING }
];
// Plugboard (Connectors): Example connections (10 connectors, pairs of characters)
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

export class EnigmaMachine {
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
            // For robustness, try case-insensitive or just return -1
            return -1;
        }
        return index;
    }

    // Helper to get the character at a given index in the alphabet
    private getCharFromIndex(index: number): string {
        // Ensure index wraps around the alphabet length
        const wrappedIndex = (index % this.alphabet.length + this.alphabet.length) % this.alphabet.length;
        return this.alphabet[wrappedIndex];
    }

    // Method to step the rotors
    private stepRotors(): void {
        const turnoverNotches = this.rotors.map(r => r.notch);
        const rotorCount = this.rotors.length;

        // Middle rotor double-stepping anomaly logic (simplified for N rotors)
        // Standard Enigma usually has 3 or 4 rotors. For 6, we apply similar logic.
        // We'll iterate from the second to last rotor up to the second one.
        for (let i = 1; i < rotorCount - 1; i++) {
            if (this.alphabet[this.rotorPositions[i]] === turnoverNotches[i] && this.alphabet[this.rotorPositions[i-1]] === turnoverNotches[i-1]) {
                this.rotorPositions[i] = (this.rotorPositions[i] + 1) % this.alphabet.length;
                this.rotorPositions[i-1] = (this.rotorPositions[i-1] + 1) % this.alphabet.length;
            }
        }

        // Normal stepping for the rightmost rotor
        this.rotorPositions[rotorCount - 1] = (this.rotorPositions[rotorCount - 1] + 1) % this.alphabet.length;

        // Propagate carry
        for (let i = rotorCount - 1; i > 0; i--) {
            if (this.alphabet[this.rotorPositions[i]] === turnoverNotches[i] && i > 0) {
                 this.rotorPositions[i - 1] = (this.rotorPositions[i - 1] + 1) % this.alphabet.length;
            } else {
                break;
            }
        }
    }

    // Simulate a single key press (encipher character)
    encipherChar(char: string): string {
        if (!this.alphabet.includes(char)) {
            return char; // Return non-alphabetic characters unchanged
        }

        // 1. Step the rotors (before enciphering)
        this.stepRotors();

        let charIndex = this.getCharIndex(char);
        if (charIndex === -1) return char;

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
        const charFromReflector = this.reflector.wiring[this.getCharFromIndex(charIndex)]; // Use getCharFromIndex to handle negative indices
        charIndex = this.getCharIndex(charFromReflector);

        // 5. Pass through rotors (backward)
        for (let i = 0; i < this.rotors.length; i++) {
            const rotor = this.rotors[i];
            // The character entering the rotor from the left
            const inputCharIndex = (charIndex + this.rotorPositions[i]) % this.alphabet.length;
            const inputChar = this.getCharFromIndex(inputCharIndex);

            // Find which character on the right connects to this character on the left (inverse wiring)
            const wiringIndex = rotor.wiring.indexOf(inputChar);

            if (wiringIndex === -1) {
                console.error(`Enigma logic error: Cannot find inverse mapping for rotor ${rotor.id}`);
                return char;
            }

            // Adjust for rotor position
            charIndex = wiringIndex - this.rotorPositions[i] - rotor.ringSetting;
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
            const positionsToUse = initialRotorPositions && initialRotorPositions.length === this.rotorPositions.length
                ? initialRotorPositions
                : [...this.currentConfig.initialRotorPositions!];

            this.setInitialRotorPositions(positionsToUse);
            return this.encipherString(message);
        } catch (error) {
            console.error('Error encrypting message:', error);
            return message;
        }
    }

    // Method to decrypt a message
    decrypt(encryptedMessage: string, initialRotorPositions?: number[]): string {
        // Enigma is symmetric
        return this.encrypt(encryptedMessage, initialRotorPositions);
    }

    // Method to set initial rotor positions
    setInitialRotorPositions(positions: number[]): void {
        if (positions.length === this.rotorPositions.length) {
            this.rotorPositions = positions.map(pos => pos % this.alphabet.length);
        } else {
            console.error(`Invalid number of initial rotor positions provided. Expected ${this.rotorPositions.length}, got ${positions.length}.`);
        }
    }

    // Get the current Enigma configuration
    getConfiguration(): EnigmaConfig {
        return {
            ...this.currentConfig,
            plugboardConnections: new Map(this.currentConfig.plugboardConnections)
        };
    }

    // Set a new Enigma configuration
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
            // Alphabet assumed constant

            this.setInitialRotorPositions(newConfig.initialRotorPositions || Array(this.rotors.length).fill(0));

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
}
