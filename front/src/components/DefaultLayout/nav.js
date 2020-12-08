export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-pie-chart',
    },
    {
      title: true,
      name: 'Administrativo',
      wrapper: {
        element: '',
        attributes: {},
      },
      class: '',
    },
    {
      name: 'Paciente',
      url: '/patient',
      icon: 'icon-user-follow',
    },
    {
      name: 'Atendimento',
      icon: 'icon-list',
      url: '/cases',
      children: [
        {
          name: 'Casos',
          url: '/cases',
          icon: 'icon-docs',
        },
        {
          name: 'Monitoramento',
          url: '/monitor',
          icon: 'icon-eye',
        },
      ],
    },
    {
      name: 'Relatórios',
      icon: 'icon-docs',
      url: '/report',
    },
  ],
};
