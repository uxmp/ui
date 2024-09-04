import SongListItem from "./SongListItem";
import PlaybackHistoryItemInterface from "@/model/PlaybackHistoryItemInterface";

export default class PlaybackHistoryItem extends SongListItem implements PlaybackHistoryItemInterface{
  private userId: number = 0;
  private userName: string = '';

  getUserId(): number {
      return this.userId
  }

  getUserName(): string {
      return this.userName
  }
}
