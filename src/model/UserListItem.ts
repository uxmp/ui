import UserListItemInterface from "./UserListItemInterface";

export default class UserListItem implements UserListItemInterface {
  private id: number = 0;

  private name: string = '';

  private language: string = '';

  getId(): number {
    return this.id
  }

  getName(): string {
    return this.name;
  }

  getLanguage(): string {
    return this.language
  }
}