import z from 'zod'


export interface DeletePostInputDTO  {

   idToDelete: string,
   token: string;
       
}

export type DeletePostOutputDTO = undefined  

export const DeletePostSchema = z.object({
  token: z.string().min(2),
  idToDelete: z.string().min(4),
    
});
