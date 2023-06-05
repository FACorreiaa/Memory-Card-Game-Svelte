<script lang="ts">
	import {
		cards,
		disabled,
		gameStatus,
		playerTurn,
		GAME_STATE,
		PLAYER_TURN,
		type CardObjectType,
		choiceTwo,
		choiceOne,
		playerOneTurn,
		playerOnePoint,
		playerTwoPoint,
		playerTwoTurn
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

	$: allCardsUp = $cards?.every((card) => card.matched === true);
	$: renderButtonMessage = $gameStatus === GAME_STATE.GAME_OFF ? 'Start Game' : 'Reset Game';
	$: isGameOff = $gameStatus === GAME_STATE.GAME_OFF;
	$: isPlayerOneTurn =
		$playerTurn === PLAYER_TURN.PLAYER_ONE && $gameStatus === GAME_STATE.ON_GOING;

	$: isPlayerTwoTurn =
		$playerTurn === PLAYER_TURN.PLAYER_TWO && $gameStatus === GAME_STATE.ON_GOING;

	// let gameStatus; // Assign the value of the gameStatus store
	// $gameStatus.subscribe(value => {
	//   gameStatus = value;
	// });

	const onHandleStartButton = () => {
		gameStatus.set(GAME_STATE.ON_GOING);
		const shuffledCardList = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({
				...card,
				id: Math.random()
			}));

		choiceOne.set(null);
		choiceTwo.set(null);
		cards.set(shuffledCardList);
		playerOneTurn.set(0);
		playerTwoTurn.set(0);
		playerOnePoint.set(0);
		playerTwoPoint.set(0);
	};

	const onHandleCardClick = (card: CardObjectType) => {
		$choiceOne ? choiceTwo.set(card) : choiceOne.set(card);
	};

	const validateMatchedCards = () => {
		cards.update((prevState) => {
			return prevState.map((card) => {
				if (card.src === $choiceOne?.src) {
					return { ...card, matched: true };
				} else {
					return card;
				}
			});
		});
	};

	const handleNextTurn = () => {
		choiceOne.set(null);
		choiceTwo.set(null);
		if (isPlayerOneTurn) {
			playerOneTurn.update((state) => (state += 1));
			playerTurn.set(PLAYER_TURN.PLAYER_TWO);
		} else {
			playerTwoTurn.update((state) => (state += 1));
			playerTurn.set(PLAYER_TURN.PLAYER_ONE);
		}
		disabled.set(false);
	};

	const validateTurn = (currentPlayer) => {
		if ($choiceOne && $choiceTwo) {
			disabled.set(true);

			if ($choiceOne?.src === $choiceTwo?.src) {
				if (currentPlayer === PLAYER_TURN.PLAYER_ONE) {
					playerOnePoint.update((state) => state + 1);
				} else if (currentPlayer === PLAYER_TURN.PLAYER_TWO) {
					playerTwoPoint.update((state) => state + 1);
				}

				validateMatchedCards();
				handleNextTurn();
			} else {
				playerTurn.set(PLAYER_TURN.PLAYER_TWO);
				setTimeout(() => handleNextTurn(), 500);
			}
		}
	};

	function updateTurn() {
		if (isPlayerOneTurn) {
			validateTurn(PLAYER_TURN.PLAYER_ONE);
		} else {
			validateTurn(PLAYER_TURN.PLAYER_TWO);
		}
	}

	const onHandleStopButton = () => {
		gameStatus.set(GAME_STATE.GAME_OFF);
		choiceOne.set(null);
		choiceTwo.set(null);
		playerOneTurn.set(0);
		playerTwoTurn.set(0);
		playerOnePoint.set(0);
		playerTwoPoint.set(0);
	};

	onMount(() => {
		// Initial effect

		updateTurn();
	});

	afterUpdate(() => {
		// Effect when choiceOne or choiceTwo changes
		updateTurn();
	});

	$: {
		if ($playerTurn === PLAYER_TURN.PLAYER_ONE) {
			validateTurn(PLAYER_TURN.PLAYER_ONE);
		} else {
			validateTurn(PLAYER_TURN.PLAYER_TWO);
		}
	}
</script>

<svelte:head>
	<title>Memo card game built with SvelteKit + DaisyUI + TailwindCSS!</title>
</svelte:head>

<html lang="en">
	<p class="mb-2 text-primary">React Sux</p>
	<div class="container">
		<div class="inline-flex">
			<Button onClick={onHandleStartButton} label={renderButtonMessage} />
			<Button onClick={onHandleStopButton} label={'Stop game'} />
		</div>

		<PlayerTurns
			playerOneName="Player One"
			playerTwoName="Player Two"
			playerOneTurn={$playerOneTurn}
			playerTwoTurn={$playerTwoTurn}
			playerOnePoint={$playerOnePoint}
			playerTwoPoint={$playerTwoPoint}
			{isPlayerOneTurn}
			{isPlayerTwoTurn}
		/>
		{#if isGameOff}
			<h4>Press Start and train your memory!</h4>
		{:else}
			<Board>
				{#each $cards as card}
					<Card
						{card}
						{onHandleCardClick}
						flipped={card === $choiceOne || card === $choiceTwo || card.matched}
						disabled={$disabled}
					/>
				{/each}
			</Board>
		{/if}
		<Message
			{allCardsUp}
			playerOnePoint={$playerOnePoint}
			playerOneTurn={$playerOneTurn}
			playerTwoPoint={$playerTwoPoint}
			playerTwoTurn={$playerTwoTurn}
		/>
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
