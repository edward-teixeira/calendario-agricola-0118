const plantacao_controller = require('../controller/plantacaoController');
const router = require('express').Router();

router.get('/', plantacao_controller.lista_plantacao);
router.get('/:id', plantacao_controller.listar_uma_plantacao);
router.post('/', plantacao_controller.criar_plantacao);
router.put('/:id', plantacao_controller.atualizar_plantacao)
router.delete('/:id', plantacao_controller.deletar_plantacao);


module.exports = router;