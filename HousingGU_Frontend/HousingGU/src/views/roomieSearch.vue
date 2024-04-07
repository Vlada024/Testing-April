<template>
	<div class="container d-flex justify-content-center align-items-center h-100">
		<div class="card w-100" v-if="profiles.length > 0">
			<img class="card-img-top" :src="profileImgURL" alt="Profile Image" />
			<div class="card-body">
				<div class="d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0">{{ currentProfile.username }}</h5>
					<div class="badge bg-success">{{ currentProfile.matchPercentage.toFixed(1) }}% Match</div>
				</div>
				<p class="card-text">{{ currentProfile.desc }}</p>
				<p class="card-text">{{ currentProfile.aboutMe }}</p>
			</div>
			<div class="card-footer d-flex justify-content-end">
				<button class="btn btn-danger mr-2" @click="rejectProfile">Reject</button>
				<button class="btn btn-success ml-2" @click="acceptProfile">Accept</button>
			</div>
		</div>
		<div class="card w-100" v-if="profiles.length == 0">
			<div class="card-body">
				<div class="d-flex justify-content-between align-items-center">
					<h5 class="card-title mb-0">No More Users to Match</h5>
				</div>
			</div>
			<div class="card-footer d-flex justify-content-end"></div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import axios from "axios";
	import { userStore } from "../stores/userStore";
	const userInfo = userStore();
	const profileImgURL = ref("");
	const profiles = ref([
		{
			name: "John Doe",
			bio: "I love hiking and exploring new places.",
			image: "src/assets/img/breakingbad.jpg",
			matchPercentage: 90,
		},
		{
			name: "Jane Smith",
			bio: "Passionate about art and photography.",
			image: "src/assets/img/breakingbad.jpg",
			matchPercentage: 85,
		},
	]);
	const currentProfile = ref(profiles.value[0]);
	onMounted(async () => {
		loadMatchingUsers();
	});
	const rejectProfile = async () => {
		await createMatchAndChat(userInfo.userId, profiles.value[0].id, profiles.value[0].username, profiles.value[0].matchPercentage, false);
		profiles.value.shift();
		updateCurrentProfile();
	};

	const acceptProfile = async () => {
		await createMatchAndChat(userInfo.userId, profiles.value[0].id, profiles.value[0].username, profiles.value[0].matchPercentage, true);
		profiles.value.shift();
		updateCurrentProfile();
	};

	const updateCurrentProfile = () => {
		if (profiles.value.length > 0) {
			currentProfile.value = profiles.value[0];
			profileImgURL.value = `http://localhost:5555/uploads/profilePictures/` + currentProfile.value.profilePicture;
		} else {
		}
	};

	async function loadMatchingUsers() {
		await axios
			.get("/user/matchingUsers", { withCredentials: true })
			.then((response) => {
				profiles.value = response.data.matching;
				currentProfile.value = profiles.value[0];
				profileImgURL.value = `http://localhost:5555/uploads/profilePictures/` + currentProfile.value.profilePicture;
			})
			.catch(function (error) {});
	}
	async function createMatchAndChat(requesterId, requesteeId, requestedToUsername, requesteeMatchPercentage, matchBoolen) {
		try {
			const response = await axios.post("/user/matchWithUser", {
				requesterId,
				requesteeId,
				requestedToUsername,
				requesteeMatchPercentage,
				matchBoolen,
			});

			//	console.log("Matched and chat created:", response.data);
		} catch (error) {
			console.error("Error creating matched and chat:", error);
		}
	}
</script>

<style scoped>
	.container {
		margin-top: 7rem;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		height: 80vh;
		width: 30vw;
		overflow-x: hidden;
		background-color: rgba(243, 241, 241, 0.233);
		border-top-left-radius: 2%;
		border-bottom-left-radius: 2%;
	}

	.card {
		max-width: 40rem;
	}
</style>
