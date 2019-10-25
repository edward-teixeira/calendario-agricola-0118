const plantacaoController = require('../controller/plantacaoController');
const router = require('express').Router();

router.route('/')
    .get(plantacaoController.listManyPlantacao)
    .post(plantacaoController.create_plantacao);
router.route('/:id')
    .get(plantacaoController.listOnePlantacao)
    .delete(plantacaoController.delete_plantacao)
    .put(plantacaoController.update_plantacao);

module.exports = router;
