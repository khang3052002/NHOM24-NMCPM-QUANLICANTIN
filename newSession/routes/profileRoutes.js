const app=require('express');
const profileRoutes=app.Router();

profileRoutes.get('/',(req,res,next)=>{
    try{
          /*ha ha*/
          var checkSession = true;
          var navBar = false;
          if (req.session && req.session.user) {
              checkSession = false;
              if (req.session.user == 'admin') {
                  navBar = true;
              }
          }
        res.render('profile',{
            admin: navBar,
            show: checkSession,
        });
    }
    catch(Err){
        console.log(Err);
    }
})
module.exports=profileRoutes;