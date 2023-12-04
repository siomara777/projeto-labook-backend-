-- Active: 1700920476592@@127.0.0.1@3306

CREATE TABLE users (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, role, created_at)
VALUES
('u001', 'Reynaldo', 'rey@gmail.com', 'rey778855', 'ADM', '2023-11-19T22:29:21.941Z' ),
('u002', 'Rony', 'rony@gmail.com', 'roy778855', 'Gerente', '2023-11-19T23:29:21.941Z' ),
('u003', 'Roberlan', 'rober@gmail.com', 'roberl778855', 'Funcionario', '2023-11-19T23:39:21.941Z' );


CREATE TABLE posts (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL, 
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);



INSERT INTO posts (id, creator_id, content, likes, dislikes, created_at, updated_at)
VALUES
('p001', 'u001', 'Conteúdo do post 1', 0, 0, '2023-11-16T09:00:0.000Z', '2023-11-16T09:00:0.000Z'),
(
  'p002',
  'u001',
  'Conteúdo do post 2',  
  0,
  0,
  '2023-11-16T10:00:0.000Z',
  '2023-11-16T10:07:0.000Z'
),
(
  'p003',
  'u002',
  'Conteúdo do post 3',  
  0,
  0,
  '2023-11-16T11:00:0.000Z',
  '2023-11-16T11:07:0.000Z'
);

CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
('u001', 'p001', 2),  -- Usuário 'u001' deu 2 like no post 'p001'
('u002', 'p001', 1),  -- Usuário 'u002' deu um dislike no post 'p001'
('u003', 'p002', 1);  -- Usuário 'u003' deu um like no post 'p002'


SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;


DROP TABLE posts;


UPDATE postss
SET likes = 3
WHERE id = 'p002';

UPDATE postss
SET dislikes = 2
WHERE id = 'p002';







