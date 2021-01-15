const UserService = require('../services/UserService')

module.exports.getAllUsers = (req, res) => {
	UserService.getAllUsers().then(users => {
		res.json(users)
	})
}

module.exports.getUser = async (req, res) => {
	const { id } = req.params;
	if (!Number(id)) {
		res.status(400).send('Please input a valid numeric value');
	}
	try {
		let user = await UserService.getUser(id)
		res.json(user)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.update = async (req, res) => {
	const updateObj = req.body
	const { id } = req.params;
	if (!Number(id)) {
		res.status(400).send('Please input a valid numeric value');
	}
	try {
		const updateUser = await UserService.update(id, updateObj);
		if (!updateUser) {
			res.status(404).send(`Cannot find user with the id: ${id}`);
		} else {
			res.json(updateUser);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.delete = async (req, res) => {
	const { id } = req.params;

	if (!Number(id)) {
		res.status(400).send('Please input a valid numeric value');
	}

	try {
		const userToDelete = await UserService.delete(id);

		if (userToDelete) {
			res.status(200).send('user deleted')
		} else {
			res.status(404).send(`User with the id ${id} cannot be found`);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.register = async (req, res) => {
	try {
		let user = await UserService.addUser(req.body);
		let data = await user.authorize();
		res.json(data);
	} catch(err) {
		res.status(400).send(err);
	}
}

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
	
	if (!username || !password) {
    return res.status(400).send('Request missing username or password param');
  }

  try {
		let user = await UserService.authenticate(req.body)
    return res.json(user);
  } catch (err) {
    return res.status(400).send('invalid username or password');
  }
}

module.exports.logout = async (req, res) => {
	const { user, headers: { authorization: authToken } } = req

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