import SongListItemInterface from "./SongListItemInterface";
export default interface DiscInterface {
  getId(): number | undefined;

  getSongList(): Array<SongListItemInterface>;

  getLength(): number;
}