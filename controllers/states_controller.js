const State = require('../model/State');
const states_json = require('../public/json/states.json');


const get_all_states = async (req, res) => {

  let state_json, db_json;


  if (req?.query?.contig == 'true') {

    state_json = states_json.filter(
      (state) => state.code !== 'AK' && state.code !== 'HI'
    );
    db_json = await State.find();
  } else if (req?.query?.contig == 'false') {

    state_json = states_json.filter(
      (state) => state.code === 'AK' || state.code === 'HI'
    );
    db_json = await State.find();
  } else {

    state_json = JSON.parse(JSON.stringify(states_json));
    db_json = await State.find();
  }

  const states = states_with_facts(state_json, db_json);


  if (!states) {
    return res.status(204).json({ message: 'No states found.' });
  }


  res.json(states);
};


const get_state = async (req, res) => {

  const state = states_json.find((state) => state.code.toLowerCase() === req.params.state.toLowerCase());
  const db_json = await State.find({ statecode: req.params.state });
  const result = states_with_facts([state], db_json);



  res.json(result[0]);
};


const get_state_capital = (req, res) => {

  const state = states_json.find((state) => state.code.toLowerCase() === req.params.state.toLowerCase());


  res.json({
    state: state.state,
    capital: state.capital_city,
  });
};


const get_state_nickname = (req, res) => {

  const state = states_json.find((state) => state.code.toLowerCase() === req.params.state.toLowerCase());


  res.json({
    state: state.state,
    nickname: state.nickname,
  });
};


const get_state_population = (req, res) => {

  const state = states_json.find((state) => state.code.toLowerCase() === req.params.state.toLowerCase());


  res.json({
    state: state.state,
    population: state.population.toLocaleString(),
  });
};


const get_state_admission = (req, res) => {

  const state = states_json.find((state) => state.code.toLowerCase() === req.params.state.toLowerCase());


  res.json({
    state: state.state,
    admitted: state.admission_date,
  });
};


module.exports = {
  get_all_states,
  get_state,
  get_state_capital,
  get_state_nickname,
  get_state_population,
  get_state_admission,
};


const states_with_facts = (states_json, db_json) => {
  return states_json.map((stateJson) => {

    const stateCode = stateJson.code;


    let result = { ...stateJson };


    const facts = db_json.find((state) => state.statecode === stateCode);


    if (facts?.funfacts?.length > 0 && facts.funfacts !== []) {
      result.funfacts = facts.funfacts;
    }


    return result;
  });
};
