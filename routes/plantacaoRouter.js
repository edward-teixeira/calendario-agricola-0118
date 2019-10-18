const plantacaoController = require('../controller/plantacaoController');
const router = require('express').Router();

router.route('/')
    .get(plantacaoController.listManyPlantacao)
    .post(plantacaoController.create_plantacao);
router.route('/:id')
    .get(plantacaoController.listOnePlantacao)
    .put(plantacaoController.put_plantacao)
    .delete(plantacaoController.delete_plantacao);

module.exports = router;