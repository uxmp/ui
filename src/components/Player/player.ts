import * as amplitudejs from 'amplitudejs'
import { DefineComponent } from 'vue';
import { Album } from '../../model/album'
import { Disc } from '../../model/Disc';
import { SongListItem } from '../../model/SongListItem';

class Player {

  static init(app: DefineComponent, songList: Array<Object> = [{url: ''}]) {
    amplitudejs.stop();

    amplitudejs.init({
      songs: songList,
      callbacks: {
        play: function () {
          app.$emit('updateNowPlaying', amplitudejs.getActiveSongMetadata())
        },
        song_change: function () {
          app.$emit('updateNowPlaying', amplitudejs.getActiveSongMetadata())
        },
      },
      debug: true,
      delay: 250,
      continue_next: true
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

export { Player };