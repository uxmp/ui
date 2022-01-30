import * as amplitudejs from 'amplitudejs'
import { DefineComponent } from 'vue';
import Disc from '../../model/Disc';
import SongListItem from '../../model/SongListItem';
import { plainToClass } from 'class-transformer';
import SongListItemInterface from '../../model/SongListItemInterface';
import HttpRequest from './HttpRequest';
import { AxiosResponse } from 'axios';
import ArtistInterface from '../../model/ArtistInterface';

export default class Player {

  static init(app: DefineComponent, songList: Array<Object> = [{url: ''}]) {
    console.log(songList)
    amplitudejs.stop();

    amplitudejs.init({
      songs: songList,
      callbacks: {
        play: function () {
          let song = amplitudejs.getActiveSongMetadata();

          app.emitter.emit('updateNowPlaying', song)
          app.emitter.emit('updatePlayerState', true)

          Player.scrollPlaylist(song.index);
        },
        pause: function () {
          app.emitter.emit('updatePlayerState', false)
        },
        stop: function () {
          app.emitter.emit('updatePlayerState', false)
        },
      },
      debug: import.meta.env.VITE_DEBUG_MODE == 'true',
      delay: 250,
      continue_next: true
    });
  }

  static scrollPlaylist(index: number): void {
    document.getElementById('playlist-item-' + index)?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  static playIndex(index: number) {
    amplitudejs.playSongAtIndex(index);
  }

  static playAlbum(albumId: number, app: DefineComponent): void {
    amplitudejs.stop();

    HttpRequest.get(
      'album/' + albumId + '/songs'
    ).then((response: AxiosResponse) => {
      let songList = [];

      response.data.items.map((disc_raw: Object) => plainToClass(Disc, disc_raw)).map((disc: Disc) => {
        disc.getSongList().map((song: SongListItemInterface) => songList.push(song));
      });

      app.emitter.emit('updatePlaylist', songList);
    });
  }

  static playArtist(artist: ArtistInterface, app: DefineComponent): void {
    HttpRequest.get(
      'artist/' + artist.getId() + '/songs'
    ).then((response: AxiosResponse) => {
      let playList = response.data.items.map((song_raw: Object) => plainToClass(SongListItem, song_raw));

      app.emitter.emit('updatePlaylist', playList);
    });
  }

  static playSong(song: SongListItemInterface, app :DefineComponent): void {
    app.emitter.emit('updatePlaylist', [song])
  }

  static createSongListItem(song: SongListItemInterface): Object {
    return {
      name: song.getName(),
      albumName: song.getAlbumName(),
      artistName: song.getArtistName(),
      url: song.getPlayUrl(),
      cover_art_url: song.getCover(),
      artistId: song.getArtistId(),
      albumId: song.getAlbumId(),
      length: song.getLength(),
      songId: song.getId(),
    };
  }

  static stop(): void {
    amplitudejs.stop();
  }

  static togglePlayerState(state: boolean): void {
    if (state == true) {
      amplitudejs.play();
    } else {
      amplitudejs.pause();
    }
  }
}