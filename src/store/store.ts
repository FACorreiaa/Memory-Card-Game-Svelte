import { writable } from 'svelte/store';

export type CardObjectType = {
	id: number;
	src: string;
	matched: boolean;
};

export enum GAME_STATE {
	GAME_OFF = 'OFF',
	ON_GOING = 'GOING',
	GAME_FINISHED = 'FINISHED'
}

export enum PLAYER_TURN {
	PLAYER_ONE = 'Player 1',
	PLAYER_TWO = 'Player 2'
}

export const cards = writable(Array<CardObjectType>());

export const choiceOne = writable(null);
export const choiceTwo = writable(null);
export const playerOneTurn = writable(0);
export const playerTwoTurn = writable(0);
export const playerOnePoint = writable(0);
export const playerTwoPoint = writable(0);
export const disabled = writable(false);

export const gameStatus = writable(<GAME_STATE>GAME_STATE.GAME_OFF);
export const playerTurn = writable(<PLAYER_TURN>PLAYER_TURN.PLAYER_ONE);
