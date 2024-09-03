declare module 'amplitudejs' {
  function stop(): void;

  function play(): void;

  function pause(): void;

  function prev(): void;

  function next(): void;

  function playSongAtIndex(index: number): void;

  function getActiveSongMetadata(): {
    name: string,
    artistName: string,
    albumName: string,
    index: number,
    songId: string,
    cover_art_url: string,
  };

  function getConfig(): {
    volume: number,
  }

  function init({}): void;
}
