import { Book } from "../types";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books/`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}

export async function fetchBookById(id: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch book with id ${id}`);
  }
  return response.json();
}

export async function fetchBooksByGenre(genre: string): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books/?genre=${genre}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch books with genre ${genre}`);
  }
  return response.json();
}

export async function fetchRecommendations(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books/recommendations/`);
  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }
  return response.json();
}

export async function searchBooks(query: string): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books/search/?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Failed to search books with query ${query}`);
  }
  return response.json();
}