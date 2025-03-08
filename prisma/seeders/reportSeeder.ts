import { PrismaClient } from "@prisma/client";
import { ReportStatus } from "../../src/types";

const prisma = new PrismaClient();

async function main() {
  const reports = [
    {
      title: "Ocean Trash",
      street: "Jalan Ahmad Yani",
      province: "East Java",
      country: "Indonesia",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/reports/a08e1d5f-f50d-4e23-9aca-15af3ad28fc9/1741420519260_7a6112227td_ocean_trash.jpg",
      status: ReportStatus.WAITING,
      userId: "a08e1d5f-f50d-4e23-9aca-15af3ad28fc9",
    },
    {
      title: "Ocean Trash",
      street: "Jalan Ahmad Yani",
      province: "East Java",
      country: "Indonesia",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/reports/a08e1d5f-f50d-4e23-9aca-15af3ad28fc9/1741420519260_7a6112227td_ocean_trash.jpg",
      status: ReportStatus.VERIFIED,
      userId: "a08e1d5f-f50d-4e23-9aca-15af3ad28fc9",
    },
    {
      title: "Ocean Trash",
      street: "Jalan Ahmad Yani",
      province: "East Java",
      country: "Indonesia",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/reports/a08e1d5f-f50d-4e23-9aca-15af3ad28fc9/1741420519260_7a6112227td_ocean_trash.jpg",
      status: ReportStatus.INVALID,
      userId: "a08e1d5f-f50d-4e23-9aca-15af3ad28fc9",
    },
    {
      title: "Ocean Trash",
      street: "Jalan Ahmad Yani",
      province: "East Java",
      country: "Indonesia",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/reports/a08e1d5f-f50d-4e23-9aca-15af3ad28fc9/1741420519260_7a6112227td_ocean_trash.jpg",
      status: ReportStatus.RESOLVED,
      userId: "a08e1d5f-f50d-4e23-9aca-15af3ad28fc9",
    },
  ];

  for (const report of reports) {
    await prisma.report.create({
      data: report,
    });
  }

  console.log("Reports seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
