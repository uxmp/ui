export default interface PlaylistInterface {
  getId(): number

  getName(): string

  setName(name: string): void

  getSongCount(): number

  getUserName(): string

  getUserId(): number
}