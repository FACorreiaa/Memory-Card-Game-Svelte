import { writable } from 'svelte/store';

// Create a writable store for player one's points
export const playerOnePoints = writable(0);

// Create a writable store for player two's points
export const playerTwoPoints = writable(0);
