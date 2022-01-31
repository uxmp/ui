export default interface RadioStationInterface {
  getId(): number;

  getName(): string;

  setName(name: string): void;

  getUrl(): string;

  setUrl(url: string): void;
}