/*
  Warnings:

  - You are about to drop the `Idea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Idea`;

-- CreateTable
CREATE TABLE `ideas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` VARCHAR(191) NOT NULL,
    `improvement` VARCHAR(191) NOT NULL,
    `currentProcess` VARCHAR(191) NOT NULL,
    `proposedChange` VARCHAR(191) NOT NULL,
    `expectedBenefit` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
