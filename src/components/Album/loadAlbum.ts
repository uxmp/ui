import { Album } from '../../model/album'
import { plainToClass } from 'class-transformer';
import DefaultOptions from '../Lib/DefaultOptions'

async function loadAlbum(albumId: number): Promise<Album> {
      let result = await fetch(
            import.meta.env.VITE_API_URL + 'album/' + albumId,
            DefaultOptions            
      );

      return plainToClass(Album, await result.json());
}

export { loadAlbum };