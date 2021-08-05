<template>
    <div class="player">
      <div class="meta-container">
        <div class="song-title"></div>
        <div class="song-artist"></div>

        <div class="time-container">
          <div class="current-time">
            <span class="amplitude-current-minutes"></span>:<span class="amplitude-current-seconds"></span>
          </div>

          <div class="duration">
            <span class="amplitude-duration-minutes">03</span>:<span class="amplitude-duration-seconds">16</span>
          </div>
        </div>
        <progress class="amplitude-buffered-progress" value="0"></progress>
        <input type="range" class="amplitude-song-slider" step=".1"/>
        <input type="range" class="amplitude-volume-slider"/>
        <div class="control-container">
          <div class="amplitude-prev">
            &lt;&lt;
          </div>
          <div class="amplitude-play-pause">
            |&gt;
          </div>
          <div class="amplitude-next">
            &gt;&gt;
          </div>
        </div>
      </div>
    </div>
  <h1>Alben</h1>
  <ul id="array-rendering">
    <li v-for="album in albumList" :key="album.getId()">
      <div>
        <img class="cover_play" v-on:click="play(album)" v-bind:src="album.getCover()" width="150" height="150" /><br />
        {{ album.getName() }}
      </div>
      <br />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer';
import { Album } from '../model/album';
import * as amplitudejs from 'amplitudejs'
export default defineComponent({
  name: 'HelloWorld',
  data() {
    return { 
      albumList: []
    }
  },
  beforeMount() {
    amplitudejs.init({
      songs: [{
        url: ''
      }],
      debug: true,
      delay: 250,
      continue_next: true
    });

    this.getAlbums();
  },
  methods: {
    async getAlbums() {
      const res = await fetch('http://localhost:8888/albums');
      const data = await res.json();

      this.albumList = data.items.map((album_data: any) => {
        return plainToClass(Album, album_data);
      });
    },
    play(album: Album) {
      album.getSongList().map((url: string) => {
        amplitudejs.addSong({
          name: "Bla"+url,
          url: url
        });
      });
      amplitudejs.bindNewElements();
      amplitudejs.playSongAtIndex(1);
    }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

img.cover_play {
  cursor: pointer;
}
</style>
