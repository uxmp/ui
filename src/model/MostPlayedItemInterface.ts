import SongListItemInterface from "./SongListItemInterface"

export default interface MostPlayedItemInterface {
  getCount(): number

  getSong(): SongListItemInterface
}