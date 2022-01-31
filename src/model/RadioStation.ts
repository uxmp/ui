import RadioStationInterface from "./RadioStationInterface";

export default class RadioStation implements RadioStationInterface {
  private id: number = 0;
  public name: string = '';
  public url: string = '';

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
  
  setName(name: string): void {
    this.name = name;
  }

  getUrl(): string {
    return this.url;
  }

  setUrl(url: string): void {
    this.url = url;
  }
}