-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `aboutMe` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `profilePicture` VARCHAR(191) NOT NULL,
    `PreferenceFilled` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` VARCHAR(191) NOT NULL,
    `MatchedId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Chat_id_key`(`id`),
    UNIQUE INDEX `Chat_MatchedId_key`(`MatchedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matched` (
    `id` VARCHAR(191) NOT NULL,
    `MatchRequestedBy` VARCHAR(191) NOT NULL,
    `RequestedByName` VARCHAR(191) NOT NULL,
    `RequestedToName` VARCHAR(191) NULL,
    `RequestedByMatchPercentage` VARCHAR(191) NOT NULL,
    `MatchRequestTo` VARCHAR(191) NOT NULL,
    `ApprovedRequest` BOOLEAN NOT NULL,
    `RejectedRequest` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Apartment` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `smallDescription` VARCHAR(191) NOT NULL,
    `fullDescription` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `genderPreference` VARCHAR(191) NOT NULL,
    `bedtime` VARCHAR(191) NOT NULL,
    `tidiness` VARCHAR(191) NOT NULL,
    `smoking` VARCHAR(191) NOT NULL,
    `willingToLiveWithSmoker` VARCHAR(191) NOT NULL,
    `freeTime` VARCHAR(191) NOT NULL,
    `friendsVisit` VARCHAR(191) NOT NULL,
    `petsComfortable` VARCHAR(191) NOT NULL,
    `comfortable` VARCHAR(191) NOT NULL,
    `owned` VARCHAR(191) NOT NULL,
    `ownedPetsDescription` VARCHAR(191) NOT NULL,
    `noiseLevel` VARCHAR(191) NOT NULL,
    `cookingFrequency` VARCHAR(191) NOT NULL,
    `sharingBelongings` VARCHAR(191) NOT NULL,
    `overnightGuests` VARCHAR(191) NOT NULL,
    `cleaningDuties` VARCHAR(191) NOT NULL,
    `workSchedule` VARCHAR(191) NOT NULL,
    `spaceUsage` VARCHAR(191) NOT NULL,
    `hobbies` VARCHAR(191) NOT NULL,
    `privacyExpectation` VARCHAR(191) NOT NULL,
    `allergiesValue` VARCHAR(191) NOT NULL,
    `allergiesDescription` VARCHAR(191) NOT NULL,
    `longTermPlans` VARCHAR(191) NOT NULL,
    `billSplit` VARCHAR(191) NOT NULL,
    `conflictResolution` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Preference_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChatToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChatToUser_AB_unique`(`A`, `B`),
    INDEX `_ChatToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_MatchedId_fkey` FOREIGN KEY (`MatchedId`) REFERENCES `Matched`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matched` ADD CONSTRAINT `Matched_MatchRequestedBy_fkey` FOREIGN KEY (`MatchRequestedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Apartment` ADD CONSTRAINT `Apartment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preference` ADD CONSTRAINT `Preference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatToUser` ADD CONSTRAINT `_ChatToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatToUser` ADD CONSTRAINT `_ChatToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
