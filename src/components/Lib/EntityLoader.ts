import Album from '../../model/Album'
import { plainToClass } from 'class-transformer';
import Artist from '../../model/Artist';
import HttpRequest from '../Lib/HttpRequest';
import { AxiosResponse } from 'axios';
import AlbumInterface from '../../model/AlbumInterface';
import ArtistInterface from '../../model/ArtistInterface';
import RadioStationInterface from '../../model/RadioStationInterface';
import RadioStation from '../../model/RadioStation';
import PlaylistInterface from '../../model/PlaylistInterface';
import Playlist from '../../model/Playlist';

const EntityLoader = new class EntityLoader {

  async loadAlbum(albumId: number): Promise<AlbumInterface> {
    return plainToClass(
      Album,
      await HttpRequest.get('album/' + albumId).then((response: AxiosResponse) => response.data)
    );
  }

  async loadArtist(artistId: number): Promise<ArtistInterface> {
    return plainToClass(
      Artist,
      await HttpRequest.get('artist/' + artistId).then((response: AxiosResponse) => response.data)
    );
  }

  async loadRadioStation(stationId: number): Promise<RadioStationInterface> {
    return plainToClass(
      RadioStation,
      await HttpRequest.get('radiostation/' + stationId).then((response: AxiosResponse) => response.data)
    );
  }

  async loadPlaylist(playlistId: number): Promise<PlaylistInterface> {
    return plainToClass(
      Playlist,
      await HttpRequest.get('playlist/' + playlistId).then((response: AxiosResponse) => response.data)
    );
  }
}

export default EntityLoader;