<template>
	<div class="container">
		<div class="row">
			<div class="col-md-4">
				<div class="card">
					<img :src="profileImgURL" alt="Profile Picture" class="card-img-top" />
					<div class="card-body">
						<h5 class="card-title">{{ userInfo.userName }}</h5>
						<button class="btn btn-primary" @click="editProfile">Edit Profile</button>
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">My Posts</h5>
						<div class="posts-container" style="max-height: 400px; overflow: auto">
							<div v-for="(post, index) in posts" :key="index" class="card mb-3">
								<div class="row g-0">
									<div class="col-md-4">
										<img :src="'http://localhost:5555/uploads/postImages/' + post.image" alt="Post Image" class="img-fluid rounded-start" />
									</div>
									<div class="col-md-8">
										<div class="card-body">
											<h5 class="card-title">{{ post.name }}</h5>
											<p class="card-text">{{ post.smallDescription }}</p>
											<p class="card-text">
												<small class="text-muted">Location: {{ post.location }}</small>
											</p>
											<p class="card-text">
												<small class="text-muted">Price: {{ post.price }}</small>
											</p>
											<div class="d-flex justify-content-end">
												<button class="btn btn-primary btn-sm me-2" @click="editPost(post)">Edit</button>
												<button class="btn btn-danger btn-sm" @click="deletePost(post)">Delete</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="d-flex justify-content-end mt-3">
							<button class="btn btn-primary" @click="showAddPostModal = true">Add New Post</button>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Friend Requests</h5>
						<div class="friend-requests-container" style="max-height: 400px; overflow: auto">
							<div v-for="(request, index) in friendRequests" :key="index" class="card mb-3">
								<div class="row g-0 align-items-center">
									<div class="col-md-4">
										<img :src="'http://localhost:5555/uploads/profilePictures/' + request.image" alt="Friend Request" class="img-fluid rounded-start" />
									</div>
									<div class="col-md-8">
										<div class="card-body">
											<h5 class="card-title">{{ request.name }}</h5>
											<p class="card-text">{{ request.description }}</p>
											<div class="d-flex justify-content-between align-items-center">
												<span class="badge bg-primary">{{ request.matchPercentage }}% Match</span>
												<div>
													<button class="btn btn-success btn-sm me-2" @click="acceptRequest(request)">Accept</button>
													<button class="btn btn-danger btn-sm" @click="ignoreRequest(request)">Ignore</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="overlay" v-show="showAddPostModal">
		<div class="overlay-content">
			<h2>Add New Post</h2>
			<form>
				<div class="form-group">
					<label for="name">Name</label>
					<input type="text" class="form-control" id="name" v-model="newPost.name" />
				</div>
				<div class="form-group">
					<label for="smallDescription">Small Description</label>
					<textarea class="form-control" id="smallDescription" rows="2" v-model="newPost.smallDescription"></textarea>
				</div>
				<div class="form-group">
					<label for="fullDescription">Full Description</label>
					<textarea class="form-control" id="fullDescription" rows="3" v-model="newPost.fullDescription"></textarea>
				</div>
				<div class="form-group">
					<label for="location">Location</label>
					<input type="text" class="form-control" id="location" v-model="newPost.location" />
				</div>
				<div class="form-group">
					<label for="price">Price</label>
					<input type="text" class="form-control" id="price" v-model="newPost.price" />
				</div>
				<div class="form-group">
					<label for="photo1">Photo:</label>
					<input type="file" id="photo1" accept="image/*" @change="handlePhotoUpload($event)" />
				</div>

				<div class="overlay-buttons">
					<button type="button" class="btn btn-secondary" @click="showAddPostModal = false">Cancel</button>
					<button type="button" class="btn btn-primary" @click="savePost">Save Post</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { userStore } from "../stores/userStore";
	import { useRouter } from "vue-router";
	import { toast } from "vue3-toastify";
	import axios from "axios";

	const userInfo = userStore();
	const router = useRouter();
	const profileImgURL = ref("");
	const posts = ref([]);
	const showAddPostModal = ref(false);
	const newPost = ref({
		name: "",
		smallDescription: "",
		fullDescription: "",
		location: "",
		price: "",
		image: null,
	});
	const friendRequests = ref([]);

	onMounted(async () => {
		loadLandlordProfile();
		loadFriendRequests();
	});

	function editProfile() {
		// Implement edit profile logic
	}

	async function loadLandlordProfile() {
		await axios
			.get("/user/myprofile/" + userInfo.userId, { withCredentials: true })
			.then((response) => {
				const user = response.data.user;
				posts.value = response.data.apartments;
				userInfo.profilePicture = user.profilePicture;
			})
			.catch(function (error) {
				if (error.response && error.response.status === 401) {
					handleStatus401(error);
				}
			});
		profileImgURL.value = `http://localhost:5555/uploads/profilePictures/` + userInfo.profilePicture;
	}

	function handlePhotoUpload(event) {
		const file = event.target.files[0];
		newPost.value.image = file;
	}

	async function savePost() {
		const formData = new FormData();
		formData.append("name", newPost.value.name);
		formData.append("smallDescription", newPost.value.smallDescription);
		formData.append("fullDescription", newPost.value.fullDescription);
		formData.append("location", newPost.value.location);
		formData.append("price", newPost.value.price);
		formData.append("image", newPost.value.image);

		try {
			const response = await axios
				.post("apartment/create", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				})
				.then(function (response) {
					toast.success(response.data.message, {
						position: toast.POSITION.BOTTOM_RIGHT,
						theme: "colored",
					});
					showAddPostModal.value = false;
					loadLandlordProfile();
				});
		} catch (error) {
			console.error("Error saving post:", error);
		}
	}

	function editPost(post) {
		// Implement edit post logic
	}

	function deletePost(post) {
		// Implement delete post logic
	}

	async function loadFriendRequests() {
		await axios
			.get("/user/getMatchRequests", { withCredentials: true })
			.then((response) => {
				friendRequests.value = response.data.matching;
			})
			.catch(function (error) {
				if (error.response && error.response.status === 401) {
					handleStatus401(error);
				}
			});
	}

	const acceptRequest = async (request) => {
		try {
			const response = await axios
				.post("user/acceptMatchRequest", request, {
					withCredentials: true,
				})
				.then(function (response) {
					toast.success(response.data.message, {
						position: toast.POSITION.BOTTOM_RIGHT,
						theme: "colored",
					});
					loadLandlordProfile();
					loadFriendRequests();
				});
		} catch (error) {
			console.error("Error accepting request:", error);
		}
	};

	const ignoreRequest = async (request) => {
		try {
			const response = await axios
				.post("user/rejectMatchRequest", request, {
					withCredentials: true,
				})
				.then(function (response) {
					toast.success(response.data.message, {
						position: toast.POSITION.BOTTOM_RIGHT,
						theme: "colored",
					});
					loadLandlordProfile();
					loadFriendRequests();
				});
		} catch (error) {
			console.error("Error ignoring request:", error);
		}
	};

	function handleStatus401(response) {
		const userInfo = userStore();
		userInfo.logOutUser();
		router.push("/");
	}
</script>

<style scoped>
	.container {
		margin-top: 7rem;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		height: 95vh;
		overflow-x: hidden;
		background-color: rgba(243, 241, 241, 0.233);
		border-top-left-radius: 2%;
		border-bottom-left-radius: 2%;
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}

	.overlay-content {
		background-color: #fff;
		padding: 20px;
		max-width: 500px;
		width: 100%;
	}

	.overlay-buttons {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}
</style>
