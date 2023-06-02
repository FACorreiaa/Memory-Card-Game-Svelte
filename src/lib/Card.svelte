<script lang="ts">
	type CardObjectType = {
		id: number;
		src: string;
		matched: boolean;
	};

	export let card: CardObjectType;
	export let onHandleCardClick: (card: CardObjectType) => void;
	export let flipped: boolean;
	export let disabled: boolean;
	// export let card: CardObjectType;
	// export let onHandleCardClick: (card: CardObjectType) => void;
	// export let flipped: boolean;
	// export let disabled: boolean;

	const handleClick = () => {
		if (!disabled) {
			onHandleCardClick(card);
		}
	};
</script>

<html lang="">
	<div class="card-container">
		<div class="card-wrapper">
			<div class={flipped ? 'flipped' : ''}>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="front" src={card.src} alt="card image" />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img class="back" src={'/img/cover.jpeg'} alt="card cover" on:click|once={handleClick} />
			</div>
		</div>
	</div>
</html>

<style lang="postcss">
	.card-container {
		position: relative;
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: 21%;
		margin: 5px;
		transition: transform 1s;
		transform-style: preserve-3d;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}
	.card-wrapper {
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	.flipped .card-wrapper {
		transform: rotateY(180deg);
	}
	.card-container img {
		width: 100%;
		display: block;
		border: none;
		border-radius: 20px;
		border: none;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}

	.card-container:active {
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.card-container .front {
		transform: rotateY(90deg);
		transition: transform 0.8s;
		position: absolute;
		transform-style: preserve-3d;
	}

	.flipped .card-wrapper {
		transform: translateX(-100%) rotateY(-180deg);
		transition-delay: 0.5s;
	}

	.flipped .front {
		transform: rotateY(180deg);
		transition-delay: 0.1s;
	}
</style>
