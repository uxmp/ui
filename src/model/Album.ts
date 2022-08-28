import { Type } from "class-transformer";
import AlbumInterface from "./AlbumInterface";
import Genre from "./Genre";
import GenreInterface from "./GenreInterface";
import 'reflect-metadata';

export default class Album implements AlbumInterface {
  private id: number = 0;
  private name: string = '';
  private artistId: number = 0;
  private cover: string = '';
  private artistName: string = '';
  private length: number = 0;
  private mbId: string = '';
  private year: null | number = null;

  @Type(() => Genre)
  private genres: Array<GenreInterface> = []

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getArtistId(): number {
    return this.artistId;
  }

  getCover(): string {
    return this.cover;
  }

  getArtistName(): string {
    return this.artistName;
  }

  getLength(): number {
    return this.length;
  }

  getMbId(): string {
    return this.mbId;
  }

  getGenres(): Array<GenreInterface> {
    return this.genres
  }

  getYear(): number | null {
    return this.year;
  }
}