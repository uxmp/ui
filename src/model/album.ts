class Album {
    private id?: number;
    private name?: string;
    private artistId?: number;
    private songList: Array<string> = [];

    getId(): number | undefined {
        return this.id;
    }

    getName(): string | undefined {
        return this.name;
    }

    getArtistId(): number | undefined {
        return this.artistId;
    }

    getSongList(): Array<string> {
        return this.songList;
    }
}

export { Album };