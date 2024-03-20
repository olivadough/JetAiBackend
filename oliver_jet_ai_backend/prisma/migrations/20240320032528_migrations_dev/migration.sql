-- CreateTable
CREATE TABLE "Planes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "wingspan" REAL NOT NULL,
    "engines" INTEGER NOT NULL,
    "year" INTEGER NOT NULL
);
