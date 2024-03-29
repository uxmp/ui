import UserInterface from "./UserInterface";

export default class User implements UserInterface {
  private id: number = 0;

  private name: string = '';

  private language: string = '';

  getId(): number {
    return this.id
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getLanguage(): string {
    return this.language
  }
}