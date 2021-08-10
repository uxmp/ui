import { Type } from "class-transformer";
import { SongListItem } from "./SongListItem";
import 'reflect-metadata';

class Disc {
    private id: number = 0;

    @Type(() => SongListItem)
    private songs: Array<SongListItem> = [];

    getId(): number | undefined {
        return this.id;
    }

    getSongList(): Array<SongListItem> {
        return this.songs;
    }
}

export { Disc };