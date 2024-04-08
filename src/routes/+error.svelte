<script>
	import { page } from '$app/stores';
	import { pics } from './pictures.js';
</script>

<div class="flex justify-center items-center h-full overflow-hidden">
	<img class="h-full overflow-hidden" src={pics[$page.status] ?? pics[500]} alt="Logo" />
</div>
