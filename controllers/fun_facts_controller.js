const State = require('../model/State');
const states_json = require('../public/json/states.json');


const get_random_fact = async (req, res) => {
  const state = await State.findOne({ statecode: req.params.state });
  const facts = state?.funfacts;

  if (!facts || facts.length === 0) {

    const state_name = states_json.find(
      (state) => state.code === req.params.state
    ).state;


    res.json({ message: `No Fun Facts found for ${state_name}` });
  } else {

    const random_fact = facts[Math.floor(Math.random() * facts.length)];

    res.json({
      funfact: random_fact,
    });
  }
};

const create_fact = async (req, res) => {
  if (!req?.body?.funfacts) {
    return res.status(400).json({ message: 'State fun facts value required' });
  }
  if (!Array.isArray(req.body.funfacts)) {
    return res
      .status(400)
      .json({ message: 'State fun facts value must be an array' });
  }

  const state = await State.findOne({ statecode: req.params.state }).exec();

  if (state) {

    state.funfacts.push(...req.body.funfacts);


    const result = await state.save();


    res.json(result);
  } else {

    try {
      const result = await State.create({
        statecode: req.params.state,
        funfacts: [...req.body.funfacts],
      });


      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
};


const modify_fact = async (req, res) => {
  const statecode = req?.params?.state;
  const index = req?.body?.index;
  const funfact = req?.body?.funfact;


  if (!index) {
    return res.status(400).json({
      message: 'State fun fact index value required',
    });
  }

  if (!funfact) {
    return res.status(400).json({
      message: 'State fun fact value required',
    });
  }


  const state = await State.findOne({ statecode: statecode }).exec();

  if (!state) {

    const state_name = states_json.find(
      (state) => state.code === statecode
    ).state;


    res.json({ message: `No Fun Facts found for ${state_name}` });
  } else if (!state.funfacts[index - 1]) {

    const state_name = states_json.find(
      (state) => state.code === statecode
    ).state;

    res.json({ message: `No Fun Fact found at that index for ${state_name}` });
  } else {

    state.funfacts[index - 1] = funfact;


    const result = await state.save();

    res.json(result);
  }
};

const delete_fact = async (req, res) => {
  const statecode = req?.params?.state;
  const index = req?.body?.index;

  if (!index) {
    return res.status(400).json({
      message: 'State fun fact index value required',
    });
  }

  const state = await State.findOne({ statecode: statecode }).exec();

  if (!state) {


    const state_name = states_json.find(
      (state) => state.code === statecode
    ).state;


    res.json({ message: `No Fun Facts found for ${state_name}` });
  } else if (!state.funfacts[index - 1]) {


    const state_name = states_json.find(
      (state) => state.code === statecode
    ).state;

    res.json({ message: `No Fun Fact found at that index for ${state_name}` });
  } else {

    state.funfacts.splice(index - 1, 1);


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
