import SongListItem from "./SongListItem";

export default class PlaybackHistoryItem extends SongListItem {
  private userId: number = 0;
  private userName: string = '';

  getUserId(): number {
      return this.userId
  }

  getUserName(): string {
      return this.userName
  }
}