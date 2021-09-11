import Album from '../../model/Album'
import { plainToClass } from 'class-transformer';
import ServerRequest from '../Lib/ServerRequest';
import { Artist } from '../../model/artist';

const EntityLoader = new class EntityLoader {

  async loadAlbum(albumId: number): Promise<Album> {
    return plainToClass(
      Album,
      await ServerRequest.request('album/' + albumId).then(response => response.json())
    );
  }

  async loadArtist(artistId: number): Promise<Artist> {
    return plainToClass(
      Artist,
      await ServerRequest.request('artist/' + artistId).then(response => response.json())
    );
  }
}

export default EntityLoader;