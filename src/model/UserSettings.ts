import UserSettingsInterface from "./UserSettingsInterface";

export default class UserSettings implements UserSettingsInterface{
  private language: string = '';

  getLanguage(): string {
    return this.language
  }

  setLanguage(value: string): void {
    this.language = value
  }
}