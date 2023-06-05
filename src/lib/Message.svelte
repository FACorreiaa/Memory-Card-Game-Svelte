<script lang="ts">
	import { PLAYER_TURN } from '../store/store';

	export let playerOnePoint: number;
	export let playerTwoPoint: number;
	export let playerOneTurn: number;
	export let playerTwoTurn: number;
	export let allCardsUp: boolean;
</script>

{#if playerOnePoint > playerTwoPoint && allCardsUp}
	<h4 class="winner-message">
		{PLAYER_TURN.PLAYER_ONE} won the game with {playerOnePoint} points in{' '}
		{playerOneTurn} turns
	</h4>
{:else if playerOnePoint < playerTwoPoint && allCardsUp}
	<h4 class="winner-message">
		{PLAYER_TURN.PLAYER_TWO} won the game with {playerTwoPoint} points in{' '}
		{playerTwoTurn} turns
	</h4>
{:else}
	<h3 class="message-status">Enjoy the Game!</h3>
{/if}

<style>
	.winner-message {
		padding: 20px;
		border-radius: 26px;
		box-shadow: #cba6f7 6px 2px 16px 0px, #f38ba8 -6px -2px 16px 0px;
	}
</style>
