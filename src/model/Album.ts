export default class Album {
  private id: number = 0;
  private name: string = '';
  private artistId: number = 0;
  private cover: string = '';
  private artistName: string = '';
  private length: number = 0;

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
}