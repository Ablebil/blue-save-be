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
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/reports/8a01f8cb-3598-469b-9c70-cc68b4d75c11/1741855541586_u49lafq81ml_ocean_trash.jpg",
      status: ReportStatus.WAITING,
      userId: "8a01f8cb-3598-469b-9c70-cc68b4d75c11",
    },
    {
      title: "Ocean Trash",
      street: "Jalan Ahmad Yani",
      province: "East Java",
      country: "Indonesia",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/reports/8a01f8cb-3598-469b-9c70-cc68b4d75c11/1741855541586_u49lafq81ml_ocean_trash.jpg",
      status: ReportStatus.VERIFIED,
      userId: "8a01f8cb-3598-469b-9c70-cc68b4d75c11",
    },
    {
      title: "Ocean Trash",
      street: "Jalan Ahmad Yani",
      province: "East Java",
      country: "Indonesia",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/reports/8a01f8cb-3598-469b-9c70-cc68b4d75c11/1741855541586_u49lafq81ml_ocean_trash.jpg",
      status: ReportStatus.INVALID,
      userId: "8a01f8cb-3598-469b-9c70-cc68b4d75c11",
    },
    {
      title: "Ocean Trash",
      street: "Jalan Ahmad Yani",
      province: "East Java",
      country: "Indonesia",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/reports/8a01f8cb-3598-469b-9c70-cc68b4d75c11/1741855541586_u49lafq81ml_ocean_trash.jpg",
      status: ReportStatus.RESOLVED,
      userId: "8a01f8cb-3598-469b-9c70-cc68b4d75c11",
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
