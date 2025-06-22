export interface IBook {
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  coverImage: string;
}

// book filter interface
export interface IBookFilterOptions {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}
