import PlaylistConfigInterface from "./PlaylistConfigInterface";
import SongListItemInterface from "./SongListItemInterface";

export default class PlaylistConfig implements PlaylistConfigInterface {
  private readonly autoPlay: boolean = true;

  private readonly offset: number = 0;

  private readonly songList: Array<SongListItemInterface> = [];

  constructor(
    songList: Array<SongListItemInterface>,
    offset: number = 0,
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

  getOffset(): number {
    return this.offset
  }
}
