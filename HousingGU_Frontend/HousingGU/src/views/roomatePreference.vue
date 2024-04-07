<template>
	<div class="Holder">
		<div class="container">
			<h1 class="title">Roommate Questionnaire</h1>

			<form @submit.prevent="submitForm">
				<div class="mb-3" :class="{ 'has-error': !genderPreference }">
					<label>Gender preferences:</label>
					<div>
						<input type="radio" id="gender-any" value="any" v-model="genderPreference" required />
						<label for="gender-any">No preference, I am comfortable living with roommates of any gender.</label>
					</div>
					<div>
						<input type="radio" id="gender-same" value="same" v-model="genderPreference" required />
						<label for="gender-same">Prefer to live with roommates of the same gender.</label>
					</div>
					<div>
						<input type="radio" id="gender-specific" value="specific" v-model="genderPreference" required />
						<label for="gender-specific">Prefer to live with roommates of a specific gender:</label>
						<input type="text" v-model="genderPreference" placeholder="Specify gender" required />
					</div>
					<span v-if="!genderPreference" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !bedtime }">
					<label>Bedtime:</label>
					<div>
						<input type="radio" id="bedtime-before-11pm" value="before-11pm" v-model="bedtime" required />
						<label for="bedtime-before-11pm">Before 11 p.m.</label>
					</div>
					<div>
						<input type="radio" id="bedtime-between-11pm-2am" value="between-11pm-2am" v-model="bedtime" required />
						<label for="bedtime-between-11pm-2am">Between 11 p.m. and 2 a.m.</label>
					</div>
					<div>
						<input type="radio" id="bedtime-after-2am" value="after-2am" v-model="bedtime" required />
						<label for="bedtime-after-2am">After 2 a.m.</label>
					</div>
					<span v-if="!bedtime" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !tidiness }">
					<label>Tidiness:</label>
					<div>
						<input type="radio" id="tidiness-not-important" value="not-important" v-model="tidiness" required />
						<label for="tidiness-not-important">Not important - a messy room may not bother you.</label>
					</div>
					<div>
						<input type="radio" id="tidiness-somewhat-important" value="somewhat-important" v-model="tidiness" required />
						<label for="tidiness-somewhat-important">Somewhat important - in general, you may prefer a tidy and clean room but sometimes may not get around to cleaning up right away.</label>
					</div>
					<div>
						<input type="radio" id="tidiness-very-important" value="very-important" v-model="tidiness" required />
						<label for="tidiness-very-important">Very important - you may like to have everything in its place, clothes put away, and trash thrown out each day.</label>
					</div>
					<span v-if="!tidiness" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !smoking || !willingToLiveWithSmoker }">
					<label>Smoking:</label>
					<div>
						<label>Do you smoke tobacco products?</label>
						<input type="radio" id="smoking-yes" value="yes" v-model="smoking" required />
						<label for="smoking-yes">Yes</label>
						<input type="radio" id="smoking-no" value="no" v-model="smoking" required />
						<label for="smoking-no">No</label>
					</div>
					<div>
						<label>Are you willing to live with someone who smokes tobacco products?</label>
						<input type="radio" id="willing-to-live-with-smoker-yes" value="yes" v-model="willingToLiveWithSmoker" required />
						<label for="willing-to-live-with-smoker-yes">Yes</label>
						<input type="radio" id="willing-to-live-with-smoker-no" value="no" v-model="willingToLiveWithSmoker" required />
						<label for="willing-to-live-with-smoker-no">No</label>
					</div>
					<span v-if="!smoking || !willingToLiveWithSmoker" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !freeTime || !friendsVisit }">
					<label>Free time:</label>
					<div>
						<input type="radio" id="free-time-alone" value="alone" v-model="freeTime" required />
						<label for="free-time-alone">Spend it on my own.</label>
					</div>
					<div>
						<input type="radio" id="free-time-with-friends" value="with-friends" v-model="freeTime" required />
						<label for="free-time-with-friends">Spend it with one or two of my close friends.</label>
					</div>
					<div>
						<input type="radio" id="free-time-socialize" value="socialize" v-model="freeTime" required />
						<label for="free-time-socialize">Socialize with many people.</label>
					</div>
					<div>
						<label>Do you like to have friends visit you?</label>
						<input type="radio" id="friends-visit-yes" value="yes" v-model="friendsVisit" required />
						<label for="friends-visit-yes">Yes</label>
						<input type="radio" id="friends-visit-no" value="no" v-model="friendsVisit" required />
						<label for="friends-visit-no">No</label>
					</div>
					<span v-if="!freeTime || !friendsVisit" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !petsComfortable || !petsOwned }">
					<label>Pet friendly:</label>
					<div>
						<label>Are you comfortable living with pets?</label>
						<input type="radio" id="pets-comfortable-yes" value="yes" v-model="petsComfortable" required />
						<label for="pets-comfortable-yes">Yes</label>
						<input type="radio" id="pets-comfortable-no" value="no" v-model="petsComfortable" required />
						<label for="pets-comfortable-no">No</label>
					</div>
					<div>
						<label>Do you currently own any pets?</label>
						<input type="radio" id="pets-own-yes" value="yes" v-model="petsOwned" required />
						<label for="pets-own-yes">Yes (If yes, please specify what kind of pet(s) you have)</label>
						<input type="radio" id="pets-own-no" value="no" v-model="petsOwned" required />
						<label for="pets-own-no">No</label>
					</div>
					<input v-if="petsOwned === 'yes'" type="text" v-model="ownedPetsDescription" placeholder="Specify the type of pets you own" />
					<span v-if="!petsComfortable || !petsOwned" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !noiseLevel }">
					<label>Noise level:</label>
					<div>
						<input type="radio" id="noise-quiet-surroundings" value="quiet-surroundings" v-model="noiseLevel" required />
						<label for="noise-quiet-surroundings">Prefer quiet surroundings most of the time.</label>
					</div>
					<div>
						<input type="radio" id="noise-tolerate-some-noise" value="tolerate-some-noise" v-model="noiseLevel" required />
						<label for="noise-tolerate-some-noise">Can tolerate some noise during certain hours.</label>
					</div>
					<div>
						<input type="radio" id="noise-enjoy-background-noise" value="enjoy-background-noise" v-model="noiseLevel" required />
						<label for="noise-enjoy-background-noise">Enjoy having background noise or music playing often.</label>
					</div>
					<span v-if="!noiseLevel" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !cookingFrequency }">
					<label>Cooking:</label>
					<div>
						<input type="radio" id="cooking-rarely-never" value="rarely-never" v-model="cookingFrequency" required />
						<label for="cooking-rarely-never">Rarely or never.</label>
					</div>
					<div>
						<input type="radio" id="cooking-occasionally" value="occasionally" v-model="cookingFrequency" required />
						<label for="cooking-occasionally">Occasionally.</label>
					</div>
					<div>
						<input type="radio" id="cooking-frequently" value="frequently" v-model="cookingFrequency" required />
						<label for="cooking-frequently">Frequently, I enjoy cooking meals at home.</label>
					</div>
					<span v-if="!cookingFrequency" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !sharingBelongings }">
					<label>Sharing belongings:</label>
					<div>
						<input type="radio" id="sharing-belongs-yes" value="yes" v-model="sharingBelongings" required />
						<label for="sharing-belongs-yes">Yes, I'm open to sharing.</label>
					</div>
					<div>
						<input type="radio" id="sharing-belongs-no" value="no" v-model="sharingBelongings" required />
						<label for="sharing-belongs-no">No, I prefer to keep my belongings separate.</label>
					</div>
					<span v-if="!sharingBelongings" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !overnightGuests }">
					<label>Overnight guests:</label>
					<div>
						<input type="radio" id="overnight-guests-occasional" value="occasional" v-model="overnightGuests" required />
						<label for="overnight-guests-occasional">Fine with occasional overnight guests.</label>
					</div>
					<div>
						<input type="radio" id="overnight-guests-limited" value="limited" v-model="overnightGuests" required />
						<label for="overnight-guests-limited">Prefer to limit overnight guests to a few times per month.</label>
					</div>
					<div>
						<input type="radio" id="overnight-guests-not-comfortable" value="not-comfortable" v-model="overnightGuests" required />
						<label for="overnight-guests-not-comfortable">Not comfortable with overnight guests at all.</label>
					</div>
					<span v-if="!overnightGuests" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !cleaningDuties }">
					<label>Cleaning duties:</label>
					<div>
						<input type="radio" id="cleaning-duties-schedule" value="schedule" v-model="cleaningDuties" required />
						<label for="cleaning-duties-schedule">Prefer to establish a cleaning schedule and rotate tasks.</label>
					</div>
					<div>
						<input type="radio" id="cleaning-duties-fair-share" value="fair-share" v-model="cleaningDuties" required />
						<label for="cleaning-duties-fair-share">Willing to do my fair share but prefer a flexible approach.</label>
					</div>
					<div>
						<input type="radio" id="cleaning-duties-cleaning-service" value="cleaning-service" v-model="cleaningDuties" required />
						<label for="cleaning-duties-cleaning-service">Would rather hire a cleaning service to handle it.</label>
					</div>
					<span v-if="!cleaningDuties" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !workSchedule }">
					<label>Work/school schedule:</label>
					<div>
						<input type="radio" id="schedule-early" value="early" v-model="workSchedule" required />
						<label for="schedule-early">Early riser, typically out of the house by morning.</label>
					</div>
					<div>
						<input type="radio" id="schedule-standard" value="standard" v-model="workSchedule" required />
						<label for="schedule-standard">Standard 9-5 schedule.</label>
					</div>
					<div>
						<input type="radio" id="schedule-nightowl" value="nightowl" v-model="workSchedule" required />
						<label for="schedule-nightowl">Night owl, often up late working or studying.</label>
					</div>
					<span v-if="!workSchedule" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !spaceUsage }">
					<label>Shared living space usage:</label>
					<div>
						<input type="radio" id="space-rarely" value="rarely" v-model="spaceUsage" required />
						<label for="space-rarely">Rarely, I prefer to spend most of my time in my room.</label>
					</div>
					<div>
						<input type="radio" id="space-occasionally" value="occasionally" v-model="spaceUsage" required />
						<label for="space-occasionally">Occasionally, for specific events or gatherings.</label>
					</div>
					<div>
						<input type="radio" id="space-frequently" value="frequently" v-model="spaceUsage" required />
						<label for="space-frequently">Frequently, I enjoy hosting gatherings or spending time with roommates in shared spaces.</label>
					</div>
					<span v-if="!spaceUsage" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !hobbies }">
					<label>Hobbies and interests:</label>
					<div>
						<input type="radio" id="hobbies-reading" value="reading" v-model="hobbies" required />
						<label for="hobbies-reading">Reading, gaming, or other quiet indoor activities.</label>
					</div>
					<div>
						<input type="radio" id="hobbies-outdoor" value="outdoor" v-model="hobbies" required />
						<label for="hobbies-outdoor">Outdoor activities such as hiking, sports, or gardening.</label>
					</div>
					<div>
						<input type="radio" id="hobbies-creative" value="creative" v-model="hobbies" required />
						<label for="hobbies-creative">Creative pursuits like art, music, or cooking.</label>
					</div>
				</div>

				<div class="mb-3" :class="{ 'has-error': !conflictResolution }">
					<label>Conflict resolution:</label>
					<div>
						<input type="radio" id="conflict-direct" value="direct" v-model="conflictResolution" required />
						<label for="conflict-direct">Address issues directly and openly communicate to find a resolution.</label>
					</div>
					<div>
						<input type="radio" id="conflict-mediation" value="mediation" v-model="conflictResolution" required />
						<label for="conflict-mediation">Seek mediation or involve a third party if necessary.</label>
					</div>
					<div>
						<input type="radio" id="conflict-avoid" value="avoid" v-model="conflictResolution" required />
						<label for="conflict-avoid">Avoid confrontation and hope issues resolve on their own.</label>
					</div>
					<span v-if="!conflictResolution" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !billSplit }">
					<label>Bills and expenses:</label>
					<div>
						<input type="radio" id="bills-evenly" value="evenly" v-model="billSplit" required />
						<label for="bills-evenly">Divide bills evenly among all roommates.</label>
					</div>
					<div>
						<input type="radio" id="bills-usage" value="usage" v-model="billSplit" required />
						<label for="bills-usage">Allocate bills based on usage (e.g., utilities, internet).</label>
					</div>
					<div>
						<input type="radio" id="bills-separately" value="separately" v-model="billSplit" required />
						<label for="bills-separately">Handle bills separately, with each roommate responsible for specific expenses.</label>
					</div>
					<span v-if="!billSplit" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !privacyExpectation }">
					<label>Privacy boundaries:</label>
					<div>
						<input type="radio" id="privacy-respected" value="respected" v-model="privacyExpectation" required />
						<label for="privacy-respected">Prefer to have personal space respected at all times.</label>
					</div>
					<div>
						<input type="radio" id="privacy-occasional" value="occasional" v-model="privacyExpectation" required />
						<label for="privacy-occasional">Comfortable with occasional social interactions but value privacy.</label>
					</div>
					<div>
						<input type="radio" id="privacy-frequent" value="frequent" v-model="privacyExpectation" required />
						<label for="privacy-frequent">Open to frequent socializing and interactions with roommates.</label>
					</div>
					<span v-if="!privacyExpectation" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !allergiesValue }">
					<label>Allergies or sensitivities:</label>
					<div>
						<input type="radio" id="allergies-yes" value="yes" v-model="allergiesValue" required />
						<label for="allergies-yes">Yes (If yes, please specify)</label>
					</div>
					<div>
						<input type="radio" id="allergies-no" value="no" v-model="allergiesValue" required />
						<label for="allergies-no">No</label>
					</div>
					<input v-if="allergiesValue === 'yes'" type="text" v-model="allergiesDescription" placeholder="Specify allergies" />
					<span v-if="!allergiesValue" class="error-message">*</span>
				</div>

				<div class="mb-3" :class="{ 'has-error': !longTermPlans }">
					<label>Long-term plans:</label>
					<div>
						<input type="radio" id="plans-flexible" value="flexible" v-model="longTermPlans" required />
						<label for="plans-flexible">Flexible, open to adjusting based on changing circumstances.</label>
					</div>
					<div>
						<input type="radio" id="plans-stability" value="stability" v-model="longTermPlans" required />
						<label for="plans-stability">Prefer stability and long-term living arrangements.</label>
					</div>
					<div>
						<input type="radio" id="plans-moveout" value="moveout" v-model="longTermPlans" required />
						<label for="plans-moveout">Planning to move out within a specific timeframe or milestone.</label>
					</div>
					<span v-if="!longTermPlans" class="error-message">*</span>
				</div>

				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { userStore } from "../stores/userStore";
	import { toast } from "vue3-toastify";
	import { useRouter, useRoute } from "vue-router";
	import "vue3-toastify/dist/index.css";

	const route = useRoute();
	const router = useRouter();
	const userInfo = userStore();
	const ownedPetsDescription = ref("");
	const allergiesValue = ref("");
	const allergiesDescription = ref("");
	const genderPreference = ref("");
	const bedtime = ref("");
	const tidiness = ref("");
	const smoking = ref("");
	const willingToLiveWithSmoker = ref("");
	const freeTime = ref("");
	const friendsVisit = ref("");
	const petsComfortable = ref("");
	const petsOwned = ref("");
	const noiseLevel = ref("");
	const cookingFrequency = ref("");
	const sharingBelongings = ref("");
	const overnightGuests = ref("");
	const cleaningDuties = ref("");
	const workSchedule = ref("");
	const spaceUsage = ref("");
	const hobbies = ref("");
	const conflictResolution = ref("");
	const privacyExpectation = ref("");
	const billSplit = ref("");
	const allergies = {
		get value() {
			return allergiesValue.value === "yes" ? "Yes (Please specify)" : "No";
		},
		get description() {
			return allergiesDescription.value;
		},
	};
	const petPreferences = {
		get comfortable() {
			return petsComfortable.value === "yes" ? "Yes" : "No";
		},
		get owned() {
			return petsOwned.value === "yes" ? "Yes (Please specify)" : "No";
		},
		get ownedPetsDescription() {
			return ownedPetsDescription.value;
		},
	};
	const longTermPlans = ref("");
	import axios from "axios";

	function submitForm() {
		// Validate form fields
		if (
			!genderPreference.value ||
			!bedtime.value ||
			!tidiness.value ||
			!smoking.value ||
			!willingToLiveWithSmoker.value ||
			!freeTime.value ||
			!friendsVisit.value ||
			!petsComfortable.value ||
			!petsOwned.value ||
			!noiseLevel.value ||
			!cookingFrequency.value ||
			!sharingBelongings.value ||
			!overnightGuests.value ||
			!cleaningDuties.value ||
			!workSchedule.value ||
			!spaceUsage.value ||
			!hobbies.value ||
			!conflictResolution.value ||
			!privacyExpectation.value ||
			!billSplit.value ||
			!allergiesValue.value ||
			!longTermPlans.value
		) {
			return;
		}

		const preferenceData = {
			genderPreference: genderPreference.value,
			bedtime: bedtime.value,
			tidiness: tidiness.value,
			smoking: smoking.value,
			willingToLiveWithSmoker: willingToLiveWithSmoker.value,
			freeTime: freeTime.value,
			friendsVisit: friendsVisit.value,
			petsComfortable: petsComfortable.value,
			petPreferences: {
				comfortable: petPreferences.comfortable,
				owned: petPreferences.owned,
				ownedPetsDescription: petPreferences.ownedPetsDescription,
			},
			noiseLevel: noiseLevel.value,
			cookingFrequency: cookingFrequency.value,
			sharingBelongings: sharingBelongings.value,
			overnightGuests: overnightGuests.value,
			cleaningDuties: cleaningDuties.value,
			workSchedule: workSchedule.value,
			spaceUsage: spaceUsage.value,
			hobbies: hobbies.value,
			privacyExpectation: privacyExpectation.value,
			allergies: { value: allergies.value, description: allergies.description },
			longTermPlans: longTermPlans.value,
			billSplit: billSplit.value,
			conflictResolution: conflictResolution.value,
		};

		axios
			.post("/user/addPreferences", preferenceData, {
				withCredentials: true,
			})
			.then(function (response) {
				toast.success(response.data.message, {
					position: toast.POSITION.BOTTOM_RIGHT,
					theme: "colored",
				});
				userInfo.IsPreferenceFilled = true;
				router.push("/");
			})
			.catch(function (error) {
				toast.error(error.response.data.message, {
					position: toast.POSITION.BOTTOM_RIGHT,
					theme: "colored",
				});
			});
	}
</script>

<style scoped>
	.sideImg {
		width: 25rem;
		margin-top: 20rem;
		margin-bottom: 10rem;
	}
	.Holder {
		display: flex;
		flex-direction: row;
		background-color: rgba(213, 169, 248, 0.233);
	}
	.mb-3 {
		border: 1px solid #000;
		border-radius: 1%;
		padding: 15px;
	}
	.container {
		margin-top: 5rem;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		height: 95vh;
		overflow-x: hidden;
		background-color: rgb(255, 255, 255);
		border-top-left-radius: 2%;
		border-bottom-left-radius: 2%;
	}
	.title {
		margin-top: 1rem;
	}
	.btn {
		margin-bottom: 1rem;
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

	.has-error {
		border: 1px solid red;
	}

	.error-message {
		color: red;
	}
</style>
