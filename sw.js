/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "4a664efe3bb09f45b2b9851333825e51"
  }, {
    "url": "pwa-512x512.png",
    "revision": "4a664efe3bb09f45b2b9851333825e51"
  }, {
    "url": "pwa-192x192.png",
    "revision": "05ef6558cb726091f0bcc97e3a3968df"
  }, {
    "url": "index.html",
    "revision": "a6d4f8162755dbd2639298a51d737c25"
  }, {
    "url": "icon.svg",
    "revision": "a0c9dcd31c1e2a29e2481629adb488c9"
  }, {
    "url": "favicon.ico",
    "revision": "2cc9850053a1e8965ce5fec4d5604a3b"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "482c517eeac2c7a2a58eca787ab060f3"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/index-wd9JaWgQ.css",
    "revision": null
  }, {
    "url": "assets/index-D4FMdNjK.js",
    "revision": null
  }, {
    "url": "assets/aistudio/Screenshot_20261108-164539.Chrome_cc4740c7.png",
    "revision": null
  }, {
    "url": "assets/aistudio/Screenshot_20261108-164046.Chrome_906c138a.png",
    "revision": null
  }, {
    "url": "assets/aistudio/Screenshot_20261108-115038.Chrome_02bb796f.png",
    "revision": null
  }, {
    "url": "assets/aistudio/Screenshot_20261107-203625.Chrome_54e00e4e.png",
    "revision": null
  }, {
    "url": "assets/aistudio/Screenshot_20261107-174542.Chrome_81ec310b.png",
    "revision": null
  }, {
    "url": "assets/aistudio/Screenshot_20261107-174237.Chrome_23a659b4.png",
    "revision": null
  }, {
    "url": "assets/aistudio/Screenshot_20261105-153919.Chrome_620c6673.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "482c517eeac2c7a2a58eca787ab060f3"
  }, {
    "url": "favicon.ico",
    "revision": "2cc9850053a1e8965ce5fec4d5604a3b"
  }, {
    "url": "icon.svg",
    "revision": "a0c9dcd31c1e2a29e2481629adb488c9"
  }, {
    "url": "pwa-192x192.png",
    "revision": "05ef6558cb726091f0bcc97e3a3968df"
  }, {
    "url": "pwa-512x512.png",
    "revision": "4a664efe3bb09f45b2b9851333825e51"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "4a664efe3bb09f45b2b9851333825e51"
  }, {
    "url": "manifest.webmanifest",
    "revision": "12c0d166cb25fb55d267658f17a1c51a"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/index.html"), {
    denylist: [/^\/api/]
  }));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
