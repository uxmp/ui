import Album from '../../model/Album'
import { plainToClass } from 'class-transformer';
import Artist from '../../model/Artist';
import HttpRequest from '../Lib/HttpRequest';
import { AxiosResponse } from 'axios';

const EntityLoader = new class EntityLoader {

  async loadAlbum(albumId: number): Promise<Album> {
    return plainToClass(
      Album,
      await HttpRequest.get('album/' + albumId).then((response: AxiosResponse) => response.data)
    );
  }

  async loadArtist(artistId: number): Promise<Artist> {
    return plainToClass(
      Artist,
      await HttpRequest.get('artist/' + artistId).then((response: AxiosResponse) => response.data)
    );
  }
}

export default EntityLoader;