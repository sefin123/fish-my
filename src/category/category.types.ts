export interface GetCategory {
  name: string;
}

export interface PostCategory {
  name: string;
}

export interface PutCategory {
  oldName: string;
  newName: string;
}

export interface DeleteCategory {
  name: string;
}
