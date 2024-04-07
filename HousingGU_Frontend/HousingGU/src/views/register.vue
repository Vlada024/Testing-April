<template>
	<div class="register-page">
		<div class="register-container">
			<div class="register-form">
				<form :class="{ 'slide-in': formVisible }">
					<img src="../assets/img/logo.png" alt="Logo" class="LogoImg" />
					<h2>Create New Account</h2>
					<div class="mb-3">
						<label for="Username" class="form-label">Username</label>
						<input type="text" class="form-control" id="Username" placeholder="Enter your username" v-model="formUserName" />
					</div>
					<div class="mb-3">
						<label class="form-label">User Type</label>
						<div>
							<label> <input type="radio" value="Roomie" v-model="selectedUser" /> Roomie </label>
							<label> <input type="radio" value="Landlord" v-model="selectedUser" /> Landlord </label>
						</div>
					</div>
					<div class="mb-3">
						<label for="email" class="form-label">Email</label>
						<input type="email" class="form-control" id="email" placeholder="Enter your email" v-model="formEmail" />
					</div>
					<div class="mb-3">
						<label for="phoneNumber" class="form-label">Phone Number</label>
						<input type="tel" class="form-control" id="phoneNumber" placeholder="Enter your phone number" v-model="formPhone" />
					</div>
					<div class="mb-3">
						<label for="password" class="form-label">Password</label>
						<input type="password" class="form-control" id="password" placeholder="Enter your password" v-model="formPassword" />
					</div>
					<div class="mb-3">
						<label for="profilePicture" class="form-label">Profile Picture</label>
						<input type="file" class="form-control" id="profilePicture" @change="handleFileUpload" accept="image/*" />
					</div>

					<div v-if="selectedUser === 'Roomie'">
						<div class="mb-3">
							<label for="aboutMe" class="form-label">About Me</label>
							<textarea class="form-control" id="aboutMe" placeholder="Enter something about yourself" v-model="formAboutMe"></textarea>
						</div>
						<div class="mb-3">
							<label for="description" class="form-label">Description</label>
							<textarea class="form-control" id="description" placeholder="Enter a description" v-model="formDescription"></textarea>
						</div>
					</div>
					<button type="button" @click="register()" class="btn btn-primary">Register</button>

					<div class="text-center mt-3">
						<button type="button" class="btn btn-secondary btn-sm" @click="router.push({ path: '/login' })">You already have an account?</button>
					</div>
				</form>
			</div>
			<div class="dashboard">
				<img src="../assets/img/login.jpg" alt="Dashboard Image" class="sideImg" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import axios from "axios";
	import { ref, onMounted } from "vue";
	import { toast } from "vue3-toastify";
	import "vue3-toastify/dist/index.css";
	import { useRouter, useRoute } from "vue-router";

	const route = useRoute();
	const router = useRouter();
	const formUserName = ref("");
	const formPassword = ref("");
	const formEmail = ref("");
	const formPhone = ref("");
	const formVisible = ref(false);
	const profilePicture = ref(null);
	const selectedUser = ref("Landlord");
	const formAboutMe = ref("");
	const formDescription = ref("");
	onMounted(() => {
		formVisible.value = true;
	});

	async function register() {
		// Perform form validation
		if (!formUserName.value || !formEmail.value || !formPhone.value || !formPassword.value) {
			toast.error("Please fill in all the required fields.", {
				position: toast.POSITION.BOTTOM_RIGHT,
				theme: "colored",
			});
			return;
		}

		// Check if the email is in a valid format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formEmail.value)) {
			toast.error("Please enter a valid email address.", {
				position: toast.POSITION.BOTTOM_RIGHT,
				theme: "colored",
			});
			return;
		}

		const registerCred = new FormData(); // Create a FormData object
		registerCred.append("username", formUserName.value);
		registerCred.append("email", formEmail.value);
		registerCred.append("password", formPassword.value);
		registerCred.append("phoneNumber", formPhone.value);
		registerCred.append("profilePicture", profilePicture.value);
		registerCred.append("type", selectedUser.value);
		if (selectedUser.value == "Roomie") {
			registerCred.append("aboutMe", formAboutMe.value);
			registerCred.append("desc", formDescription.value);
		}
		await axios
			.post("/signup", registerCred, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(function (response) {
				if (response.data.response == "ok") {
					toast.success("Account registered successfully", {
						position: toast.POSITION.BOTTOM_RIGHT,
						theme: "colored",
					});
					setTimeout(() => {
						router.push("/login");
					}, 2500);
				} else {
					if ((error.name = "AxiosError")) {
						toast.error(error.response.data, {
							position: toast.POSITION.BOTTOM_RIGHT,
							theme: "colored",
						});
					} else {
						toast.error(error.response.data.message, {
							position: toast.POSITION.BOTTOM_RIGHT,
							theme: "colored",
						});
					}
				}
			})
			.catch(function (error) {
				console.log(error.response.data);
				toast.error(error.response.data.errorMessage, {
					position: toast.POSITION.BOTTOM_RIGHT,
					theme: "colored",
				});
			});
	}

	function handleFileUpload(event) {
		const file = event.target.files[0];
		profilePicture.value = file;
	}
</script>

<style scoped>
	form {
		max-height: 85vh;
		width: 45vw;
		overflow-y: auto;
		margin-top: 3rem;
	}
	.LogoImg {
		width: 20vw;
		margin-top: 2rem;
	}
	.register-container {
		display: flex;
		height: 95vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.register-container .register-form {
		flex: 0 0 50%;
		background: #f8f9fa;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 4rem;
	}

	.register-container .dashboard {
		background: #f8f9fa;
		flex: 0 0 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
	.register-container .dashboard img {
		width: 100%;
		height: 100%;
		clip-path: polygon(21% 0, 100% 0, 79% 100%, 0% 100%);
	}

	.register-container .dashboard a {
		color: #fff;
		text-decoration: underline;
	}

	.slide-in {
		animation: slideInFromLeft 0.6s ease-in-out forwards;
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	::-webkit-scrollbar-thumb {
		background: #888;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	@keyframes slideInFromLeft {
		from {
			transform: translateX(-140%);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
