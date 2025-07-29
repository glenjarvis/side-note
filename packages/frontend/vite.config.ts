import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  build: {
    lib: {
      entry: 'src/side-note.ts',
      name: 'SideNote',
      fileName: 'side-note',
      formats: ['es'] // Purposly not using udm // no window.SideNote
    },
    rollupOptions: {
      output: {
        globals: {}
      }
    }
  }
});
