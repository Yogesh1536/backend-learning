import { PrismaClient } from "@prisma/client";
import Logger from "../src/logger.js";

const logger = new Logger("seed")

const prisma = new PrismaClient();

const userId = "7bcf7bc2-e717-4d4b-b457-5f10e43748f4"

const movies = [
  {
    title: "Inception",
    overview: "A skilled thief enters dreams to steal secrets and is given a chance to erase his criminal past.",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Thriller", "Action"],
    runtime: 148,
    porsterUrl: "https://image.tmdb.org/t/p/w500/inception.jpg",
    createdBy: userId
  },
  {
    title: "Interstellar",
    overview: "A team of astronauts travel through a wormhole in search of a new home for humanity.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    runtime: 169,
    porsterUrl: "https://image.tmdb.org/t/p/w500/interstellar.jpg",
    createdBy: userId
  },
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    porsterUrl: "https://image.tmdb.org/t/p/w500/dark_knight.jpg",
    createdBy: userId
  },
  {
    title: "Forrest Gump",
    overview: "The life journey of a kind-hearted man who unknowingly influences historical events.",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    runtime: 142,
    porsterUrl: "https://image.tmdb.org/t/p/w500/forrest_gump.jpg",
    createdBy: userId
  },
  {
    title: "The Matrix",
    overview: "A hacker discovers the reality he lives in is a simulated world controlled by machines.",
    releaseYear: 1999,
    genres: ["Sci-Fi", "Action"],
    runtime: 136,
    porsterUrl: "https://image.tmdb.org/t/p/w500/matrix.jpg",
    createdBy: userId
  },
  {
    title: "Gladiator",
    overview: "A betrayed Roman general seeks revenge against the corrupt emperor who killed his family.",
    releaseYear: 2000,
    genres: ["Action", "Drama", "Adventure"],
    runtime: 155,
    porsterUrl: "https://image.tmdb.org/t/p/w500/gladiator.jpg",
    createdBy: userId
  },
  {
    title: "Avengers: Endgame",
    overview: "The Avengers assemble once more to reverse the devastation caused by Thanos.",
    releaseYear: 2019,
    genres: ["Action", "Sci-Fi", "Adventure"],
    runtime: 181,
    porsterUrl: "https://image.tmdb.org/t/p/w500/endgame.jpg",
    createdBy: userId
  },
  {
    title: "Titanic",
    overview: "A love story unfolds aboard the ill-fated RMS Titanic.",
    releaseYear: 1997,
    genres: ["Drama", "Romance"],
    runtime: 195,
    porsterUrl: "https://image.tmdb.org/t/p/w500/titanic.jpg",
    createdBy: userId
  },
  {
    title: "Joker",
    overview: "A troubled comedian descends into madness and becomes Gotham’s infamous villain.",
    releaseYear: 2019,
    genres: ["Crime", "Drama", "Thriller"],
    runtime: 122,
    porsterUrl: "https://image.tmdb.org/t/p/w500/joker.jpg",
    createdBy: userId
  },
  {
    title: "Parasite",
    overview: "A poor family schemes to infiltrate a wealthy household with unexpected consequences.",
    releaseYear: 2019,
    genres: ["Thriller", "Drama"],
    runtime: 132,
    porsterUrl: "https://image.tmdb.org/t/p/w500/parasite.jpg",
    createdBy: userId
  }
];

const main = async () => {
  logger.log("Seeding movies...")

  for (const movie of movies) {
    const created = await prisma.movie.create({
      data: movie
    })
    logger.log(`Created Movie: ${created.title}`)
  }

  logger.log("Seeding completed!");
};

main().catch((err) => {
  logger.error(err)
  process.exit(1)
}).finally(async()=> {
  await prisma.$disconnect()
})
