import 'moment/locale/id';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/app.css';
import './bootstrap';
moment.locale('id')

import { createInertiaApp } from '@inertiajs/react';
import { StoreProvider } from 'easy-peasy';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './Redux/store';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import moment from 'moment';

if (window) {
  defineCustomElements(window)
}


const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: (title) => title ? `${title} - ${appName}` : appName,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <StoreProvider store={store}>
        <App {...props} />
      </StoreProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
