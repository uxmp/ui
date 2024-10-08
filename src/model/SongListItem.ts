import SongListItemInterface from "./SongListItemInterface";
export default class SongListItem implements SongListItemInterface {
  private id: number = 0;
  private name: string = '';
  private trackNumber: number = 0;
  private playUrl: string = '';
  private artistName: string = '';
  private albumName: string = '';
  private cover: string = '';
  private artistId: number = 0;
  private albumId: number = 0;
  private length: number = 0;
  private year: number | null = null;
  private musicBrainzId: string = '';

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getTracknumber(): number {
    return this.trackNumber;
  }

  getPlayUrl(): string {
    return this.playUrl;
  }

  setPlayUrl(url: string) {
    this.playUrl = url;
  }

  getArtistName(): string {
    return this.artistName;
  }

  getAlbumName(): string {
    return this.albumName;
  }

  setCover(cover: string) {
    this.cover = cover;
  }

  getCover(): string {
    return this.cover;
  }

  getArtistId(): number {
    return this.artistId;
  }

  getAlbumId(): number {
    return this.albumId;
  }

  getLength(): number {
    return this.length;
  }

  getYear(): null | number {
    return this.year;
  }

  getMbId(): string {
    return this.musicBrainzId;
  }
}
