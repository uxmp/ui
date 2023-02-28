export default interface SongListItemInterface {

  getId(): number;

  getName(): string;

  getTracknumber(): number;

  getPlayUrl(): string;

  getArtistName(): string;

  getAlbumName(): string;

  setCover(cover: string);

  getCover(): string;

  getArtistId(): number;

  getAlbumId(): number;

  getLength(): number;

  getYear(): null | number;
}