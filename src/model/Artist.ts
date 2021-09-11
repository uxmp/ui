export default class Artist {
  private id: number = 0;
  private name: string = '';
  private cover: string = '';

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCover(): string {
    return this.cover;
  }
}