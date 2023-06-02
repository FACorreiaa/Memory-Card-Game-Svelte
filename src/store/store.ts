import { writable } from 'svelte/store';

export type CardObjectType = {
	id: number;
	src: string;
	matched: boolean;
};

export type PlayerOneType = {
	playerOnePoint: number;
	playerOneTurn: number;
};

export type PlayerTwoType = {
	playerTwoPoint: number;
	playerTwoTurn: number;
};

export const playerOneData: PlayerOneType = {
	playerOnePoint: 0,
	playerOneTurn: 0
};

export const playerTwoData: PlayerTwoType = {
	playerTwoPoint: 0,
	playerTwoTurn: 0
};

export type Choices = {
	choiceOne?: null | CardObjectType;
	choiceTwo?: null | CardObjectType;
};
export const choiceOptions: Choices = {
	choiceOne: null,
	choiceTwo: null
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

export const playerOne = writable(playerOneData);

export const playerTwo = writable(playerTwoData);

export const choices = writable(choiceOptions);

export const disabled = writable(false);

export const gameStatus = writable(<GAME_STATE>GAME_STATE.GAME_OFF);
export const playerTurn = writable(<PLAYER_TURN>PLAYER_TURN.PLAYER_ONE);
