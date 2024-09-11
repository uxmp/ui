import NowPlaying from "@/model/NowPlaying";
import SongListItemInterface from "@/model/SongListItemInterface";

export type EventTypes = {
  updateNowPlaying: NowPlaying;
  updatePlayerState: boolean;
  updatePlaylist: Array<SongListItemInterface>;
};
