import PlaylistConfigInterface from "./PlaylistConfigInterface";
import SongListItemInterface from "./SongListItemInterface";

export default class PlaylistConfig implements PlaylistConfigInterface {
  private autoPlay: boolean = true;

  private offset: Number = 0;

  private songList: Array<SongListItemInterface> = [];

  constructor(
    songList: Array<SongListItemInterface>,
    offset: Number = 0,
    autoPlay: boolean = true,
  ) {
    this.songList = songList
    this.offset = offset
    this.autoPlay = autoPlay
  }

  isAutoPlay(): boolean {
    return this.autoPlay
  }

  getSongList(): Array<SongListItemInterface> {
    return this.songList;
  }

  getOffset(): Number {
    return this.offset
  }
}