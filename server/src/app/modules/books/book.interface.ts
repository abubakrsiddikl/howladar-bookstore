export type IGenre =
  | "উপন্যাস"
  | "গল্প"
  | "ইসলামিক"
  | "বিজ্ঞান"
  | "ইতিহাস"
  | "জীবনী"
  | "ফ্যান্টাসি"
  | "প্রযুক্তি";

export interface IBook {
  title: string;
  author: string;
  price: number;
  stock: number;
  genre: IGenre;
  description?: string;
  coverImage: string;
  available: boolean;
}

// book filter interface
export interface IBookFilterOptions {
  search?: string;
  genre?: string;
  page?: number;
  limit?: number;
}
