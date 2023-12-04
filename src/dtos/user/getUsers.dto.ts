import z from "zod"
import { UserModel } from "../../models/User"

export interface GetUsersInputDTO {
  q: string,
  token: string
}

export type GetUsersOutputDTO = UserModel[]

export const GetUsersSchema = z.object({
  token: z.string({
    required_error: "'Token' é obrigatório",
    invalid_type_error: "'Token' deve ser do tipo string"
  }).min(3)
}).transform(data => data as GetUsersInputDTO)