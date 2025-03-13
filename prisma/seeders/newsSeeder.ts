import { PrismaClient } from "@prisma/client";
import { Category } from "../../src/types";

const prisma = new PrismaClient();

async function main() {
  const newsData = [
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/news/conservation.jpeg",
      title: "The Devastating Effects of Ocean Plastic Pollution",
      description:
        "How plastic waste is endangering marine life and ecosystems.",
      author: "Abil",
      content:
        "Plastic pollution in the ocean has reached critical levels, endangering marine biodiversity and disrupting the natural balance of ecosystems. Millions of tons of plastic waste enter the ocean each year, leading to severe consequences for marine life. Many species, from sea turtles to whales, mistakenly ingest plastic, which can cause internal injuries, blockages, and ultimately death. Furthermore, microplastics have infiltrated the marine food chain, posing significant risks to both aquatic life and human health. Urgent action is needed to combat this crisis through stricter regulations, enhanced recycling programs, and innovative cleanup initiatives.",
      category: Category.ENVIRONMENT,
    },
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/news/conservation.jpeg",
      title: "Volunteers Unite to Clean Up Coastal Areas",
      description:
        "Community-driven efforts to remove plastic waste from beaches and oceans.",
      author: "Abil",
      content:
        "Across the globe, volunteer groups are taking action to clean up coastal areas plagued by plastic pollution. These dedicated individuals participate in organized beach cleanups, removing tons of plastic waste that would otherwise harm marine life. Many initiatives also focus on educating local communities about the dangers of single-use plastics and promoting sustainable alternatives. Through these collective efforts, volunteers are making a significant impact in preserving marine ecosystems and preventing further damage to ocean habitats. These initiatives highlight the importance of grassroots movements in addressing global environmental challenges.",
      category: Category.CONSERVATION,
    },
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/news/conservation.jpeg",
      title: "Protecting Coral Reefs: A Global Conservation Mission",
      description:
        "Efforts to restore and safeguard coral reefs against climate change and pollution.",
      author: "Abil",
      content:
        "Coral reefs, often referred to as the 'rainforests of the sea,' are facing unprecedented threats due to climate change, ocean acidification, and pollution. Conservation organizations worldwide are implementing restoration projects, including coral farming and transplantation, to rehabilitate damaged reefs. Innovative solutions, such as artificial reefs and marine protected areas, are also being employed to help ecosystems recover. Public awareness campaigns and sustainable tourism practices play a crucial role in reducing human impact on these fragile environments. Protecting coral reefs is essential for maintaining marine biodiversity and ensuring the survival of countless marine species.",
      category: Category.CONSERVATION,
    },
    {
      image:
        "https://qdtfpohyfsqvunddzoge.supabase.co/storage/v1/object/public/media/news/conservation.jpeg",
      title: "Innovative Technologies for Ocean Cleanup",
      description:
        "How science and technology are revolutionizing the fight against marine pollution.",
      author: "Abil",
      content:
        "Advancements in technology are playing a key role in tackling marine pollution. New ocean cleanup systems, such as autonomous drones and floating barriers, have been developed to collect plastic waste from the sea efficiently. Research is also being conducted on biodegradable plastics to replace traditional materials that contribute to long-lasting pollution. Additionally, artificial intelligence and satellite monitoring are being used to track pollution hotspots and optimize cleanup strategies. These cutting-edge solutions, combined with global policy efforts, offer hope for a cleaner, healthier ocean in the future.",
      category: Category.RESEARCH,
    },
  ];

  for (const news of newsData) {
    await prisma.news.create({
      data: news,
    });
  }

  console.log("News seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
