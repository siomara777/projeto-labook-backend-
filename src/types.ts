// import { USER_ROLES } from "./models/User";

// // tipagem da tabela users
// export interface UserDB {
//     // id: string,
//     name: string,
//     email: string,
//     password: string,
//     role: USER_ROLES;
//     created_at: string
//   }
  
//   // tipagem da entidade no formato que o front-end irá receber/enviar para nossa API
//   export interface UserModel {
//     // id: string,
//     name: string,
//     email: string,
//     password: string,
//     role: USER_ROLES;
//     createdAt: string
//   }

//   export interface PostDB {
//     id: string,
//     creator_id: string,
//     content: string, 
//     creator_name: string,  
//     likes: number,
//     dislikes: number,
//     created_at: string,
//     updated_at: string,
 
//   }
//   // export interface CreatePostDB {
    
//   //   content: string,   
    
//   // }
//   export interface LikeDislikeDB {
//     user_id: string,
//     post_id: string,
//     like: number
//   }
  
//   // export interface PostModel {
//   //   id: string,
//   //   creatorId: string,
//   //   content: string,   
//   //   likes: number,
//   //   dislikes: number,
//   //   createdAt: string,
//   //   updatedAt: string
//   // }

//   export interface PostModel {
//     id: string;
//     content: string;  
//     likes: number;
//     dislikes: number;
//     createdAt: string;
//     updatedAt: string;
//     creator: {
//       id: string;
//       name: string;
//     };
//   }