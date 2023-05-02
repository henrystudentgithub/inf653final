const State = require('../model/State');
const states_json = require('../public/json/states.json');


const get_random_fact = async (req, res) => {
  const state = await State.findOne({ state_code: req.params.state });
  const facts = state?.fun_facts;

  if (!facts || facts.length === 0) {

    const state_name = states_json.find(
      (state) => state.code === req.params.state
    ).state;


    res.json({ message: `No Fun Facts found for ${state_name}` });
  } else {

    const random_fact = facts[Math.floor(Math.random() * facts.length)];

    res.json({
      fun_fact: random_fact,
    });
  }
};

const create_fact = async (req, res) => {
  if (!req?.body?.fun_facts) {
    return res.status(400).json({ message: 'State fun facts value required' });
  }
  if (!Array.isArray(req.body.fun_facts)) {
    return res
      .status(400)
      .json({ message: 'State fun facts value must be an array' });
  }

  const state = await State.findOne({ state_code: req.params.state }).exec();

  if (state) {

    state.fun_facts.push(...req.body.fun_facts);


    const result = await state.save();


    res.json(result);
  } else {

    try {
      const result = await State.create({
        state_code: req.params.state,
        fun_facts: [...req.body.fun_facts],
      });


      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
};


const modify_fact = async (req, res) => {
  const state_code = req?.params?.state;
  const index = req?.body?.index;
  const fun_fact = req?.body?.fun_fact;


  if (!index) {
    return res.status(400).json({
      message: 'State fun fact index value required',
    });
  }

  if (!fun_fact) {
    return res.status(400).json({
      message: 'State fun fact value required',
    });
  }


  const state = await State.findOne({ state_code: state_code }).exec();

  if (!state) {

    const state_name = states_json.find(
      (state) => state.code === state_code
    ).state;


    res.json({ message: `No Fun Facts found for ${state_name}` });
  } else if (!state.fun_facts[index - 1]) {

    const state_name = states_json.find(
      (state) => state.code === state_code
    ).state;

    res.json({ message: `No Fun Fact found at that index for ${state_name}` });
  } else {

    state.fun_facts[index - 1] = fun_fact;


    const result = await state.save();

    res.json(result);
  }
};

const delete_fact = async (req, res) => {
  const state_code = req?.params?.state;
  const index = req?.body?.index;

  if (!index) {
    return res.status(400).json({
      message: 'State fun fact index value required',
    });
  }

  const state = await State.findOne({ state_code: state_code }).exec();

  if (!state) {


    const state_name = states_json.find(
      (state) => state.code === state_code
    ).state;


    res.json({ message: `No Fun Facts found for ${state_name}` });
  } else if (!state.fun_facts[index - 1]) {


    const state_name = states_json.find(
      (state) => state.code === state_code
    ).state;

    res.json({ message: `No Fun Fact found at that index for ${state_name}` });
  } else {

    state.fun_facts.splice(index - 1, 1);


    const result = await state.save();


    res.json(result);
  }
};
module.exports = {
  get_random_fact,
  create_fact,
  modify_fact,
  delete_fact,
};
