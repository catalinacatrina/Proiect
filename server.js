const express   = require('express')
const sequelize = require('sequelize')
const cors      = require('cors');

const seq = new sequelize({
	dialect: 'sqlite',
	storage: 'my.db'
})

const CarModel = seq.define('car', {
	name : {
		type: sequelize.STRING,
		allowNull: false
	},
	color : {
		type: sequelize.STRING,
		allowNull: false,
		unique: true
	},
	year : {
		type: sequelize.STRING,
		allowNull: false,
		len: [4]
	},
})

seq.sync({ alter: true })
	.then(() => {
		console.log('tables created')
	})

app = express()

app.use(cors());
app.options('*', cors());

app.use(express.static('public'))
app.use(express.json())

app.get('/register', async (req, res, next) => {
	try {
		const cars = await CarModel.findAll()
		res.json(cars)
	} catch {
		next(error)
	}
})

app.post('/register', async (req, res, next) => {
	try {
		const car = await CarModel.create(req.body)
		console.log(req.body)
		res.json(car)
	} catch {
		console.log("INVALID COLOR")
	}
})

app.delete('/register/:id', async (req, res, next) => {
	try {
		const car = await CarModel.findByPk(req.params.id)
		
		if(car) {
			await car.destroy()
			res.json({ message: "success" })
		} else {
			res.json({ message: "car not found" })
		}
		
	} catch(error) {
		next(error)
	}
})

app.use((error, req, res, next) => {
	console.warn(error)
	res.status(500).json({ message: 'server error' })
})

app.listen(8080, () => {
	console.log('Server started on port 8080');
});