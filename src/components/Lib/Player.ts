import * as amplitudejs from 'amplitudejs'
import { DefineComponent } from 'vue';
import Disc from '../../model/Disc';
import SongListItem from '../../model/SongListItem';
import { plainToClass } from 'class-transformer';
import SongListItemInterface from '../../model/SongListItemInterface';
import HttpRequest from './HttpRequest';
import { AxiosResponse } from 'axios';
import ArtistInterface from '../../model/ArtistInterface';
import RadioStationInterface from '../../model/RadioStationInterface';
import NowPlaying from '../../model/NowPlaying';
import DiscInterface from '../../model/DiscInterface';

export default class Player {

  init(app: DefineComponent, songList: Array<Object>, offset: Number = 0): void {
    amplitudejs.stop();

    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler('previoustrack', function () { amplitudejs.prev() });
      navigator.mediaSession.setActionHandler('nexttrack', function () { amplitudejs.next() });
    }

    amplitudejs.init({
      songs: songList,
      start_song: offset,
      callbacks: {
        play: function () {
          let song = amplitudejs.getActiveSongMetadata();

          if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: song.name,
              artist: song.artistName,
              album: song.albumName,
              artwork: [{ src: song.cover_art_url, }],
            });
          }

          HttpRequest.post(
            'play/nowplaying',
            {
              songId: song.songId,
              temporaryPlaylist: {
                id: app.$store.getters['authStorage/getTemporaryPlaylistId'],
                offset: song.index,
              }
            }
          );

          app.emitter.emit('updateNowPlaying', plainToClass(NowPlaying, song))
          app.emitter.emit('updatePlayerState', true)

          document.getElementById('playlist-item-' + song.index)?.scrollIntoView({
            behavior: 'smooth'
          });
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

  playIndex(index: number): void {
    amplitudejs.playSongAtIndex(index);
  }

  playAlbum(albumId: number, app: DefineComponent): void {
    amplitudejs.stop();

    HttpRequest.get(
      'album/' + albumId + '/songs'
    ).then((response: AxiosResponse) => {
      let songList = [] as Array<SongListItemInterface>;

      let discs = response.data.items.map((disc_raw: Object): DiscInterface => plainToClass(Disc, disc_raw))

      discs.map((disc: DiscInterface) => {
        disc.getSongList().map((song: SongListItemInterface) => songList.push(song));
      });

      this.updatePlaylist(songList, app)
    });
  }

  playPlaylist(playlistId: number, app: DefineComponent): void {
    amplitudejs.stop();

    HttpRequest.get(
      'playlist/' + playlistId + '/songs'
    ).then((response: AxiosResponse) => {
      let songList = response.data.items.map((song_raw: Object): SongListItemInterface => plainToClass(SongListItem, song_raw));

      this.updatePlaylist(songList, app)
    });
  }

  playArtist(artist: ArtistInterface, app: DefineComponent): void {
    HttpRequest.get(
      'artist/' + artist.getId() + '/songs'
    ).then((response: AxiosResponse) => {
      let songList = response.data.items.map((song_raw: Object): SongListItemInterface => plainToClass(SongListItem, song_raw));

      this.updatePlaylist(songList, app)
    });
  }

  playRadiostation(station: RadioStationInterface, app: DefineComponent): void {
    let song = new SongListItem();
    song.setName(station.getName());
    song.setPlayUrl(station.getUrl());

    app.emitter.emit('updatePlaylist', [song]);
  }

  playSong(song: SongListItemInterface, app: DefineComponent): void {
    this.updatePlaylist([song], app)
  }

  private updatePlaylist(songs: Array<SongListItemInterface>, app: DefineComponent): void {
    app.emitter.emit('updatePlaylist', songs)
  }

  createSongListItem(song: SongListItemInterface): Object {
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

  stop(): void {
    amplitudejs.stop();
  }

  togglePlayerState(state: boolean): void {
    if (state == true) {
      amplitudejs.play();
    } else {
      amplitudejs.pause();
    }
  }
}