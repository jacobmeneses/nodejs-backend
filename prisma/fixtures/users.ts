const hashedPassword = '$2a$12$OSZqHSfgnQtu.6g.Bjghy.xHwoLGTYpg.F74ZqHYmmkcBWPrEcjsO'; // 123456789

const users = [
  {
    id: 1,
    email: 'j@example.com',
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: 'v@example.com',
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default users;
