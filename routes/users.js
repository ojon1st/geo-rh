var express = require('express');
var router = express.Router();
const agent_controller = require('../controllers/agentcontroller');
const courrier_controller = require('../controllers/courriercontroller');
const conge_controller = require('../controllers/congecontroller');

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.redirect('/users/mon-espace');
});

router.get('/mon-espace', ensureAuthenticated, agent_controller.agent_page_get);

router.get('/mon-espace/formulaire_demande_conge', ensureAuthenticated, conge_controller.demande_conge_page_get);
router.post('/mon-espace/formulaire_demande_conge', ensureAuthenticated, conge_controller.demande_conge_page_post); //on crée un courrier
router.get('/mon-espace/encours', ensureAuthenticated, conge_controller.demande_conge_encour_get);
router.get('/mon-espace/encours/:id',ensureAuthenticated, conge_controller.conge_detail);


router.get('/mon-espace/formation', function(req, res, next) {
    res.render('plateforme/formation_prevision', { title: 'Prévision des formations' });
});

router.get('/mon-espace/personnel/:id',ensureAuthenticated, agent_controller.personnel_detail);
router.get('/mon-espace/personnel', ensureAuthenticated, agent_controller.personnel_page_get);
router.get('/mon-espace/retraites', ensureAuthenticated, agent_controller.retraites_page_get);
router.get('/mon-espace/contractuels', ensureAuthenticated, agent_controller.contractuel_page_get);

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

module.exports = router;