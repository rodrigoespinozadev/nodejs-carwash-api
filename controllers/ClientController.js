const ClientService = require('../services/ClientService')

module.exports.getAll = async (req, res) => {
	let clients = await ClientService.getAll()
	res.json(clients)
}

module.exports.getClient = async (req, res) => {
	const { id } = req.params;
	if (!Number(id)) {
		return res.status(400).send('Please input a valid numeric value');
	}
	try {
		let client = await ClientService.getClient(id)
		res.json(client)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.update = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req	
	const updateObj = req.body
	const { id } = req.params;

	if (!Number(id)) {
		return res.status(400).send('Please input a valid numeric value');
	}
	
	try {
		const updateClient = await ClientService.update(authToken ? user.id : id, updateObj);
		if (!updateClient) {
			res.status(404).send(`Cannot find client with the id: ${id}`);
		} else {
			res.json(updateClient);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.delete = async (req, res) => {
	const { id } = req.params;

	if (!Number(id)) {
		return res.status(400).send('Please input a valid numeric value');
	}

	try {
		const clientToDelete = await ClientService.delete(id);

		if (clientToDelete) {
			res.status(200).send('client deleted')
		} else {
			res.status(404).send(`client with the id ${id} cannot be found`);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.register = async (req, res) => {
	const { email, password, telefono, full_name } = req.body;
	
	if (!password || !email) {
    return res.status(400).send('request missing password or email param');
  }

	try {
		let client = await ClientService.createClient(req.body);
		await client.generateProfile(email, telefono, full_name)
		let authorize = await client.authorize();
		res.json(authorize);
	} catch(err) {
		res.status(400).send(err);
	}
}

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
	
	if (!username || !password) {
    return res.status(400).send('request missing username or password param');
  }

  try {
		let client = await ClientService.authenticate(req.body)
    res.json(client);
  } catch (err) {
    res.status(400).send('invalid username or password');
  }
}

module.exports.logout = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req	

	if (user && authToken) {
    await req.user.logout(authToken);
    res.status(204).send()
  } else {
		res.status(400).send('not authenticated');
	}
}

module.exports.me = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
		res.status(404).send('missing auth token');
	}
}