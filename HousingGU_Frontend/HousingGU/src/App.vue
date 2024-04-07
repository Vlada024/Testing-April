<script setup>
	import { ref, computed } from "vue";
	import navbar from "./components/navbar.vue";
	import Bfooter from "./components/footer.vue";
</script>

<template>
	<navbar></navbar>
	<router-view />
	<Bfooter></Bfooter>
</template>
