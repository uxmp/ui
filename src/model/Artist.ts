import ArtistInterface from "./ArtistInterface";

export default class Artist implements ArtistInterface {
  private id: number = 0;
  private name: string = '';
  private cover: string = '';
  private mbId: string = '';

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCover(): string {
    return this.cover;
  }

  getMbId(): string {
    return this.mbId;
  }
}