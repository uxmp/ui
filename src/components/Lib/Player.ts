import * as amplitudejs from 'amplitudejs'
import { DefineComponent } from 'vue';
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

  static playAlbum(albumId: number, app: DefineComponent) {
    amplitudejs.stop();

    ServerRequest.request(
      'album/' + albumId + '/songs'
    ).then(async (response: Response) => {
      let songList = [];

      (await response.json()).items.map((disc_raw: Object) => plainToClass(Disc, disc_raw)).map((disc: Disc) => {
        disc.getSongList().map((song: SongListItem) => songList.push(song));
      });

      app.emitter.emit('updatePlaylist', songList);

      Player.init(app, songList.map((song: SongListItem) => Player.createSongListItem(song)));
      Player.playIndex(0);
    });
  }

  static playArtist(artist: Artist, app: DefineComponent) {
    ServerRequest.request(
      'artist/' + artist.getId() + '/songs'
    ).then(async (response: Response) => {
      let data = await response.json()

      let playList = data.items.map((song_raw: Object) => plainToClass(SongListItem, song_raw));

      app.emitter.emit('updatePlaylist', playList);

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