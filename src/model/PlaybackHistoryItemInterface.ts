import SongListItemInterface from "./SongListItemInterface"

export default interface PlaybackHistoryItemInterface extends SongListItemInterface {
  getUserId(): number;

  getUserName(): string;
}