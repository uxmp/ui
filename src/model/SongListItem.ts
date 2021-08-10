class SongListItem {
    private id: number = 0;
    private name: string = '';
    private trackNumber: number = 0;
    private playUrl: string = '';
    private artistName: string = '';
    private albumName: string = '';
    private cover: string = '';
    private artistId: number = 0;
    private albumId: number = 0;

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getTracknumber(): number {
        return this.trackNumber;
    }

    getPlayUrl(): string {
        return this.playUrl;
    }

    getArtistName(): string {
        return this.artistName;
    }

    getAlbumName(): string {
        return this.albumName;
    }

    getCover(): string {
        return this.cover;
    }

    getArtistId(): number {
        return this.artistId;
    }

    getAlbumId(): number {
        return this.albumId;
    }
}

export { SongListItem };