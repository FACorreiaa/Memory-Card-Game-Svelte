<script lang="ts">
	type PlayerOneType = {
		playerOnePoint: number;
		playerOneTurn: number;
	};

	type PlayerTwoType = {
		playerTwoPoint: number;
		playerTwoTurn: number;
	};

	export let playerOneName: string;
	export let playerTwoName: string;

	export let playerOneStats: PlayerOneType;
	export let playerTwoStats: PlayerTwoType;
</script>

<html lang="en">
	<div class="container">
		<div class="row">
			<div class="column">
				<div class="player-container">
					<h5 class="player-title">{playerOneName}</h5>
					<div>
						<span>Turns: {playerOneStats.playerOneTurn}</span>
						<span>Points: {playerOneStats.playerOnePoint}</span>
					</div>
				</div>
			</div>
			<div class="column">
				<div class="player-container">
					<h5 class="player-title">{playerTwoName}</h5>
					<div>
						<span>Turns: {playerTwoStats.playerTwoTurn}</span>
						<span>Points: {playerTwoStats.playerTwoPoint}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</html>

<style lang="postcss">
	.container {
		text-align: center;
		flex-direction: row;
		margin-bottom: 10px;
	}

	span {
		font-size: 20px;
		font-weight: 400;
		padding-right: 10px;
		flex-direction: column;
	}

	.player-title {
		font-size: 23px;
		font-weight: bold;
	}

	.row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.column {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
	}
</style>
