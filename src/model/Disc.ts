import { Type } from "class-transformer";
import SongListItem from "./SongListItem";
import 'reflect-metadata';
export default class Disc {
  private id: number = 0;

  @Type(() => SongListItem)
  private songs: Array<SongListItem> = [];

  private length: number = 0;

  getId(): number | undefined {
    return this.id;
  }

  getSongList(): Array<SongListItem> {
    return this.songs;
  }

  getLength(): number {
    return this.length;
  }
}