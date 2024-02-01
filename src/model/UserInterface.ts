export default interface UserInterface {
  getId(): number;

  getName(): string;

  setName(name: string): void;

  getLanguage(): string;
}
