/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


import { NavigationEnd, Router } from "@angular/router";
import { PageName } from '../../_enums/page-name.enum';
import { AuthService } from '../../services/auth.service';

export abstract class BaseNavigationComponent {

  activePageName: string;
  activePage: any;

  authenticated: boolean = true;

  public menu = [
    {
      link: '',
      title: 'Home',
      icon: 'home',
      pagesNames: [PageName.HOME],
      visible: false
    },
    {
        link: 'editor',
        title: 'Pipeline Editor',
        icon: 'dashboard',
        pageNames: [PageName.PIPELINE_EDITOR],
        visible: false
    },
    {
        link: 'pipelines',
        title: 'Pipelines',
        icon: 'play_arrow',
        pageNames: [PageName.PIPELINE_OVERVIEW],
        visible: false
    },
    {
        link: 'connect',
        title: 'Connect',
        icon: 'power',
        pageNames: [PageName.CONNECT],
        visible: false
    },
    {
        link: 'dashboard',
        title: 'Dashboard',
        icon: 'insert_chart',
        pageNames: [PageName.DASHBOARD],
        visible: false
    },
    {
        link: 'dataexplorer',
        title: 'Data Explorer',
        icon: 'search',
        pageNames: [PageName.DATA_EXPLORER],
        visible: false
    },
    {
        link: 'app-overview',
        title: 'Apps',
        icon: 'apps',
        pageNames: [PageName.APPS],
        visible: false
    },
  ];

  admin = [
    {
        link: 'add',
        title: 'Install Pipeline Elements',
        icon: 'cloud_download',
        pageNames: [PageName.INSTALL_PIPELINE_ELEMENTS],
        visible: false
    },
    {
        link: 'files',
        title: 'File Management',
        icon: 'folder',
        pageNames: [PageName.FILE_UPLOAD],
        visible: false
    },
    {
        link: 'configuration',
        title: 'Configuration',
        icon: 'settings',
        pageNames: [PageName.SETTINGS],
        visible: false
    },
  ];

  notificationsVisible = false;

  constructor(protected authService: AuthService,
                protected router: Router) {

    }

    onInit() {
      this.authService.user$.subscribe(user => {
        this.menu.forEach(m => m.visible = this.isNavItemVisible(m.pageNames));
        this.admin.forEach(m => m.visible = this.isNavItemVisible(m.pageNames));
        this.notificationsVisible = this.isNavItemVisible([PageName.NOTIFICATIONS]);
      });
      this.activePage = this.router.url.replace('/', '');
      this.activePageName = this.getPageTitle(this.activePage);
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.activePage = event.url.replace('/', '');
          this.activePageName = this.getPageTitle(this.activePage);
        }
      });
    }

    getActivePage() {
      return this.activePage;
    }

    getPageTitle(path) {
      const allMenuItems = this.menu.concat(this.admin);
      let currentTitle = 'StreamPipes';
      allMenuItems.forEach(m => {
        if (m.link === path) {
          currentTitle = m.title;
        }
      });
      if (path === 'pipeline-details') {
        currentTitle = 'Pipeline Details';
      }
      return currentTitle;
    }

    go(path, payload?) {
      if (payload === undefined) {
        this.router.navigateByUrl(path);
        this.activePage = path;
      } else {
        this.router.navigateByUrl(path, payload);
        this.activePage = path;
      }
      this.activePageName = this.getPageTitle(this.activePage);
    }

    public isNavItemVisible(pageNames?: PageName[]): boolean {
      return this.authService.isAnyAccessGranted(pageNames);
    }

}
