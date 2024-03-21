const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
    const newPlane = await prisma.planes.create({
      data: {
        name: 'examplePlane',
        wingspan: 1,
        engines: 1,
        year: 1
      },
    })
    console.log("Plane Created:", newPlane)
  }

async function main2() {
  const users = await prisma.planes.findMany()
    console.log("All Users:",users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

main2()
.then(async () => {
await prisma.$disconnect()
})
.catch(async (e) => {
console.error(e)
await prisma.$disconnect()
process.exit(1)
})