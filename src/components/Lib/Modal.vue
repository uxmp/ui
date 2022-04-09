<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Default title
        </slot>
      </header>

      <section class="modal-body">
        <slot name="body">
          Default body
        </slot>
       </section>

      <footer class="modal-footer">
        <slot name="footer">
        </slot>
        <button
          type="button"
          class="button"
          @click="close"
        >
          {{ $t("shared.close") }}
        </button>
      </footer>
    </div>
  </div>
</template>

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
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px #446683 solid;
    color: #ffffff;
    justify-content: space-between;
    font-size: 120%;
  }

  .modal-footer {
    border-top: 1px #446683 solid;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
</style>