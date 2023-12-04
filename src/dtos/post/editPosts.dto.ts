
import z from "zod";

export interface EditPostInputDTO {
  content: string;
  token: string;
  id: string;
}

export type  EditPostOutputDTO = undefined;


export const EditPostSchema = z
  .object({
    content: z.string().min(2),
    token: z.string().min(2),
    id: z.string().min(1),
  })
  .transform((data) => data as EditPostInputDTO);