import { Album } from '../../model/album'
import { plainToClass } from 'class-transformer';

async function loadAlbum(albumId: number): Promise<Album> {
      let result = await fetch(
            'http://localhost:8888/album/' + albumId,
            {
                  method: "GET",
                  credentials: "include"
            }
      );

      return plainToClass(Album, await result.json());
}

export { loadAlbum };