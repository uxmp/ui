import GenreStatisticItemInterface from "./GenreStatisticItemInterface"

export default class GenreStatisticItem implements GenreStatisticItemInterface {
  public id: number = 0
  public name: string = ''
  public albumCount: number = 0
  public songCount: number = 0

  getId(): number {
    return this.albumCount
  }

  getName(): string {
    return this.name
  }

  getAlbumCount(): number {
    return this.albumCount
  }

  getSongCount(): number {
    return this.songCount
  }
}