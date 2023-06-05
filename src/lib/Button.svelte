<script lang="ts">
	export let label: string;
	export let onClick: () => void;
</script>

<button on:click|once={onClick} class="btn btn-primary">{label}</button>

<style lang="postcss">
	button {
		padding: 6px 32px;
		border-radius: 26px;
		font-weight: normal;
		cursor: pointer;
		font-size: 1em;
		margin-bottom: 20px;
		margin-left: 10px;
		border: none;
	}

	button:hover {
		background: linear-gradient(0.15turn, #165f7e, #587442, #6c3f10);
	}
</style>
