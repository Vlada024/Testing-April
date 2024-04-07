<template>
	<div class="Rooms">
		<h1 class="text-center">Rooms for rent</h1>
		<br /><br /><br />

		<div class="row">
			<div v-for="category in displayedCategories" :key="category.id" class="col-lg-4 col-md-6 col-sm-6 col-6 d-flex justify-content-center py-3">
				<div class="card text-light sp-card">
					<div class="position-relative">
						<img :src="category.image" class="card-img-top" alt="Room Image" />
						<div class="badges">
							<span class="badge bg-secondary">{{ category.location }}</span>
							<span class="badge bg-primary">{{ category.price }}</span>
						</div>
					</div>
					<div class="card-body d-flex flex-column justify-content-between align-items-start sp-bg-image-card">
						<div>
							<h3 class="card-title text-black-50 fs-5">{{ category.name }}</h3>
							<p class="card-text text-muted fs-6">{{ category.smallDescription }}</p>
						</div>
						<div class="text-center">
							<p class="card-text text-muted fs-6">{{ category.fullDescription }}</p>
							<button class="btn btn-primary btn-sm mt-2">More</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="d-flex justify-content-center mt-5">
			<a class="btn btn-primary me-3" @click="previousPage" v-if="currentPage > 1">
				<i class="bi bi-arrow-left"></i>
			</a>
			<a class="btn btn-primary" @click="nextPage" v-if="currentPage < totalPages">
				<i class="bi bi-arrow-right"></i>
			</a>
		</div>
	</div>
</template>
<style>
	/* --------------------------------------------- Categories Card --------------------------------------------- */
	.Rooms {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.badges {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}
	.sp-categories-card {
		width: 100%;
		height: 100%;
		background-color: #f9f7f7;
		position: relative;
	}

	.sp-card {
		width: 350px;
		height: 100%;
		transition: 0.7s;
		box-shadow: 0 5px 25px rgba(112, 112, 112, 0.199);
		cursor: pointer;
		color: black;
	}

	.sp-card:hover {
		transform: scale(1.1);
	}

	.sp-bg-image-card {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.sp-card-text {
		color: black;
		font-size: 1.1rem;
	}

	.sp-badge {
		border: 1px solid black;
	}

	.sp-badge:not(:last-child) {
		margin-right: 0.5rem;
	}
</style>
<script setup>
	import { ref, computed } from "vue";

	const categories = ref([
		{
			id: 1,
			name: "Category 1",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 1",
			fullDescription: "Full description for category 1",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 2,
			name: "Category 2",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 2",
			fullDescription: "Full description for category 2",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 3,
			name: "Category 3",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 3",
			fullDescription: "Full description for category 3",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 4,
			name: "Category 4",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 4",
			fullDescription: "Full description for category 4",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 5,
			name: "Category 5",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 5",
			fullDescription: "Full description for category 5",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 6,
			name: "Category 6",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 6",
			fullDescription: "Full description for category 6",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 7,
			name: "Category 7",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 7",
			fullDescription: "Full description for category 7",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 8,
			name: "Category 8",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 7",
			fullDescription: "Full description for category 7",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 9,
			name: "Category 9",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 7",
			fullDescription: "Full description for category 7",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 10,
			name: "Category 10",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 7",
			fullDescription: "Full description for category 7",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 11,
			name: "Category 11",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 7",
			fullDescription: "Full description for category 7",
			location: "East Coast New York",
			price: "$300",
		},
		{
			id: 12,
			name: "Category 12",
			image: "src/assets/img/apartment.jpg",
			smallDescription: "Small description for category 7",
			fullDescription: "Full description for category 7",
			location: "East Coast New York",
			price: "$300",
		},
	]); // Array of all queried results
	const itemsPerPage = 6; // Number of items to display per page
	const currentPage = ref(1); // Current page number

	const totalPages = computed(() => Math.ceil(categories.value.length / itemsPerPage));

	const displayedCategories = computed(() => {
		const startIndex = (currentPage.value - 1) * itemsPerPage;
		const endIndex = currentPage.value * itemsPerPage;
		return categories.value.slice(startIndex, endIndex);
	});

	const previousPage = () => {
		currentPage.value--;
	};

	const nextPage = () => {
		currentPage.value++;
	};
</script>
