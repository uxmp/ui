import { Type } from "class-transformer";
import MostPlayedItemInterface from "./MostPlayedItemInterface";
import SongListItem from "./SongListItem";
import SongListItemInterface from "./SongListItemInterface";

export default class MostPlayedItem implements MostPlayedItemInterface {
  public count: number = 0;

  @Type(() => SongListItem)
  public song: SongListItemInterface = new SongListItem()

  getCount(): number {
    return this.count
  }

  getSong(): SongListItemInterface {
    return this.song;
  }
}