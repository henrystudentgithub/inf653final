const states_json = require('../public/json/states.json');


const verify_state = (req, res, next) => {

  const state_code = req?.params?.state?.toUpperCase();

  if (!state_code) {
    return res.status(400).json({ message: 'State abbreviation required' });
  }


  const valid_state_codes = states_json.map((state) => state.code);


  if (valid_state_codes.indexOf(state_code) !== -1) {

    req.params.state = state_code;
    next();
  } else {

    res.status(400).json({ message: 'Invalid state abbreviation parameter' });
  }
};

module.exports = verify_state;
