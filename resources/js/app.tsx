import './bootstrap';
import '../css/app.css';
import 'sweetalert2/dist/sweetalert2.min.css'

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { StoreProvider } from 'easy-peasy';
import store from './Redux/store';

import { App as KonstaApp } from 'konsta/react'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <KonstaApp theme='ios'>
        <StoreProvider store={store}>
          <App {...props} />
        </StoreProvider>
      </KonstaApp>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
