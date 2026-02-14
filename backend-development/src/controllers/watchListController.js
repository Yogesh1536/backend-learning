import { prisma } from "../config/db.js";

const addToWatchList = async(req, res) => {
  const {movieId, status, rating, notes} = req.body;

  const movie = await prisma.movie.findUnique({
    where: {id: movieId},
  });

  if(!movie) {
    return res.status(404).json({error: "Movie not found"})
  }

  const isAlreadyExist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId
      }
    }
  })

  if(isAlreadyExist) {
    return res.status(400).json({error: "Movie already exist"})
  }

  const watchListItem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes
    }
  })

  res.status(200).json({
    data: {
      status: "Success",
      watchListItem
    }
  })
}


const removeWatchList = async(req, res) => {

  const movieId = req.params.id;

  const watchListItem = await prisma.watchListItem.findUnique({
    where: {
      id: movieId
    }
  })

  if(!watchListItem) { return res.status(401).json({error: "Movie not found in WatchListItem"})}

  if(watchListItem !== movieId) {
    return res.status(403).json({error: "unAuthorized"})
  }

  await prisma.watchlistItem.delete({ where: {id: movieId} })

  res.status(200).json({
    status: "succes",
    message: "Movie removed from watchlist"
  })

}

export { addToWatchList, removeWatchList }