const PackageOptionExtraService = require('../services/PackageOptionExtraService')

module.exports.getAll = async (req, res) => {
	const { id } = req.params;
	try {
		let objs = await PackageOptionExtraService.getAll(id)
		res.json(objs)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.getOne = async (req, res) => {
	const { id, optionid } = req.params;
	let obj = await PackageOptionExtraService.getOne(id, optionid)
	res.json(obj)
}

module.exports.create = async (req, res) => {
	const { extra } = req.body
	const { id } = req.params;
	
	if (!extra) {
  	return res.status(400).send('request missing required params');
	}
	
	try {
		let obj = await PackageOptionExtraService.create({ PackageId: id, PackageExtraId: extra })
		res.json(obj)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.update = async (req, res) => {
	const { extra } = req.body
	const { id, optionid } = req.params;

	if (!extra) {
			return res.status(400).send('request missing required params');
	}
	
	try {
		let obj = await PackageOptionExtraService.update(optionid, { PackageId: id, PackageExtraId: extra })
		res.json(obj)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.delete = async (req, res) => {
	const { id, optionid } = req.params;

	if (!Number(id)) {
		return res.status(400).send('Please input a valid numeric value');
	}

	try {
		const obToDelete = await PackageOptionExtraService.delete(id, optionid);

		if (obToDelete) {
			res.status(200).send('package option deleted')
		} else {
			res.status(404).send(`package option with the id ${id} cannot be found`);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}
