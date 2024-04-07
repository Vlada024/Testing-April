<template>
	<!---------------------------------------------- Footer ---------------------------------------------->

	<footer class="page-footer p-5 text-md-left sp-bg-hero-color">
		<!-- Content all items -->
		<div class="py-5 row g-4 me-5">
			<!-- Social Media -->
			<div class="col-lg-3 col-md-6 pb-5">
				<h5 class="font-weight-bold mb-4 text-light">Follow Us</h5>
				<p class="text-light">Follow us on social media</p>
				<a href="#" class="text-light"> <i class="bi bi-facebook p-2"></i></a>
				<a href="#" class="text-light"> <i class="bi bi-twitter p-2"></i></a>
				<a href="#" class="text-light"> <i class="bi bi-instagram p-2"></i></a>
				<a href="#" class="text-light"> <i class="bi bi-youtube p-2"></i></a>
			</div>

			<!-- Important links -->
			<div class="col-lg-3 col-md-3">
				<h5 class="text-light">Important Links</h5>
				<p class="mb-1 text-light"><a class="sp-list" href="#">Terms and Conditions</a></p>
				<p class="mb-1 text-light"><a class="sp-list" href="#">Complaints and Suggestions</a></p>
				<p class="mb-1 text-light"><a class="sp-list" href="#">Frequently Asked Questions</a></p>
			</div>

			<!-- Customers Service -->
			<div class="col-lg-3 col-md-3">
				<h5 class="text-light">Customer Service</h5>
				<p class="mb-1 text-light"><a class="sp-list" href="#">Whatsapp</a></p>
				<p class="mb-1 text-light"><a class="sp-list" href="#">Email</a></p>
				<p class="mb-1 text-light"><a class="sp-list" href="#">Contact Us</a></p>
			</div>

			<!-- Subscribe to the newsletter -->
			<div class="col-lg-3 col-md-3">
				<h5 class="text-light">Subscribe to Newsletter</h5>
				<form class="d-flex sp-search2" action="#">
					<input class="form-control" type="search" placeholder="Email Address" aria-label="Search" />
					<button class="btn btn-outline-success" type="submit">Subscribe</button>
				</form>
			</div>
		</div>
	</footer>
</template>

<style scoped>
	/* --------------------------------------------- Footer --------------------------------------------- */
	.sp-list {
		text-decoration: none !important;
		color: #fff !important;
	}

	.sp-search2 input {
		width: 13em;
		padding: 0 30px;
		border-width: 1px;
		font-weight: 600;
		font-size: 16px;
		position: relative;
		height: 40px;
	}
	.sp-search2 button {
		width: 65px;
		color: #fff;
		border: none;
	}

	.sp-bg-hero-color {
		background-color: #35185a !important;
	}
	.page-footer {
		width: 100%;
		position: static;

		bottom: 0%;
	}
</style>
