import { PrismaClient } from "@prisma/client";
import { ReportStatus } from "../../src/types";

const prisma = new PrismaClient();

async function main() {
  const reports = [
    {
      title: "Ocean Trash",
      location: "Trenggalek, East Java",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/reports/b1bb2e01-7757-4a13-9e41-32672aeb36af/1741137616568_qczw902m1p_ocean_trash.jpg",
      status: ReportStatus.WAITING,
      userId: "b1bb2e01-7757-4a13-9e41-32672aeb36af",
    },
    {
      title: "Ocean Trash",
      location: "Trenggalek, East Java",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/reports/b1bb2e01-7757-4a13-9e41-32672aeb36af/1741137616568_qczw902m1p_ocean_trash.jpg",
      status: ReportStatus.VERIFIED,
      userId: "b1bb2e01-7757-4a13-9e41-32672aeb36af",
    },
    {
      title: "Ocean Trash",
      location: "Trenggalek, East Java",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/reports/b1bb2e01-7757-4a13-9e41-32672aeb36af/1741137616568_qczw902m1p_ocean_trash.jpg",
      status: ReportStatus.INVALID,
      userId: "b1bb2e01-7757-4a13-9e41-32672aeb36af",
    },
    {
      title: "Ocean Trash",
      location: "Trenggalek, East Java",
      description: "Ocean Trash Trash Trash",
      media:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/reports/b1bb2e01-7757-4a13-9e41-32672aeb36af/1741137616568_qczw902m1p_ocean_trash.jpg",
      status: ReportStatus.RESOLVED,
      userId: "b1bb2e01-7757-4a13-9e41-32672aeb36af",
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
