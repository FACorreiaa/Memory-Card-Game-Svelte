<script lang="ts">
	export let label: string;
</script>

<html lang="en">
	<button class="btn btn-primary">{label}</button>
</html>

<style lang="postcss">
	button {
		padding: 6px 32px;
		border-radius: 26px;
		font-weight: normal;
		cursor: pointer;
		font-size: 1em;
	}

	button:hover {
		background: linear-gradient(0.15turn, #165f7e, #587442, #6c3f10);
	}
</style>
