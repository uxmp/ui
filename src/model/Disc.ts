import { Type } from "class-transformer";
import SongListItem from "./SongListItem";
import 'reflect-metadata';
import SongListItemInterface from "./SongListItemInterface";
import DiscInterface from "./DiscInterface";
export default class Disc implements DiscInterface {
  private id: number = 0;

  @Type(() => SongListItem)
  private songs: Array<SongListItemInterface> = [];

  private length: number = 0;

  private number: number = 0;

  getId(): number | undefined {
    return this.id;
  }

  getSongList(): Array<SongListItemInterface> {
    return this.songs;
  }

  getLength(): number {
    return this.length;
  }

  getNumber(): number {
    return this.number
  }
}