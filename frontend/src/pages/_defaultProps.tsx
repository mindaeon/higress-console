import { LayoutDashboard, Route as RouteIcon, Minimize2, List, Bot, Globe, ShieldCheck, Settings, User, Boxes } from 'lucide-react';

export default {
  route: {
    path: '/',
    routes: [
      {
        name: 'init.title',
        path: '/init',
        hideFromMenu: true,
        usePureLayout: true,
      },
      {
        name: 'login.title',
        path: '/login',
        hideFromMenu: true,
        usePureLayout: true,
      },
      {
        name: '',
        path: '/user',
        hideFromMenu: true,
        children: [
          {
            name: 'user.changePassword.title',
            path: '/user/changePassword',
          },
        ],
      },
      {
        name: 'menu.dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard size={16} />,
      },
      {
        name: 'menu.serviceSources',
        path: '/service-source',
        icon: <Minimize2 size={16} />,
      },
      {
        name: 'menu.serviceList',
        path: '/service',
        icon: <List size={16} />,
      },
      {
        name: 'menu.routeConfig',
        path: '/route',
        icon: <RouteIcon size={16} />,
      },
      {
        name: 'menu.aiServiceManagement',
        icon: <Bot size={16} />,
        children: [
          {
            name: 'menu.llmProviderManagement',
            path: '/ai/provider',
          },
          {
            name: 'menu.aiRouteManagement',
            path: '/ai/route',
          },
          {
            name: 'menu.aiDashboard',
            path: '/ai/dashboard',
            visiblePredicate: (configData: any) => configData && configData['dashboard.builtin'],
          },
          {
            name: 'menu.mcpManagement',
            path: '/mcp/list',
            hideChildrenInMenu: true,
            children: [
              {
                name: 'menu.mcpConfigurations',
                path: '/mcp/detail',
              },
            ],
          },
        ],
      },
      {
        name: 'menu.domainManagement',
        path: '/domain',
        icon: <Globe size={16} />,
      },
      {
        name: 'menu.certManagement',
        path: '/tls-certificate',
        icon: <ShieldCheck size={16} />,
      },
      {
        name: 'menu.consumerManagement',
        path: '/consumer',
        icon: <User size={16} />,
      },
      {
        name: 'menu.pluginManagement',
        path: '/plugin',
        icon: <Boxes size={16} />,
      },
      {
        name: 'menu.systemSettings',
        path: '/system',
        icon: <Settings size={16} />,
      },
    ],
  },
};
