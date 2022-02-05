import Store from './components/Store/Store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: typeof Store;
  }
}
