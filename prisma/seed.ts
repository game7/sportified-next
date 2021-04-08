import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function drop(tableName: string) {
  console.log(`Dropping ${tableName}`);
  return await db.$queryRaw(`TRUNCATE ${tableName} RESTART IDENTITY CASCADE`);
}

async function dropTenants() {
  return await drop("next.tenants");
}

async function loadTenants() {
  const records = await db.$queryRaw<any[]>("SELECT * FROM public.tenants");
  for (const r of records) {
    const tenant = await db.tenant.create({
      data: {
        name: r.name,
        host: r.host,
        slug: r.slug,
      },
    });
    console.log(`Created tenant with id: ${tenant.id}`);
  }
}

async function dropPages() {
  return await drop("next.pages");
}

async function main() {
  console.log(`Start seeding ...`);
  await dropPages();
  await dropTenants();
  await loadTenants();
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
