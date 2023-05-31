<script lang="ts">
	import { playerOnePoints, playerTwoPoints } from '../store/store.js';

	// Access the store values
	let pointsPlayerOne = $playerOnePoints;
	let pointsPlayerTwo = $playerTwoPoints;
</script>

<svelte:head>
	<title>Memo card game built with SvelteKit + DaisyUI + TailwindCSS!</title>
</svelte:head>

<html lang="en">
	<p class="text-primary">React Sux</p>
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

	.winner-message {
		padding: 20px;
		background: var(--ctp-macchiato-base);
		border-radius: 16px;
		box-shadow: #cba6f7 6px 2px 16px 0px, #f38ba8 -6px -2px 16px 0px;
	} */
</style>
