const express = require('express');
const router = express.Router();
const states_controller = require('../../controllers/states_controller');
const fun_facts_controller = require('../../controllers/fun_facts_controller');
const verify_state = require('../../middleware/verify_state');


router.route('/').get(states_controller.get_all_states);


router.route('/:state').get(verify_state, states_controller.get_state);


router
  .route('/:state/capital')
  .get(verify_state, states_controller.get_state_capital);


router
  .route('/:state/nickname')
  .get(verify_state, states_controller.get_state_nickname);


router
  .route('/:state/population')
  .get(verify_state, states_controller.get_state_population);


router
  .route('/:state/admission')
  .get(verify_state, states_controller.get_state_admission);


router
  .route('/:state/funfact')
  .get(verify_state, fun_facts_controller.get_random_fact)
  .post(verify_state, fun_facts_controller.create_fact)
  .patch(verify_state, fun_facts_controller.modify_fact)
  .delete(verify_state, fun_facts_controller.delete_fact);

module.exports = router;
