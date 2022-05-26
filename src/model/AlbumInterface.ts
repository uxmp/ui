import GenreInterface from "./GenreInterface";

export default interface AlbumInterface {

  getId(): number;

  getName(): string;

  getArtistId(): number;

  getCover(): string;

  getArtistName(): string;

  getLength(): number;

  getMbId(): string;

  getGenres(): Array<GenreInterface>
}