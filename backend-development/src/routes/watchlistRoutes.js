import express from "express";
import { addToWatchList,  removeWatchList} from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const  router = express.Router()

router.use(authMiddleware)

router.post("/", addToWatchList)
router.post("/", removeWatchList)

export default router;