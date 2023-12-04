import z from "zod"
import { PostModel } from "../../models/Post"

export interface GetPostInputDTO {
  q: string
  token: string
}

export type GetPostOutputDTO = PostModel[] 

export const GetPostSchema = z.object({
  token: z.string({
    required_error: "'Token' é obrigatório",
    invalid_type_error: "'Token' deve ser do tipo string"
  }).min(3)
}).transform(data => data as GetPostInputDTO)