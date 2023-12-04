import express from 'express'
import { PostController } from '../controller/PostController'
import { PostBusiness } from '../business/PostBusiness'
import { PostDatabase } from '../database/PostDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/ToKenManager'


export const postRouter = express.Router()

const postController = new PostController(

    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager
    )
)
postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPosts)
postRouter.put("/:id", postController.editPosts) 
postRouter.delete("/:id", postController.deletePosts)

postRouter.put("/:id/like", postController.likeOrDislikePost)


