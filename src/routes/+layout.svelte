<script>
	import '../app.css';
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';
</script>

<header>
	<Header />
</header>

<main class="flex h-full p-5 overflow-y-auto text-center" data-theme="cyberpunk">
	<slot />
</main>

<footer>
	<Footer />
</footer>

<style>
</style>
