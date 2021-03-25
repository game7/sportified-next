import { PrismaClient, Prisma } from "@prisma/client";

const db = new PrismaClient();

const tenants: Prisma.TenantCreateInput[] = [
  {
    name: "Big Blades Hockey Arena",
    host: "bigblades.com",
    slug: "bigblades",
  },
  {
    name: "Pigskin Youth Football Association",
    host: "pyha.com",
    slug: "pyha",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const data of tenants) {
    const tenant = await db.tenant.create({
      data,
    });
    console.log(`Created tenant with id: ${tenant.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
