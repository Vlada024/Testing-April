const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// Function to generate random preferences for a user
function generateRandomPreferences() {
	return {
		genderPreference: faker.helpers.arrayElement(["any", "same", "specific"]),
		bedtime: faker.helpers.arrayElement(["before-11pm", "between-11pm-2am", "after-2am"]),
		tidiness: faker.helpers.arrayElement(["not-important", "somewhat-important", "very-important"]),
		smoking: faker.helpers.arrayElement(["yes", "no"]),
		willingToLiveWithSmoker: faker.helpers.arrayElement(["yes", "no"]),
		freeTime: faker.helpers.arrayElement(["alone", "with-friends", "socialize"]),
		friendsVisit: faker.helpers.arrayElement(["yes", "no"]),
		petsComfortable: faker.helpers.arrayElement(["yes", "no"]),
		owned: faker.helpers.arrayElement(["yes", "no"]),
		noiseLevel: faker.helpers.arrayElement(["quiet-surroundings", "tolerate-some-noise", "enjoy-background-noise"]),
		cookingFrequency: faker.helpers.arrayElement(["rarely-never", "occasionally", "frequently"]),
		sharingBelongings: faker.helpers.arrayElement(["yes", "no"]),
		overnightGuests: faker.helpers.arrayElement(["occasional", "limited", "not-comfortable"]),
		cleaningDuties: faker.helpers.arrayElement(["schedule", "fair-share", "cleaning-service"]),
		workSchedule: faker.helpers.arrayElement(["early", "standard", "nightowl"]),
		spaceUsage: faker.helpers.arrayElement(["rarely", "occasionally", "frequently"]),
		hobbies: faker.helpers.arrayElement(["reading", "outdoor", "creative"]),
		privacyExpectation: faker.helpers.arrayElement(["respected", "occasional", "frequent"]),
		allergiesValue: faker.helpers.arrayElement(["yes", "no"]),
		longTermPlans: faker.helpers.arrayElement(["flexible", "stability", "moveout"]),
		comfortable: faker.helpers.arrayElement(["yes", "no"]),
		ownedPetsDescription: " ",
		allergiesDescription: " ",
		billSplit: faker.helpers.arrayElement(["evenly", "usage", "separately"]),
		conflictResolution: faker.helpers.arrayElement(["direct", "mediation", "avoid"]),
	};
}

// Function to create a user with random preferences
async function createUserWithPreferences() {
	const preferences = generateRandomPreferences();
	const user = await prisma.user.create({
		data: {
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: "$2b$10$t9ZiV/XTwl67Ou9ToQn9XOTntDNO.GPQV43.WFamADHC/rNLdu8Ia",
			desc: faker.lorem.sentence(),
			aboutMe: faker.lorem.paragraph(),
			type: "Roomie",
			phoneNumber: faker.phone.number(),
			admin: false,
			profilePicture: faker.helpers.arrayElement(["1", "2", "3", "4", "5", "6", "7", "8", "9"]) + ".png",
			PreferenceFilled: true,
			Preference: {
				create: preferences,
			},
		},
	});
	console.log("User created:", user);
}

async function createMultipleUsersWithPreferences(count) {
	for (let i = 0; i < count; i++) {
		await createUserWithPreferences();
	}
}

// Create 30 users with random preferences
createMultipleUsersWithPreferences(50)
	.catch((err) => {
		console.error("Error creating users:", err);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
