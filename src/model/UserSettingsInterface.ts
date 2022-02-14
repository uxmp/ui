export default interface UserSettingsInterface {
  getLanguage(): string;

  setLanguage(value: string): void;
}