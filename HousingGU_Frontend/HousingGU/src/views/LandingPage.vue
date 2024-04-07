<template>
	<!---------------------------------------------- Hero ---------------------------------------------->
	<section class="sp-bg-hero-color text-light p-5 text-center text-sm-start">
		<div class="container py-5">
			<!-- Search -->
			<div class="h-search container pt-5 d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block"></div>

			<!-- Hero Body -->
			<div class="row d-sm-flex align-items-center justify-content-between py-1">
				<img src="../assets/img/home.png" alt="image" class="HeaderImg" />
				<div class="col-lg-5 col-sm-12">
					<h1 class="col">HousingGU Platform</h1>
					<h3>
						Find and match your roommate with the desired
						<span class="typed-text">{{ typeValue }}</span>
						<span class="blinking-cursor">|</span>
						<span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
					</h3>
					<p class="col lead my-4 text-start">A trusted website for finding your roommate</p>
				</div>
			</div>
		</div>
	</section>

	<!-------------------------------------------- Categories Card -------------------------------------------->

	<section class="py-5 sp-categories-card">
		<div class="custom-shape-divider-top-1705784739">
			<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
				<path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
			</svg>
		</div>
		<div class="container"><catagory></catagory></div>
	</section>

	<!---------------------------------------------- About ---------------------------------------------->

	<section class="p-5 sp-bg-hero-color">
		<div class="custom-shape-divider-top-1705831103">
			<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
				<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
				<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
				<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
			</svg>
		</div>
		<div class="container pt-5">
			<h1 class="text-center text-light">HousingGU</h1>
			<div class="row align-items-center pt-2">
				<div class="d-flex justify-content-center col-lg-5 col-md-12 mt-lg-0 mt-md-5">
					<img src="../assets/img/HousingGUAbout_icon.png" class="img-fluid w-75 h-75" />
				</div>

				<div class="col-lg-7 col-md-12 p-lg-5 mt-5 text-light">
					<h2>HousingGU</h2>
					<p>HousingGU is a roommate matching app. It provides a convenient platform for individuals seeking compatible roommates. Whether you're a student, professional, or anyone in need of a roommate, HousingGU offers a reliable and efficient matching system.</p>
					<p>With HousingGU, you can easily find roommates who share similar interests, lifestyles, and preferences. The platform ensures secure communication and offers a seamless experience for connecting with potential roommates.</p>

					<a href="#" class="btn btn-primary mt-3">
						<i class="bi bi-arrow-return-left"></i>
						More
					</a>
				</div>
			</div>
		</div>
	</section>
	<!---------------------------------------------- Cards ---------------------------------------------->

	<HomeCards></HomeCards>
	<!---------------------------------------------- F&Q ---------------------------------------------->
	<FQS></FQS>
</template>
<script setup>
	import catagory from "../components/catagories.vue";
	import FQS from "../components/FQS.vue";
	import HomeCards from "../components/HomeCards.vue";
</script>
<style scoped>
	.custom-shape-divider-top-1705784739 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}

	.custom-shape-divider-top-1705784739 svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 115px;
		transform: rotateY(180deg);
	}

	.custom-shape-divider-top-1705784739 .shape-fill {
		fill: #35185a;
	}
	.custom-shape-divider-top-1705831103 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}

	.custom-shape-divider-top-1705831103 svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 96px;
		transform: rotateY(180deg);
	}

	.custom-shape-divider-top-1705831103 .shape-fill {
		fill: #f9f7f7;
	}
	/** Ending of shape dividers */

	.HeaderImg {
		width: 35rem;
	}
	.sp-color-b {
		color: #f9f7f7 !important;
	}

	.sp-bg-hero-color {
		background-color: #35185a !important;
		position: relative;
	}

	/* --------------------------------------------- Card --------------------------------------------- */
</style>

<style lang="scss" scoped>
	.blinking-cursor {
		font-size: 2rem;
		color: #e0d71e;
		-webkit-animation: 1s blink step-end infinite;
		-moz-animation: 1s blink step-end infinite;
		-ms-animation: 1s blink step-end infinite;
		-o-animation: 1s blink step-end infinite;
		animation: 1s blink step-end infinite;
	}
	@keyframes blink {
		from,
		to {
			color: transparent;
		}
		50% {
			color: #ffee00;
		}
	}
	@-moz-keyframes blink {
		from,
		to {
			color: transparent;
		}
		50% {
			color: #2c3e50;
		}
	}
	@-webkit-keyframes blink {
		from,
		to {
			color: transparent;
		}
		50% {
			color: #2c3e50;
		}
	}
	@-ms-keyframes blink {
		from,
		to {
			color: transparent;
		}
		50% {
			color: #2c3e50;
		}
	}
	@-o-keyframes blink {
		from,
		to {
			color: transparent;
		}
		50% {
			color: #2c3e50;
		}
	}
</style>

<script>
	export default {
		name: "typeWiriter",
		data: () => {
			return {
				typeValue: "",
				typeStatus: false,
				displayTextArray: ["Interests", "Budget", "Location", "Preferences"],
				typingSpeed: 100,
				erasingSpeed: 100,
				newTextDelay: 2000,
				displayTextArrayIndex: 0,
				charIndex: 0,
			};
		},
		props: {},
		created() {
			setTimeout(this.typeText, this.newTextDelay + 200);
		},
		methods: {
			typeText() {
				if (this.charIndex < this.displayTextArray[this.displayTextArrayIndex].length) {
					if (!this.typeStatus) this.typeStatus = true;
					this.typeValue += this.displayTextArray[this.displayTextArrayIndex].charAt(this.charIndex);
					this.charIndex += 1;
					setTimeout(this.typeText, this.typingSpeed);
				} else {
					this.typeStatus = false;
					setTimeout(this.eraseText, this.newTextDelay);
				}
			},
			eraseText() {
				if (this.charIndex > 0) {
					if (!this.typeStatus) this.typeStatus = true;
					this.typeValue = this.displayTextArray[this.displayTextArrayIndex].substring(0, this.charIndex - 1);
					this.charIndex -= 1;
					setTimeout(this.eraseText, this.erasingSpeed);
				} else {
					this.typeStatus = false;
					this.displayTextArrayIndex += 1;
					if (this.displayTextArrayIndex >= this.displayTextArray.length) this.displayTextArrayIndex = 0;
					setTimeout(this.typeText, this.typingSpeed + 1000);
				}
			},
		},
	};
</script>
