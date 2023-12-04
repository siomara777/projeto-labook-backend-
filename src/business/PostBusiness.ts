import { PostDatabase } from "../database/PostDatabase";
import {  CreatePostInputDTO,  CreatePostOutputDTO,} from "../dtos/post/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPosts.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dto";
import { LikeOrDislikeInputDTO, LikeOrDislikeOutputDTO } from "../dtos/post/likeOrDislike.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { LikeDislikeDB, POST_LIKE, Post } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/ToKenManager";


export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
    
    ) {}  

    public getPosts = async (
      input: GetPostInputDTO
    ): Promise<GetPostOutputDTO> => {
      const { token } = input;
  
      const payload = this.tokenManager.getPayload(token);
  
      if (!payload) {
        throw new BadRequestError("Token inválido");
      }
  
      const postDBWithCreatorName =
        await this.postDatabase.findPostsWithCreatorName();
  
      const postModel = postDBWithCreatorName.map((postWithCreatorName) => {
        const post = new Post(
          postWithCreatorName.id,
          postWithCreatorName.content,
          postWithCreatorName.likes,
          postWithCreatorName.dislikes,
          postWithCreatorName.created_at,
          postWithCreatorName.updated_at,
          postWithCreatorName.creator_id,
          postWithCreatorName.creator_name
        );
  
        return post.toBusinissModel();
      });
  
      const response: GetPostOutputDTO = postModel;
  
      return response;
    };
  public createPosts = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const {  content, token } =
      input;

    const payload = this.tokenManager.getPayload(token)

    if(payload === null) {
      throw new BadRequestError("Token invalido")
    }

    const id = this.idGenerator.generate();

    const post = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    );
    const postDB = post.toDBModel()
      
    await this.postDatabase.insertPost(postDB);

    const output: CreatePostOutputDTO = undefined     
    
    return output;
  };

  public editPosts = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { id, content, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const postDB = await this.postDatabase.findPostById(id);

    if (!postDB) {
      throw new NotFoundError("'id' não encontrado");

    }

    if (payload.id !== postDB.creator_id) {
      throw new BadRequestError("somente quem criou o post pode edita-lo");
    }

    const post = new Post(
      postDB.id,      
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      postDB.creator_id,
      payload.name
    );

   
    post.setContent(content);

    const updatePostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatePostDB);

    const response: EditPostOutputDTO = undefined;

    return response;
  };
  
  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { token, idToDelete } = input;
  
    const payload = this.tokenManager.getPayload(token);
  
    if (!payload) {
      throw new BadRequestError("post com esse id não existe");
    }  
    const playlistDB = await this.postDatabase.findPostById(idToDelete);

    if (!playlistDB) {
      throw new NotFoundError("playlist com essa id não existe");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== playlistDB.creator_id) {
        throw new BadRequestError("somente quem criou a post pode apagar");
      }
    }

    await this.postDatabase.deletePost(idToDelete);

    const output: DeletePostOutputDTO = undefined;

    return output;
  };

  public likeOrDislike = async (
        input: LikeOrDislikeInputDTO
      ): Promise<LikeOrDislikeOutputDTO> => {
        const { postId, like, token } = input  
 

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("token não existe");
    }

    const postDBWithCreatorName =
      await this.postDatabase.findPostWithCreatorNameById(postId);

    if (!postDBWithCreatorName) {
      throw new NotFoundError("post com essa id não existe");
    }

    const post = new Post(
      postDBWithCreatorName.id,
      postDBWithCreatorName.content,
      postDBWithCreatorName.likes,
      postDBWithCreatorName.dislikes,
      postDBWithCreatorName.created_at,
      postDBWithCreatorName.updated_at,
      postDBWithCreatorName.creator_id,
      postDBWithCreatorName.creator_name
    );

    const likeSQlite = like ? 1 : 0;

    const likeDislikeDB: LikeDislikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: likeSQlite,
    };

    const likeDislikeExists = await this.postDatabase.findLikeDislike(
      likeDislikeDB
    );

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB);
        post.removeLike();
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB);
        post.removeLike();
        post.addDislike();
      }
    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postDatabase.removeLikeDislike(likeDislikeDB);
        post.removeDislike();
      } else {
        await this.postDatabase.updateLikeDislike(likeDislikeDB);
        post.removeDislike();
        post.addLike();
      }
    } else {
      await this.postDatabase.insertLikeDislike(likeDislikeDB);
      like ? post.addLike() : post.addDislike();
    }

    const updatedPostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatedPostDB);

    const output: LikeOrDislikeOutputDTO = undefined;

    return output;
  };
}