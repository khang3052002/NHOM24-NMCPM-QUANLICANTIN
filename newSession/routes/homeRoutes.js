const app = require('express');
const mainRoutes = app.Router();


mainRoutes.get('/', (req, res, next) => {
    try {
        /*ha ha*/
        var checkSession = true;
        var mainRender = 'main';
        var navBar = false;
        if (req.session && req.session.user) {
            checkSession = false;
            if (req.session.user == 'admin') {
                navBar = true;
                mainRender = 'adminMain';
            }
        }
        res.render(mainRender, {
            admin: navBar,
            show: checkSession,
        })
    } catch (err) {
        console.log(err);
    }
})
module.exports = mainRoutes;