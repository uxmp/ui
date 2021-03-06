import PlaylistInterface from "./PlaylistInterface";

export default class Playlist implements PlaylistInterface {
  private id: number = 0;
  public name: string = '';
  public song_count: number = 0;
  public user_name: string = '';
  public user_id: number = 0;

  getId(): number {
    return this.id
  }

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }

  getSongCount(): number {
    return this.song_count
  }

  getUserName(): string {
    return this.user_name
  }

  getUserId(): number {
    return this.user_id
  }
}