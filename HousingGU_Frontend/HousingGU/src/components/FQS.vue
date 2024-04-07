<template>
	<section class="p-3 pb-5 sp-bg-color-w">
		<div class="container-lg p-lg-5 p-xl-5 p-xxl-5">
			<!-- Title -->
			<h2 class="text-center mb-4">Frequently Asked Questions</h2>

			<!-- Content All F&Q -->
			<div class="accordion sp-bg-color-w">
				<!-- Q 1 -->
				<div class="accordion-item sp-bg-color-w">
					<h2 class="accordion-header">
						<button class="accordion-button sp-bg-color-w" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Is the platform secure?</button>
					</h2>
					<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
						<div class="accordion-body">Yes, we thoroughly verify each user to provide a safe and trustworthy community.</div>
					</div>
				</div>

				<!-- Q 2 -->
				<div class="accordion-item sp-bg-color-w">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed sp-bg-color-w" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">How does the matching work?</button>
					</h2>
					<div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
						<div class="accordion-body">Our algorithm analyzes your preferences and lifestyle to suggest the best-fit roommates.</div>
					</div>
				</div>

				<!-- Q 3 -->
				<div class="accordion-item sp-bg-color-w">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed sp-bg-color-w" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Is there a cost to use the platform?</button>
					</h2>
					<div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
						<div class="accordion-body">No, our Roommate Matching Platform is free to use for all users.</div>
					</div>
				</div>

				<!-- Q 4 -->
				<div class="accordion-item sp-bg-color-w">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed sp-bg-color-w" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">How can I contact support?</button>
					</h2>
					<div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
						<div class="accordion-body">You can reach our support team at support@roommatematch.com or 1-888-123-4567.</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.sp-bg-color-w {
		background-color: #f9f7f7 !important;
	}

	.sp-bg-color-card {
		background-color: #d5bbf7 !important;
		color: black;
	}

	/* Search Page */
	.sp-search-card {
		text-decoration: none;
		color: black;
	}

	.vertical {
		border-left: 6px solid #91c3f3;
		height: 800px;
		position: absolute;
		left: 75%;
	}
</style>
