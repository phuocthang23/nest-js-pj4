export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  status: number;
  // roleId: number;
};

export type LoginUser = {
  email: string;
  password: string;
};
