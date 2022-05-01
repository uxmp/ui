import SubSonicSettingsInterface from "./SubSonicSettingsInterface";

export default class SubSonicSettings implements SubSonicSettingsInterface {
  private accessToken: null|string = null;

  getAccessToken(): string|null {
    return this.accessToken;
  }
}