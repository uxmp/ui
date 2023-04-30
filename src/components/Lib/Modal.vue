<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <div>
          <slot name="header">
          </slot>
        </div>
        <div class="modal-close">
          <font-awesome-icon :icon="['fas', 'rectangle-xmark']" :title="$t('shared.close')" @click="close"  class="modal-close-button"/>
        </div>
      </header>

      <section class="modal-body">
        <slot name="body">
        </slot>
       </section>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000000;
  }

  .modal {
    background-color: #141f2a;
    box-shadow: 2px 2px 20px 1px rgb(85, 57, 5);
    border: 1px solid rgb(85, 57, 5);
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    height: 90%;
    font-size: 1.1em;
  }

  .modal-header {
    padding: 10px 10px 5px 10px;
    line-height: normal;
    color: rgb(141, 102, 31);
    position: relative;
    border-bottom: 1px #446683 solid;
    justify-content: space-between;
    font-size: 120%;
    display: grid;
    grid-template-columns: auto 50px;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    height: auto;
  }

  div.modal-close {
    text-align: right;
  }
  .modal-close-button {
    cursor: pointer;
  }
  .modal-close-button:hover {
    color: rgb(192, 140, 44);
  }
</style>