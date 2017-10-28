import UiAlert from './pages/UiAlert.vue';

const menu = [
    {
        title: 'Components',
        menu: [
            {
                path: '/ui-alert',
                component: UiAlert,
                title: 'UiAlert',
                sourceUrl: 'src/UiAlert.vue'
            }
        ]
    }
];

// Generate a Vue Router compatible routes map from the menu
const routes = menu.reduce((paths, section) => {
    const sectionPaths = section.menu.map(menuItem => {
        return {
            path: menuItem.path,
            component: menuItem.component,
            meta: {
                section: section.title,
                title: menuItem.title,
                sourceUrl: menuItem.sourceUrl
            }
        };
    });

    return paths.concat(sectionPaths);
}, []);

// Add the default route at the beginning of the routes array
routes.unshift({
    path: '/',
    redirect: '/ui-alert'
});

// Add the catch all route to redirect 404s
routes.push({
    path: '*',
    redirect: '/ui-alert'
});

export { menu, routes };