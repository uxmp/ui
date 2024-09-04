import SongListItemInterface from "./SongListItemInterface"

export default interface PlaylistConfigInterface {

  isAutoPlay(): boolean

  getSongList(): Array<SongListItemInterface>
  
  getOffset(): number
}