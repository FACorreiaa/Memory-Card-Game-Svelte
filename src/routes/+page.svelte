<script lang="ts">
	import {
		playerOne,
		playerTwo,
		cards,
		choices,
		disabled,
		gameStatus,
		playerTurn,
		GAME_STATE,
		PLAYER_TURN,
		type CardObjectType
	} from '../store/store.js';
	import { onMount, afterUpdate } from 'svelte';

	import Button from '../lib/Button.svelte';
	import PlayerTurns from '../lib/PlayerTurns.svelte';
	import Board from '../lib/Board.svelte';
	import Card from '../lib/Card.svelte';
	import Message from '../lib/Message.svelte';

	const cardImages = [
		{ src: '/img/hiruma.jpg', matched: false },
		{ src: '/img/ikki.jpg', matched: false },
		{ src: '/img/ippo.jpg', matched: false },
		{ src: '/img/kongo.jpg', matched: false },
		{ src: '/img/kusanagi.jpg', matched: false },
		{ src: '/img/luffy.jpg', matched: false },
		{ src: '/img/taiga.jpg', matched: false },
		{ src: '/img/takamura.jpg', matched: false },
		{ src: '/img/yoko.jpg', matched: false }
	];

	let cardState = $cards;
	const onHandleStartButton = () => {
		gameStatus.set(GAME_STATE.ON_GOING);

		const shuffledCardList = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({
				...card,
				id: Math.random()
			}));

		choices.set({ choiceOne: null, choiceTwo: null });
		cards.set(shuffledCardList);
		playerOne.set({ playerOneTurn: 0, playerOnePoint: 0 });
		playerTwo.set({ playerTwoTurn: 0, playerTwoPoint: 0 });
	};

	const onHandleCardClick = (card: CardObjectType) => {
		$choices.choiceOne
			? choices.set({ choiceOne: null, choiceTwo: card })
			: choices.set({ choiceOne: card, choiceTwo: null });
	};

	const validateMatchedCards = () => {
		cards.update((prevState) => {
			return prevState.map((card) => {
				if (card.src === $choices.choiceOne?.src) {
					return { ...card, matched: true };
				} else {
					return card;
				}
			});
		});
	};

	const handleNextTurn = () => {
		choices.set({ choiceOne: null, choiceTwo: null });

		if ($playerTurn === PLAYER_TURN.PLAYER_ONE) {
			playerOne.update((state) => ({ ...state, playerOneTurn: state.playerOneTurn + 1 }));
			playerTurn.set(PLAYER_TURN.PLAYER_TWO);
		} else {
			playerTwo.update((state) => ({ ...state, playerTwoTurn: state.playerTwoTurn + 1 }));
			playerTurn.set(PLAYER_TURN.PLAYER_ONE);
		}
		disabled.set(false);
	};

	const validateTurn = (currentPlayer) => {
		const { choiceOne, choiceTwo } = $choices;

		if (choiceOne && choiceTwo) {
			disabled.set(true);

			if (choiceOne.src === choiceTwo.src) {
				if (currentPlayer === PLAYER_TURN.PLAYER_ONE) {
					playerOne.update((state) => ({ ...state, playerOnePoint: state.playerOnePoint + 1 }));
				} else if (currentPlayer === PLAYER_TURN.PLAYER_TWO) {
					playerTwo.update((state) => ({ ...state, playerTwoPoint: state.playerTwoPoint + 1 }));
				}

				validateMatchedCards();
				handleNextTurn();
			} else {
				playerTurn.set(PLAYER_TURN.PLAYER_TWO);
				setTimeout(() => handleNextTurn(), 500);
			}
		}
	};

	const onHandleStopButton = () => {
		gameStatus.set(GAME_STATE.GAME_OFF);
		choices.set({ choiceOne: null, choiceTwo: null });
		playerOne.set({ playerOnePoint: 0, playerOneTurn: null });
		playerTwo.set({ playerTwoPoint: 0, playerTwoTurn: null });
	};

	const { playerOnePoint, playerOneTurn } = $playerOne;
	const { playerTwoPoint, playerTwoTurn } = $playerTwo;
	const allCardsUp = $cards?.every((card) => card.matched === true);
	const renderButtonMessage = $gameStatus === GAME_STATE.GAME_OFF ? 'Start Game' : 'Reset Game';

	onMount(() => {
		const unsubscribe = choices.subscribe(({ choiceOne, choiceTwo }) => {
			if (choiceOne && choiceTwo) {
				disabled.set(true);
				if ($playerTurn === PLAYER_TURN.PLAYER_ONE) {
					playerOne.update((state) => ({ ...state, playerOneTurn: state.playerOneTurn + 1 }));
					validateMatchedCards();
					handleNextTurn();
				} else {
					playerTwo.update((state) => ({ ...state, playerTwoTurn: state.playerTwoTurn + 1 }));
					validateMatchedCards();
					handleNextTurn();
				}
			}
		});

		return unsubscribe;
	});

	afterUpdate(() => {
		const { choiceOne, choiceTwo } = $choices;
		if (choiceOne && choiceTwo) {
			disabled.set(true);
			if ($playerTurn === PLAYER_TURN.PLAYER_ONE) {
				playerOne.update((state) => ({ ...state, playerOnePoints: state.playerOnePoint + 1 }));
				validateMatchedCards();
				handleNextTurn();
			} else {
				playerTwo.update((state) => ({ ...state, playerTwoPoints: state.playerTwoPoint + 1 }));
				validateMatchedCards();
				handleNextTurn();
			}
		}
	});
</script>

<svelte:head>
	<title>Memo card game built with SvelteKit + DaisyUI + TailwindCSS!</title>
</svelte:head>

<html lang="en">
	<p class="text-primary">React Sux</p>
	<div class="container">
		<div class="inline-flex">
			<Button label={renderButtonMessage} />
			<Button label={'nuts'} />
		</div>

		<Message {allCardsUp} {playerOnePoint} {playerOneTurn} {playerTwoPoint} {playerTwoTurn} />
	</div>
</html>

<style land="postcss">
	/* p.message-status {
		font-size: 16px;
		font-weight: 500;
	}

	.button {
		margin-bottom: 20px;
		margin-left: 10px;
	}

 */
</style>
