-- DropIndex
DROP INDEX "Post_userId_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
