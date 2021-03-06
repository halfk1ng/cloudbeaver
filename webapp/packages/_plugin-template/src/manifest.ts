/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { IServiceInjector, PluginManifest } from '@dbeaver/core/di';

export const manifest: PluginManifest = {
  info: {
    name: '___template plugin_____',
  },

  providers: [
    // services here
  ],

  initialize(services: IServiceInjector): void {
    // init phase here
  },
};
