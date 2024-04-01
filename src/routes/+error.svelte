<script>
	import { page } from '$app/stores';
	import { pics } from './pictures.js';
</script>

<div class="flex justify-center items-center h-full">
	<img class="h-full" src={pics[$page.status] ?? pics[500]} alt="Logo" />
</div>
