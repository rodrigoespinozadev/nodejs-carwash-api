const PackageService = require('../services/PackageService')
const PackageOptionExtraService = require('../services/PackageOptionExtraService')

module.exports.getAll = async (req, res) => {
	try {
		let objs = await PackageService.getAll()
		res.json(objs)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.getOne = async (req, res) => {
	const { id } = req.params;
	let obj = await PackageService.getOne(id)
	res.json(obj)
}

module.exports.create = async (req, res) => {
	const { name, price, description, extras } = req.body
	
	if (!name || !price || !description) {
    return res.status(400).send('request missing required params');
	}
	
	try {
		let package = await PackageService.create({ name, price, description })

		extras.forEach(extra => {
			PackageOptionExtraService.create({ PackageId: package.id, PackageExtraId: extra })
		})

		res.json(package)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.update = async (req, res) => {
	const { name, price, description, extras } = req.body
	const { id } = req.params;

	if (!name || !price || !description) {
			return res.status(400).send('request missing required params');
	}
	
	try {
		let package = await PackageService.update(id, { name, price, description })

		await PackageOptionExtraService.deleteAll(id)

		extras.forEach(extra => {
			PackageOptionExtraService.create({ PackageId: id, PackageExtraId: extra })
		})

		res.json(package)
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
		const obToDelete = await PackageService.delete(id);

		if (obToDelete) {
			res.status(200).send('package deleted')
		} else {
			res.status(404).send(`package with the id ${id} cannot be found`);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}
