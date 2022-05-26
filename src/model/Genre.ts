import GenreInterface from "./GenreInterface";

export default class Genre implements GenreInterface {
  private id: number = 0;
  private title: string = '';

  getId(): number {
    return this.id
  }

  getTitle(): string {
    return this.title
  }
}