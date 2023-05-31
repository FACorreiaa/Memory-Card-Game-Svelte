<script lang="ts">
	type PlayerTurnsType = {
		playerOneName: string;
		playerTwoName: string;
		playerOneTurn: number;
		playerOnePoints: number;
		playerTwoTurn: number;
		playerTwoPoints: number;
	};

	export let PlayerData: PlayerTurnsType;
</script>

<html lang="en">
	<div class="container">
		<div class="row">
			<div class="column">
				<div class="player-container">
					<h5 class="player-title">{PlayerData.playerOneName}</h5>
					<div>
						<span>Turns: {PlayerData.playerOneTurn}</span>
						<span>Points: {PlayerData.playerOnePoints}</span>
					</div>
				</div>
			</div>
			<div class="column">
				<div class="player-container">
					<h5 class="player-title">{PlayerData.playerTwoName}</h5>
					<div>
						<span>Turns: {PlayerData.playerTwoName}</span>
						<span>Points: {PlayerData.playerTwoPoints}</span>
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
