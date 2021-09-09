export default interface SongListItemInterface {

  getId(): number;

  getName(): string;

  getTracknumber(): number;

  getPlayUrl(): string;

  getArtistName(): string;

  getAlbumName(): string;

  getCover(): string;

  getArtistId(): number;

  getAlbumId(): number;

  getLength(): number {
}