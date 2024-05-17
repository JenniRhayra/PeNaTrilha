-- CreateTable
CREATE TABLE "AdminSW" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminSW_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminSW" ADD CONSTRAINT "AdminSW_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
