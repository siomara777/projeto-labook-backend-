import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";
import { CreatePostSchema } from "../dtos/post/createPost.dto";
import { ZodError } from "zod";
import { EditPostSchema } from "../dtos/post/editPosts.dto";
import { GetPostSchema } from "../dtos/post/getPost.dto";
import { DeletePostSchema } from "../dtos/post/deletePost.dto";
import { LikeOrDislikeSchema } from "../dtos/post/likeOrDislike.dto";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPostSchema.parse ({
        q: req.query.q as string | undefined,
        token:req.headers.authorization

      })      
      
      const response = await this.postBusiness.getPosts(input);

      res.status(200).send(response);
    } catch (error) {
      console.error(error);

      if(error instanceof ZodError)
      res.status(400).send(error.issues)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); 
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createPosts = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        
        content: req.body.content,
        token: req.headers.authorization,
      });

      const newPost = await this.postBusiness.createPosts(input);

      res.status(201).send(newPost);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
        
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public editPosts = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        token: req.headers.authorization,
        id: req.params.id,
        content: req.body.content,
      });

      const newPost = await this.postBusiness.editPosts(input);

      res.status(200).send( newPost);
    } catch (error) {
      console.error(error);

      if (error instanceof ZodError)
      res.status(400).send(error.issues);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deletePosts = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse ({
        token: req.headers.authorization,
        idToDelete: req.params.id,
      })          
 
      const newPost = await this.postBusiness.deletePost(input);

      res.status(200).send(newPost);
    } catch (error) {
      console.error(error);

      if(error instanceof ZodError)
      res.status(400).send(error.issues)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message); //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  
  public likeOrDislikePost = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikeSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
        like: req.body.like,
      });

      const output = await this.postBusiness.likeOrDislike(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}