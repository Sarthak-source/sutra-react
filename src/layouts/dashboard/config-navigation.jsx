import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'home',
    path: '/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'reports',
    path: '/home/reports',
    icon: icon('ic_report'),
  },
  {
    title: 'traders',
    path: '/home/traders',
    icon: icon('ic_trading'),
  },
  {
    title: 'profile',
    path: '/home/profile',
    icon: icon('ic_user'),
  },

  {
    title: 'Quality check',
    path: '/home/quality-check',
    icon: icon('ic_qc'),
  },
  {
    title: 'DO issue with vehicle',
    path: '/home/issue-do',
    icon: icon('ic_vehilcle'),
  },
  {
    title: 'Storehouse',
    path: '/home/issue-do',
    icon: icon('ic_storehouse'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
  // {
  //   title: 'login',
  //   path: '/home/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'home',
  //   path: '/',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/home/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/home/blog',
  //   icon: icon('ic_blog'),
  // },
];

export default navConfig;
