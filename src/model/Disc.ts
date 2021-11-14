import { Type } from "class-transformer";
import SongListItem from "./SongListItem";
import 'reflect-metadata';
import SongListItemInterface from "./SongListItemInterface";
export default class Disc {
  private id: number = 0;

  @Type(() => SongListItem)
  private songs: Array<SongListItemInterface> = [];

  private length: number = 0;

  getId(): number | undefined {
    return this.id;
  }

  getSongList(): Array<SongListItemInterface> {
    return this.songs;
  }

  getLength(): number {
    return this.length;
  }
}