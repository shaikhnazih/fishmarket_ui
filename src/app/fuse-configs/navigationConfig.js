import { MaterialUIComponentsNavigation } from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import ar from './navigation-i18n/ar';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
    {
        'id': 'applications',
        'title': 'Applications',
        'translate': 'APPLICATIONS',
        'type': 'group',
        'auth': authRoles.user,
        'icon': 'apps',
        'children': [
            //{
            //    'id': 'dashboards',
            //    'title': 'Dashboards',
            //    'translate': 'DASHBOARDS',
            //    'type': 'collapse',
            //    'icon': 'dashboard',
            //    auth: authRoles.user,
            //    'url': '/apps/dashboards/project'
            //    'children': [
            //        {
            //            'id': 'analytics-dashboard',
            //            'title': 'Analytics',
            //            'type': 'item',
            //            auth: authRoles.user,
            //            'url': '/apps/dashboards/analytics'
            //        },
            //        {
            //            'id': 'project-dashboard',
            //            'title': 'Project',
            //            'type': 'item',
            //            auth: authRoles.user,
            //            'url': '/apps/dashboards/project'
            //        }
            //    ]
            //},
            {
                'id': 'dashboard',
                'title': 'Dashboard',
                'translate': 'DASHBOARDS',
                'type': 'item',
                'icon': 'dashboard',
                'auth': authRoles.staff,
                'url': '/apps/dashboard'
            },
            //{
            //    'id': 'calendar',
            //    'title': 'Calendar',
            //    'translate': 'CALENDAR',
            //    'type': 'item',
            //    'icon': 'today',
            //    'url': '/apps/calendar'
            //},

            {
                'id': 'scheme',
                'title': 'Scheme List',
                'translate': 'Scheme',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'auth': authRoles.staff,
                'url': '/apps/scheme/list',
                'children': [
                    {
                        'id': 'scheme',
                        'title': 'Scheme List',
                        'type': 'item',
                        'url': '/apps/scheme/list/',
                        'exact': true
                    },
                    {
                        'id': 'scheme-settings',
                        'title': 'Add New Scheme ',
                        'type': 'item',
                        'url': '/apps/scheme/settings/',
                        'exact': true
                    }
                ]
            },


            {
                'id': 'settings',
                'title': 'Settings',
                'translate': 'Settings',
                'type': 'collapse',
                'auth': authRoles.staff,
                'icon': 'shopping_cart',
                'url': '/apps/settings',
                'children': [
                    {
                        'id': 'settings-gift',
                        'title': 'Gifts',
                        'type': 'item',
                        'url': '/apps/settings/gifts',
                        'exact': true
                    },
                    {
                        'id': 'settings-giftcategory',
                        'title': 'Gift Category',
                        'type': 'item',
                        'url': '/apps/settings/giftcategory',
                        'exact': true
                    }
                    ,
                    {
                        'id': 'settings-feedbackcategory',
                        'title': 'Feedback Category',
                        'type': 'item',
                        'url': '/apps/settings/feedbackCategory',
                        'exact': true
                    }
                    ,
                    {
                        'id': 'settings-banners',
                        'title': 'Banners',
                        'type': 'item',
                        'url': '/apps/settings/banners',
                        'exact': true
                    }
                    ,
                    {
                        'id': 'settings-retailerTarget',
                        'title': 'Retailer Target',
                        'type': 'item',
                        'url': '/apps/settings/retailerTarget',
                        'exact': true
                    }
                    ,
                    {
                        'id': 'settings-pointexpiry',
                        'title': 'Point Expiry',
                        'type': 'item',
                        'url': '/apps/settings/pointexpiry',
                        'exact': true
                    }
                ]
            },
            {
                'id': 'redemption',
                'title': 'Redemption',
                'translate': 'Redemption',
                'auth': authRoles.nexus,
                'type': 'collapse',
                'icon': 'apps',
                'url': '/apps/redemption',
                'children': [
                    {
                        'id': 'redemption',
                        'title': 'Redemption',
                        'type': 'item',
                        'url': '/apps/redemption/redemption',
                        'exact': true
                    }
                    // ,
                    // {
                    //     'id': 'redemption-history',
                    //     'title': 'Redemption History',
                    //     'type': 'item',
                    //     'url': '/apps/redemption/redemptionhistory',
                    //     'exact': true
                    // }
                ]
            },
            {
                'id': 'feedback',
                'title': 'Feedback',
                'translate': 'Feedback',
                'type': 'item',
                'icon': 'apps',
                'auth': authRoles.staff,
                'url': '/apps/feedback'
            },
            {
                'id': 'notifications',
                'title': 'Notifications',
                'translate': 'Notifications',
                'type': 'item',
                'auth': authRoles.staff,

                'icon': 'check_box',
                'url': '/apps/Notifications'
            },
            {
                'id': 'catalogue',
                'title': 'Catalogue',
                'translate': 'Catalogue',
                'type': 'item',
                'auth': authRoles.staff,

                'icon': 'note',
                'url': '/apps/Catalogue'
            },
            {
                'id': 'user',
                'title': 'Users',
                'translate': 'User',
                'type': 'item',
                'auth': authRoles.admin,

                'icon': 'today',
                'url': '/apps/user'
            },
            // {
            //     'id': 'profileapproval',
            //     'title': 'Profile Approval',
            //     'translate': 'Profile Approval',
            //     'type': 'item',
            //     'icon': 'today',
            //     'url': '/apps/profileapproval'
            // },
            {
                'id': 'reports',
                'title': 'Reports',
                'translate': 'Reports',
                'type': 'item',
                'auth': authRoles.staff,

                'icon': 'today',
                'url': '/apps/reports'
            },
            //{
            //    'id': 'e-commerce',
            //    'title': 'E-Commerce',
            //    'translate': 'ECOMMERCE',
            //    'type': 'collapse',
            //    'icon': 'shopping_cart',
            //    'url': '/apps/e-commerce',
            //    'children': [
            //        {
            //            'id': 'e-commerce-products',
            //            'title': 'Products',
            //            'type': 'item',
            //            'url': '/apps/e-commerce/products',
            //            'exact': true
            //        },
            //        {
            //            'id': 'e-commerce-product-detail',
            //            'title': 'Product Detail',
            //            'type': 'item',
            //            'url': '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
            //            'exact': true
            //        },
            //        {
            //            'id': 'e-commerce-new-product',
            //            'title': 'New Product',
            //            'type': 'item',
            //            'url': '/apps/e-commerce/products/new',
            //            'exact': true
            //        },
            //        {
            //            'id': 'e-commerce-orders',
            //            'title': 'Orders',
            //            'type': 'item',
            //            'url': '/apps/e-commerce/orders',
            //            'exact': true
            //        },
            //        {
            //            'id': 'e-commerce-order-detail',
            //            'title': 'Order Detail',
            //            'type': 'item',
            //            'url': '/apps/e-commerce/orders/1',
            //            'exact': true
            //        }
            //    ]
            //},
            //{
            //    'id': 'academy',
            //    'title': 'Academy',
            //    'translate': 'ACADEMY',
            //    'type': 'item',
            //    'icon': 'school',
            //    'url': '/apps/academy'
            //},
            //{
            //    'id': 'mail',
            //    'title': 'Mail',
            //    'translate': 'MAIL',
            //    'type': 'item',
            //    'icon': 'email',
            //    'url': '/apps/mail',
            //    'badge': {
            //        'title': 25,
            //        'bg': '#F44336',
            //        'fg': '#FFFFFF'
            //    }
            //},
            /*            {
                            'id': 'todo',
                            'title': 'To-Do',
                            'translate': 'TODO',
                            'type': 'item',
                            'icon': 'check_box',
                            'url': '/apps/todo',
                            'badge': {
                                'title': 3,
                                'bg': 'rgb(255, 111, 0)',
                                'fg': '#FFFFFF'
                            }
                        },*/
            /*            {
                            'id': 'file-manager',
                            'title': 'File Manager',
                            'translate': 'FILE_MANAGER',
                            'type': 'item',
                            'icon': 'folder',
                            'url': '/apps/file-manager'
                        },
            */
            /*            {
                            'id': 'contacts',
                            'title': 'Contacts',
                            'translate': 'CONTACTS',
                            'type': 'item',
                            'icon': 'account_box',
                            'url': '/apps/contacts/all'
                        },
            *//*            {
                            'id': 'chat',
                            'title': 'Chat',
                            'translate': 'CHAT',
                            'type': 'item',
                            'icon': 'chat',
                            'url': '/apps/chat',
                            'badge': {
                                'title': 13,
                                'bg': 'rgb(9, 210, 97)',
                                'fg': '#FFFFFF'
                            }
                        },
            */
            //{
            //    'id': 'scrumboard',
            //    'title': 'Scrumboard',
            //    'translate': 'SCRUMBOARD',
            //    'type': 'item',
            //    'icon': 'assessment',
            //    'url': '/apps/scrumboard'
            //},
            //{
            //    'id': 'notes',
            //    'title': 'Notes',
            //    'translate': 'NOTES',
            //    'type': 'item',
            //    'icon': 'note',
            //    'url': '/apps/notes'
            //}
        ]
    },
    {
        'id': 'pages',
        'title': 'Pages',
        'type': 'group-hidden',
        'icon': 'pages',
        'children': [
            {
                'id': 'authentication',
                'title': 'Authentication',
                'type': 'collapse',
                'icon': 'lock',
                'badge': {
                    'title': 10,
                    'bg': '#525E8A',
                    'fg': '#FFFFFF'
                },
                'children': [
                    {
                        'id': 'authentication-login',
                        'title': 'Login',
                        'type': 'item',
                        'url': '/pages/auth/login'
                    },
                    {
                        'id': 'login-v2',
                        'title': 'Login v2',
                        'type': 'item',
                        'url': '/pages/auth/login-2'
                    },
                    {
                        'id': 'authentication-register',
                        'title': 'Register',
                        'type': 'item',
                        'url': '/pages/auth/register'
                    },
                    {
                        'id': 'authentication-register-v2',
                        'title': 'Register v2',
                        'type': 'item',
                        'url': '/pages/auth/register-2'
                    },
                    {
                        'id': 'authentication-forgot-password',
                        'title': 'Forgot Password',
                        'type': 'item',
                        'url': '/pages/auth/forgot-password'
                    },
                    {
                        'id': 'authentication-forgot-password-v2',
                        'title': 'Forgot Password v2',
                        'type': 'item',
                        'url': '/pages/auth/forgot-password-2'
                    },
                    {
                        'id': 'authentication-reset-password',
                        'title': 'Reset Password',
                        'type': 'item',
                        'url': '/pages/auth/reset-password'
                    },
                    {
                        'id': 'authentication-reset-password-v2',
                        'title': 'Reset Password v2',
                        'type': 'item',
                        'url': '/pages/auth/reset-password-2'
                    },
                    {
                        'id': 'authentication-lock-screen',
                        'title': 'Lock Screen',
                        'type': 'item',
                        'url': '/pages/auth/lock'
                    },
                    {
                        'id': 'authentication-mail-confirmation',
                        'title': 'Mail Confirmation',
                        'type': 'item',
                        'url': '/pages/auth/mail-confirm'
                    }
                ]
            },
            {
                'id': 'coming-soon',
                'title': 'Coming Soon',
                'type': 'item',
                'icon': 'alarm',
                'url': '/pages/coming-soon'
            },
            {
                'id': 'errors',
                'title': 'Errors',
                'type': 'collapse',
                'icon': 'error',
                'children': [
                    {
                        'id': '404',
                        'title': '404',
                        'type': 'item',
                        'url': '/pages/errors/error-404'
                    },
                    {
                        'id': '500',
                        'title': '500',
                        'type': 'item',
                        'url': '/pages/errors/error-500'
                    }
                ]
            },
            {
                'id': 'invoice',
                'title': 'Invoice',
                'type': 'collapse',
                'icon': 'receipt',
                'children': [
                    {
                        'id': 'modern',
                        'title': 'Modern',
                        'type': 'item',
                        'url': '/pages/invoices/modern'
                    },
                    {
                        'id': 'compact',
                        'title': 'Compact',
                        'type': 'item',
                        'url': '/pages/invoices/compact'
                    }
                ]
            },
            {
                'id': 'maintenance',
                'title': 'Maintenance',
                'type': 'item',
                'icon': 'build',
                'url': '/pages/maintenance'
            },
            {
                'id': 'pricing',
                'title': 'Pricing',
                'type': 'collapse',
                'icon': 'attach_money',
                'children': [
                    {
                        'id': 'style-1',
                        'title': 'Style 1',
                        'type': 'item',
                        'url': '/pages/pricing/style-1'
                    },
                    {
                        'id': 'style-2',
                        'title': 'Style 2',
                        'type': 'item',
                        'url': '/pages/pricing/style-2'
                    },
                    {
                        'id': 'style-3',
                        'title': 'Style 3',
                        'type': 'item',
                        'url': '/pages/pricing/style-3'
                    }
                ]
            },
            {
                'id': 'profile',
                'title': 'Profile',
                'type': 'item',
                'icon': 'person',
                'url': '/pages/profile'
            },
            {
                'id': 'search',
                'title': 'Search',
                'type': 'collapse',
                'icon': 'search',
                'children': [
                    {
                        'id': 'classic-search',
                        'title': 'Classic Search',
                        'type': 'item',
                        'url': '/pages/search/classic'
                    },
                    {
                        'id': 'modern-search',
                        'title': 'Modern Search',
                        'type': 'item',
                        'url': '/pages/search/modern'
                    }
                ]
            },
            {
                'id': 'faq',
                'title': 'Faq',
                'type': 'item',
                'icon': 'help',
                'url': '/pages/faq'
            },
            {
                'id': 'knowledge-base',
                'title': 'Knowledge Base',
                'type': 'item',
                'icon': 'import_contacts',
                'url': '/pages/knowledge-base'
            }
        ]
    },
    {
        'id': 'user-interface',
        'title': 'User Interface',
        'type': 'group-hidden',
        'icon': 'web',
        'children': [
            {
                'id': 'icons',
                'title': 'Icons',
                'type': 'item',
                'icon': 'photo',
                'url': '/ui/icons'
            },
            {
                'id': 'typography',
                'title': 'Typography',
                'type': 'item',
                'icon': 'text_fields',
                'url': '/ui/typography'
            },
            {
                'id': 'helper-classes',
                'title': 'Helper Classes',
                'type': 'item',
                'icon': 'help',
                'url': '/ui/helper-classes'
            },
            {
                'id': 'page-layouts',
                'title': 'Page Layouts',
                'type': 'collapse',
                'icon': 'view_quilt',
                'children': [
                    {
                        'id': 'carded',
                        'title': 'Carded',
                        'type': 'collapse',
                        'badge': {
                            'title': 12,
                            'bg': '#525E8A',
                            'fg': '#FFFFFF'
                        },
                        'children': [
                            {
                                'id': 'carded-full-width',
                                'title': 'Full Width',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/full-width'
                            },
                            {
                                'id': 'carded-full-width-tabbed',
                                'title': 'Full Width Tabbed',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/full-width-tabbed'
                            },
                            {
                                'id': 'carded-full-width-2',
                                'title': 'Full Width 2',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/full-width-2'
                            },
                            {
                                'id': 'carded-full-width-2-tabbed',
                                'title': 'Full Width 2 Tabbed',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/full-width-2-tabbed'
                            },
                            {
                                'id': 'carded-left-sidebar',
                                'title': 'Left Sidebar',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/left-sidebar'
                            },
                            {
                                'id': 'carded-left-sidebar-tabbed',
                                'title': 'Left Sidebar Tabbed',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/left-sidebar-tabbed'
                            },
                            {
                                'id': 'carded-left-sidebar-2',
                                'title': 'Left Sidebar 2',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/left-sidebar-2'
                            },
                            {
                                'id': 'carded-left-sidebar-2-tabbed',
                                'title': 'Left Sidebar 2 Tabbed',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/left-sidebar-2-tabbed'
                            },
                            {
                                'id': 'carded-right-sidebar',
                                'title': 'Right Sidebar',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/right-sidebar'
                            },
                            {
                                'id': 'carded-right-sidebar-tabbed',
                                'title': 'Right Sidebar Tabbed',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/right-sidebar-tabbed'
                            },
                            {
                                'id': 'carded-right-sidebar-2',
                                'title': 'Right Sidebar 2',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/right-sidebar-2'
                            },
                            {
                                'id': 'carded-right-sidebar-2-tabbed',
                                'title': 'Right Sidebar 2 Tabbed',
                                'type': 'item',
                                'url': '/ui/page-layouts/carded/right-sidebar-2-tabbed'
                            }
                        ]
                    },
                    {
                        'id': 'simple',
                        'title': 'Simple',
                        'type': 'collapse',
                        'badge': {
                            'title': 8,
                            'bg': '#525E8A',
                            'fg': '#FFFFFF'
                        },
                        'children': [
                            {
                                'id': 'simple-full-width',
                                'title': 'Full Width',
                                'type': 'item',
                                'url': '/ui/page-layouts/simple/full-width'
                            },
                            {
                                'id': 'simple-left-sidebar',
                                'title': 'Left Sidebar',
                                'type': 'item',
                                'url': '/ui/page-layouts/simple/left-sidebar'
                            },
                            {
                                'id': 'simple-left-sidebar-2',
                                'title': 'Left Sidebar 2',
                                'type': 'item',
                                'url': '/ui/page-layouts/simple/left-sidebar-2'
                            },
                            {
                                'id': 'simple-left-sidebar-3',
                                'title': 'Left Sidebar 3',
                                'type': 'item',
                                'url': '/ui/page-layouts/simple/left-sidebar-3'
                            },
                            {
                                'id': 'simple-right-sidebar',
                                'title': 'Right Sidebar',
                                'type': 'item',
                                'url': '/ui/page-layouts/simple/right-sidebar'
                            },
                            {
                                'id': 'simple-right-sidebar-2',
                                'title': 'Right Sidebar 2',
                                'type': 'item',
                                'url': '/ui/page-layouts/simple/right-sidebar-2'
                            },
                            {
                                'id': 'simple-right-sidebar-3',
                                'title': 'Right Sidebar 3',
                                'type': 'item',
                                'url': '/ui/page-layouts/simple/right-sidebar-3'
                            },
                            {
                                'id': 'simple-tabbed',
                                'title': 'Tabbed',
                                'type': 'item',
                                'url': '/ui/page-layouts/simple/tabbed'
                            }
                        ]
                    },
                    {
                        'id': 'blank',
                        'title': 'Blank',
                        'type': 'item',
                        'url': '/ui/page-layouts/blank'
                    }
                ]
            }
        ]
    },
    {
        'id': 'Documentation',
        'title': 'Documentation',
        'type': 'group-hidden',
        'icon': 'star',
        'children': [
            {
                'id': 'changelog',
                'title': 'Changelog',
                'type': 'item',
                'icon': 'history',
                'url': '/documentation/changelog',
                'badge': {
                    'title': '3.4.0',
                    'bg': 'rgb(236, 12, 142)',
                    'fg': '#FFFFFF'
                }
            },
            {
                'id': 'getting-started-doc',
                'title': 'Getting Started',
                'type': 'collapse',
                'icon': 'import_contacts',
                'children': [
                    {
                        'id': 'introduction-doc',
                        'title': 'Introduction',
                        'type': 'item',
                        'url': '/documentation/getting-started/introduction'
                    },
                    {
                        'id': 'installation-doc',
                        'title': 'Installation',
                        'type': 'item',
                        'url': '/documentation/getting-started/installation'
                    }
                ]
            },
            {
                'id': 'working-with-fuse-react-doc',
                'title': 'Working with Fuse',
                'type': 'collapse',
                'icon': 'import_contacts',
                'children': [
                    {
                        'id': 'development-doc',
                        'title': 'Development',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/development'
                    },
                    {
                        'id': 'production-doc',
                        'title': 'Production',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/production'
                    },
                    {
                        'id': 'project-structure-doc',
                        'title': 'Project Structure',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/project-structure'
                    },
                    {
                        'id': 'updating-fuse-react-doc',
                        'title': 'Updating Fuse React',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/updating-fuse-react'
                    },
                    {
                        'id': 'theming-doc',
                        'title': 'Theming',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/theming'
                    },
                    {
                        'id': 'theme-layouts-doc',
                        'title': 'Theme Layouts',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/theme-layouts'
                    },
                    {
                        'id': 'page-layouts-doc',
                        'title': 'Page Layouts',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/page-layouts'
                    },
                    {
                        'id': 'settings-doc',
                        'title': 'Settings',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/settings'
                    },
                    {
                        'id': 'fuse-react-routing-doc',
                        'title': 'Routing',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/routing'
                    },
                    {
                        'id': 'fuse-react-code-splitting-doc',
                        'title': 'Code Splitting',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/code-splitting'
                    },
                    {
                        'id': 'fuse-react-rtl-doc',
                        'title': 'RTL Support',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/rtl-support'
                    },
                    {
                        'id': 'fuse-react-multi-language-doc',
                        'title': 'Multi Language',
                        'type': 'item',
                        'url': '/documentation/working-with-fuse-react/multi-language'
                    }
                ]
            },
            {
                'id': 'authentication-doc',
                'title': 'Authentication',
                'type': 'collapse',
                'icon': 'import_contacts',
                'children': [
                    {
                        'id': 'jwt-auth-doc',
                        'title': 'JWT',
                        'type': 'item',
                        'url': '/documentation/authentication/jwt'
                    },
                    {
                        'id': 'firebase-auth-doc',
                        'title': 'Firebase',
                        'type': 'item',
                        'url': '/documentation/authentication/firebase'
                    },
                    {
                        'id': 'auth0-auth-doc',
                        'title': 'Auth0',
                        'type': 'item',
                        'url': '/documentation/authentication/auth0'
                    }
                ]
            },
            {
                'id': 'fuse-components',
                'title': 'Fuse Components',
                'type': 'collapse',
                'icon': 'widgets',
                'children': [
                    {
                        'id': 'fuse-auth',
                        'title': 'FuseAuthorization',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-authorization'
                    },
                    {
                        'id': 'fuse-theme',
                        'title': 'FuseTheme',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-theme'
                    },
                    {
                        'id': 'fuse-layout',
                        'title': 'FuseLayout',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-layout'
                    },
                    {
                        'id': 'fuse-components-page',
                        'title': 'Fuse Page Layouts',
                        'type': 'collapse',
                        'children': [
                            {
                                'id': 'fuse-page-carded',
                                'title': 'FusePageCarded',
                                'type': 'item',
                                'url': '/documentation/fuse-components/fuse-page-carded'
                            },
                            {
                                'id': 'fuse-page-simple',
                                'title': 'FusePageSimple',
                                'type': 'item',
                                'url': '/documentation/fuse-components/fuse-page-simple'
                            }
                        ]
                    },
                    {
                        'id': 'fuse-navigation',
                        'title': 'FuseNavigation',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-navigation'
                    },
                    {
                        'id': 'fuse-scrollbars',
                        'title': 'FuseScrollbars',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-scrollbars'
                    },
                    {
                        'id': 'fuse-highlight',
                        'title': 'FuseHighlight',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-highlight'
                    },
                    {
                        'id': 'fuse-countdown',
                        'title': 'FuseCountdown',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-countdown'
                    },
                    {
                        'id': 'fuse-message',
                        'title': 'FuseMessage',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-message'
                    },
                    {
                        'id': 'fuse-dialog',
                        'title': 'FuseDialog',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-dialog'
                    },
                    {
                        'id': 'fuse-animate',
                        'title': 'FuseAnimate',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-animate'
                    },
                    {
                        'id': 'fuse-animate-group',
                        'title': 'FuseAnimateGroup',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-animate-group'
                    },
                    {
                        'id': 'fuse-chip-select',
                        'title': 'FuseChipSelect',
                        'type': 'item',
                        'url': '/documentation/fuse-components/fuse-chip-select'
                    }
                ]
            },
            {
                'id': 'material-ui-components',
                'title': 'Material UI Components',
                'type': 'collapse',
                'icon': 'layers',
                'children': [
                    ...MaterialUIComponentsNavigation
                ]
            },
            {
                'id': '3rd-party-components',
                'title': '3rd Party Components',
                'type': 'collapse',
                'icon': 'settings_input_component',
                'children': [
                    {
                        'id': 'datatables',
                        'title': 'Datatables',
                        'type': 'collapse',
                        'children': [
                            {
                                'id': 'react-table',
                                'title': 'React Table',
                                'type': 'item',
                                'url': '/documentation/third-party-components/datatables/react-table'
                            }
                        ]
                    },
                    {
                        'id': 'formsy',
                        'title': 'Formsy',
                        'type': 'item',
                        'url': '/documentation/third-party-components/formsy'
                    },
                    {
                        'id': 'google-map-react',
                        'title': 'Google Map React',
                        'type': 'item',
                        'url': '/documentation/third-party-components/google-map-react'
                    },
                    {
                        'id': 'react-chartjs-2',
                        'title': 'React ChartJs 2',
                        'type': 'item',
                        'url': '/documentation/third-party-components/react-chartjs-2'
                    }
                ]
            }
        ]
    },
    {
        'type': 'divider-hidden',
        'id': 'divider-1'
    },
    {
        'id': 'auth',
        'title': 'Auth',
        'type': 'group-hidden',
        'icon': 'apps',
        'children': [
            {
                'id': 'login',
                'title': 'Login',
                'type': 'item',
                'url': '/login',
                auth: authRoles.onlyGuest,
                'icon': 'lock'
            },
            {
                'id': 'register',
                'title': 'Register',
                'type': 'item',
                'url': '/register',
                auth: authRoles.onlyGuest,
                'icon': 'person_add'
            },
            {
                'id': 'logout',
                'title': 'Logout',
                'type': 'item',
                auth: authRoles.user,
                'url': '/logout',
                'icon': 'exit_to_app'
            },
            {
                'id': 'auth-admin-example',
                'title': 'Admin: Auth protected page',
                'type': 'item',
                'url': '/auth/admin-role-example',
                'icon': 'security'
            },
            {
                'id': 'only-admin-navigation-item',
                'title': 'Nav item only for Admin',
                'type': 'item',
                'auth': authRoles.admin,
                'url': '/auth/admin-role-example',
                'icon': 'verified_user'
            },
            {
                'id': 'auth-staff-example',
                'title': 'Staff: Auth protected page',
                'type': 'item',
                'url': '/auth/staff-role-example',
                'icon': 'security'
            },
            {
                'id': 'only-staff-navigation-item',
                'title': 'Nav item only for Staff',
                'type': 'item',
                'auth': authRoles.staff,
                'url': '/auth/staff-role-example',
                'icon': 'verified_user'
            },
            {
                'id': 'auth-guest-example',
                'title': 'Guest: Auth protected page',
                'type': 'item',
                'url': '/auth/guest-role-example',
                'icon': 'security'
            },
            {
                'id': 'only-guest-navigation-item',
                'title': 'Nav item only for Guest',
                'type': 'item',
                'auth': authRoles.onlyGuest,
                'url': '/auth/guest-role-example',
                'icon': 'verified_user'
            }
        ]
    },
    {
        'type': 'divider-hidden',
        'id': 'divider-2'
    },
    {
        'id': 'test-group-level-1',
        'title': 'Test Group Level 1',
        'type': 'group-hidden',
        'icon': 'apps',
        'children': [
            {
                'id': 'test-item',
                'title': 'Test Item',
                'type': 'item',
                'icon': 'list',
                'url': '#'
            },
            {
                'id': 'test-link',
                'title': 'Test Link',
                'type': 'link',
                'icon': 'link',
                'url': 'http://fusetheme.com',
                'target': '_blank'
            },
            {
                'id': 'test-collapse-level-1',
                'title': 'Test Collapse Level 1',
                'type': 'collapse',
                'icon': 'dashboard',
                'children': [
                    {
                        'id': 'test-item-level-1',
                        'title': 'Test Item Level 1',
                        'type': 'item',
                        'url': '#'
                    },
                    {
                        'id': 'test-link-level-1',
                        'title': 'Test Link Level 1',
                        'type': 'link',
                        'url': 'http://fusetheme.com',
                        'target': '_blank'
                    },
                    {
                        'id': 'test-collapse-2',
                        'title': 'Test Collapse Level 2',
                        'type': 'collapse',
                        'children': [
                            {
                                'id': 'test-item-level-2',
                                'title': 'Test Item Level 2',
                                'type': 'item',
                                'url': '#'
                            },
                            {
                                'id': 'test-link-level-2',
                                'title': 'Test Link Level 2',
                                'type': 'link',
                                'url': 'http://fusetheme.com',
                                'target': '_blank'
                            },
                            {
                                'id': 'test-collapse-level-3',
                                'title': 'Test Collapse Level 3',
                                'type': 'collapse',
                                'children': [
                                    {
                                        'id': 'test-item-level-3',
                                        'title': 'Test Item Level 3',
                                        'type': 'item',
                                        'url': '#'
                                    },
                                    {
                                        'id': 'test-link-level-3',
                                        'title': 'Test Link Level 3',
                                        'type': 'link',
                                        'url': 'http://fusetheme.com',
                                        'target': '_blank'
                                    },
                                    {
                                        'id': 'test-collapse-level-4',
                                        'title': 'Test Collapse Level 4',
                                        'type': 'collapse',
                                        'children': [
                                            {
                                                'id': 'test-item-level-4',
                                                'title': 'Test Item Level 4',
                                                'type': 'item',
                                                'url': '#'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'id': 'test-group-level-2',
                        'title': 'Test Group Level 2',
                        'type': 'group',
                        'icon': 'apps',
                        'children': [
                            {
                                'id': 'test-collapse-level-2-2',
                                'title': 'Test Collapse Level 2',
                                'type': 'collapse',
                                'children': [
                                    {
                                        'id': 'test-item-level-2-2',
                                        'title': 'Test Item Level 2',
                                        'type': 'item',
                                        'url': '#'
                                    },
                                    {
                                        'id': 'test-link-level-2-2',
                                        'title': 'Test Link Level 2',
                                        'type': 'link',
                                        'url': 'http://fusetheme.com',
                                        'target': '_blank'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

export default navigationConfig;
