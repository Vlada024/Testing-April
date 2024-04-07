<script setup>
	import { ref } from "vue";
	import { userStore } from "../stores/userStore";
	import { useRouter, useRoute } from "vue-router";
	const userInfo = userStore();
	const route = useRoute();
	const router = useRouter();
	function logout() {
		userInfo.logOutUser();
		router.push("/");
	}
</script>

<template>
	<!---------------------------------------------- NavBar ---------------------------------------------->
	<header>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<router-link class="navbar-brand" to="/">
					<img src="../assets/img/logo.png" style="width: 7em; height: 2.3em" />
				</router-link>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav me-auto">
						<li class="nav-item">
							<router-link class="nav-link" to="/"><i class="bi bi-house-door sp-icon"></i> Home</router-link>
						</li>
						<li class="nav-item" v-if="userInfo.loggedIn == true && userInfo.type == 'Roomie'">
							<router-link class="nav-link" to="/roomieSearch"><i class="bi bi-search sp-icon"></i> Search for Roomie</router-link>
						</li>
					</ul>
					<ul class="navbar-nav">
						<div class="dropdown" v-if="userInfo.loggedIn == true">
							<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-fill sp-icon"></i>{{ userInfo.userName }}</button>
							<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
								<li>
									<router-link class="nav-link" to="/profile" v-if="userInfo.IsPreferenceFilled || userInfo.type == 'Roomie'"> User Profile</router-link>
									<router-link class="nav-link" to="/landlord-profile" v-if="userInfo.type == 'Landlord'"> User Profile</router-link>
									<router-link class="nav-link" to="/roomatePreference" v-if="userInfo.IsPreferenceFilled == false && userInfo.type == 'Roomie'"> Preference</router-link>
								</li>
								<li>
									<button class="nav-link" @click="logout()">logout</button>
								</li>
							</ul>
						</div>
						<li class="nav-item" v-if="userInfo.loggedIn == false">
							<router-link class="nav-link" to="/login"><i class="bi bi-person-fill sp-icon"></i> {{ userInfo.userName }}</router-link>
						</li>
						<router-link class="nav-link" to="/"><i class="bi bi-bell sp-icon"></i> Notifications</router-link>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<style scoped>
	header {
		width: 100%;
		position: fixed;
		z-index: 999;
		top: 0%;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.329);
	}
	.sp-icon {
		font-size: 20px;
	}

	.nav-item {
		color: #000000;
		border-radius: 8%;
	}
</style>
