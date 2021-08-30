import { Album } from '../../model/album'
import { plainToClass } from 'class-transformer';
import ServerRequest from '../Lib/ServerRequest';

async function loadAlbum(albumId: number): Promise<Album> {
  return plainToClass(
    Album,
    await ServerRequest.request('album/' + albumId).then(response => response.json())
  );
}

export { loadAlbum };