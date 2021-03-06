/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { injectable } from '@dbeaver/core/di';
import {
  ContextMenuService,
  IContextMenuItem,
  IMenuContext,
} from '@dbeaver/core/dialogs';

import { NavigationTreeContextMenuService } from '../../NavigationTree/NavigationTreeContextMenuService';
import { EMainMenu, MainMenuService } from '../../TopNavBar/MainMenu/MainMenuService';
import { EObjectFeature } from '../NodesManager/EObjectFeature';
import { NodeManagerUtils } from '../NodesManager/NodeManagerUtils';
import { NodeWithParent } from '../NodesManager/NodeWithParent';
import { ConnectionsManagerService } from './ConnectionsManagerService';


@injectable()
export class ConnectionDialogsService {
  newConnectionMenuToken = 'connectionMenu';

  constructor(private mainMenuService: MainMenuService,
              private contextMenuService: ContextMenuService,
              private connectionsManagerService: ConnectionsManagerService) {
  }

  registerMenuItems() {
    this.mainMenuService.registerMenuItem(
      EMainMenu.mainMenuConnectionsPanel,
      {
        id: this.newConnectionMenuToken,
        order: 1,
        title: 'app_shared_connectionMenu_newConnection',
        isPanel: true,
        isHidden: () => this.mainMenuService.isEmptyMenuPanel(this.newConnectionMenuToken),
      }
    );

    this.mainMenuService.registerMenuItem(
      EMainMenu.mainMenuConnectionsPanel,
      {
        id: 'mainMenuDisconnect',
        order: 2,
        title: 'app_shared_connectionMenu_disconnect',
        onClick: () => this.connectionsManagerService.closeAllConnections(),
      }
    );

    const closeConnection: IContextMenuItem<NodeWithParent> = {
      id: 'closeConnection',
      isPresent(context) {
        return context.contextType === NavigationTreeContextMenuService.nodeContextType
          && !!context.data.object?.features?.includes(EObjectFeature.dataSource);
      },
      title: 'Disconnect',
      onClick: (context: IMenuContext<NodeWithParent>) => {
        const node = context.data;
        const connectionId = NodeManagerUtils.connectionNodeIdToConnectionId(node.id);
        this.connectionsManagerService.closeConnectionAsync(connectionId);
      },
    };

    this.contextMenuService.addMenuItem<NodeWithParent>(this.contextMenuService.getRootMenuToken(), closeConnection);
  }
}
