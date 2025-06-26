export interface IBook {
  title: string;
  author: string;
  genre: string;
  price: number;
  stock: number;
  coverImage: string;
}

// book filter interface
export interface IBookFilterOptions {
  search?: string;
  genre?: string;
  page?: number;
  limit?: number;
}
