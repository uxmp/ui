import * as amplitudejs from 'amplitudejs'
import { DefineComponent, Static } from 'vue';
import Album from '../../model/Album'
import Disc from '../../model/Disc';
import SongListItem from '../../model/SongListItem';
import Artist from '../../model/Artist';
import ServerRequest from './ServerRequest';
import { plainToClass } from 'class-transformer';

export default class Player {

  static init(app: DefineComponent, songList: Array<Object> = [{url: ''}]) {
    amplitudejs.stop();

    amplitudejs.init({
      songs: songList,
      callbacks: {
        play: function () {
          let song = amplitudejs.getActiveSongMetadata();

          app.emitter.emit('updateNowPlaying', song)

          Player.scrollPlaylist(song.index);
        },
        song_change: function () {
          let song = amplitudejs.getActiveSongMetadata();

          app.emitter.emit('updateNowPlaying', song);

          Player.scrollPlaylist(song.index);
        },
      },
      debug: true,
      delay: 250,
      continue_next: true
    });
  }

  static scrollPlaylist(index: number): void {
    document.getElementById('playlist-item-' + index).scrollIntoView({
      behavior: 'smooth'
    });
  }

  static playIndex(index: number) {
    amplitudejs.playSongAtIndex(index);
  }

  static playAlbum(album: Album, app: DefineComponent) {
    amplitudejs.stop();

    const songList: Object[] | undefined = [];

    album.getDiscs().map((disc: Disc) => {
      disc.getSongList().map((song: SongListItem) => {
        songList.push(
          Player.createSongListItem(song)
        )
      });
    });

    Player.init(app, songList);
    Player.playIndex(0);
  }

  static playArtist(artist: Artist, app: DefineComponent) {
    ServerRequest.request(
      'artist/' + artist.getId() + '/songs'
    ).then(async (response: Response) => {
      let data = await response.json()

      let playList = data.items.map((song_raw: Object) => plainToClass(SongListItem, song_raw));

      app.$emit('updatePlaylist', playList);

      Player.init(app, playList.map((song: SongListItem) => Player.createSongListItem(song)));
      Player.playIndex(0);
    });
  }

  static createSongListItem(song: SongListItem): Object {
    return {
      name: song.getName(),
      albumName: song.getAlbumName(),
      artistName: song.getArtistName(),
      url: song.getPlayUrl(),
      cover_art_url: song.getCover(),
      artistId: song.getArtistId(),
      albumId: song.getAlbumId(),
    };
  }

  static stop(): void {
    amplitudejs.stop();
  }
}