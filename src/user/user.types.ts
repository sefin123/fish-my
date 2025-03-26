export interface GetUser {
  name: string;
}

export interface PostUser {
  email: string;
  name: string;
  password: string;
}

export interface PutUser {
  oldName: string;
  newName: string;
}

export interface DeleteUser {
  id: number;
}
