import { LikeDislikeDB, PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"  


public findPost = async (): Promise<PostDB[]> => {
  const result: PostDB[] = await BaseDatabase
   .connection(PostDatabase.TABLE_POSTS)
    .select()

  return result
}

public findPostById = async (id: string): Promise<PostDB | undefined> => {
  const [result]: PostDB[] = await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .select()
    .where({ id })

  return result
}

public findLikeOrDislike = async (
  userId: string,
  postId: string
): Promise<LikeDislikeDB | undefined> => {
  const [result]: LikeDislikeDB[] = await BaseDatabase
    .connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .select()
    .where({
      user_id: userId,
      post_id: postId
    })

  return result
}

public createLikeDislike = async (
  userId: string,
  postId: string,
  like: number
): Promise<void> => {
  await BaseDatabase
    .connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .insert({
      user_id: userId,
      post_id: postId,
      like
    })
}

public updateLikes = async (
  postId: string,
  likes: number
): Promise<void> => {
  await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .update({ likes })
    .where({ id: postId })
}

public updateDislikes = async (
  postId: string,
  dislikes: number
): Promise<void> => {
  await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .update({ dislikes })
    .where({ id: postId })
}

public removeLikeDislike = async (
  postId: string,
  userId: string
): Promise<void> => {
  await BaseDatabase
    .connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .delete()
    .where({
     post_Id: postId,
      user_id: userId
    })
}

public updateLikeDislike = async (
  postId: string,
  userId: string,
  like: number
): Promise<void> => {
  await BaseDatabase
    .connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .update({
      like
    })
    .where({
     post_Id: postId,
      user_id: userId
    })
}
}


