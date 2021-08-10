class AlbumListItem {
    private albumId: number = 0;
    private name: string = '';
    private artistId: number = 0;
    private cover: string = '';
    private artistName: string = '';

    getAlbumId(): number {
        return this.albumId;
    }

    getName(): string {
        return this.name;
    }

    getArtistId(): number {
        return this.artistId;
    }

    getCover(): string {
        return this.cover;
    }

    getArtistName(): string {
        return this.artistName;
    }


}

export { AlbumListItem };