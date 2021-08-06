import * as amplitudejs from 'amplitudejs'
import { Album } from '../../model/album'

class Player {

  static init() {
    amplitudejs.init({
      songs: [{
        url: ''
      }],
      debug: true,
      delay: 250,
      continue_next: true
    });
  }

  static playAlbum(album: Album) {
    amplitudejs.stop();

    Player.init();

    album.getSongList().map((url: string) => {
      amplitudejs.addSong({
        name: "Bla"+url,
        url: url
      });
    });
    amplitudejs.bindNewElements();
    amplitudejs.playSongAtIndex(1);
  }
}

export { Player };