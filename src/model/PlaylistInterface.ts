export default interface PlaylistInterface {
  getId(): number;

  getName(): string;

  setName(name: string): void;

  getUserName(): string;

  getUserId(): number;
}