import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const events = [
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/events/coral_conser.jpg",
      title: "Coastal Cleanup Day",
      description:
        "Join us in removing plastic waste and debris from our shores!",
      date: "March, 25 2025",
      location: "Bali, Indonesia",
    },
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/events/coral_conser.jpg",
      title: "Coral Reef Restoration",
      description:
        "Help restore damaged coral reefs and protect marine biodiversity.",
      date: "March, 28 2025",
      location: "Raja Ampat, Indonesia",
    },
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/events/coral_conser.jpg",
      title: "Marine Wildlife Protection Talk",
      description:
        "Learn about marine conservation and efforts to protect sea life.",
      date: "March, 30 2025",
      location: "Jakarta, Indonesia",
    },
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/events/coral_conser.jpg",
      title: "Sustainable Fishing Workshop",
      description:
        "A workshop on sustainable fishing practices to protect ocean life.",
      date: "April, 03 2025",
      location: "Surabaya, Indonesia",
    },
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/events/coral_conser.jpg",
      title: "Beach Waste Art Exhibition",
      description:
        "An exhibition showcasing creative artworks made from beach waste.",
      date: "April, 11 2025",
      location: "Yogyakarta, Indonesia",
    },
  ];

  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
  }

  console.log("Events seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
