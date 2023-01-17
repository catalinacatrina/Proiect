
const SERVER = 'http://localhost:8080'
const list = []

const load = async() => {
	try {
		const response  = await fetch(`${SERVER}/register`)

		const data = await response.json()
		
		const list = document.getElementsByClassName('modelList')[0]

		const content = data.map( e => `
			<div class='car' style='background-color:${e.color};'>
				<span style='color:${e.color};filter:invert(1);'>Name: <b>${e.name},</b></span>
				<span style='color:${e.color};filter:invert(1);'>Year: <b>${e.year} </b></span>
				<span style='color:${e.color};filter:invert(1);'>ID: <b>${e.id} </b></span>
				<span style="float:right;" >
					<input type="button" value="Delete" class="delete" data-id="${e.id}" />  
				</span>
			</div>
		`).join('')
		
		list.innerHTML = content

		list.querySelectorAll('.delete').forEach( e => {
			e.onclick = async() => {
				const id = e.getAttribute('data-id')
				
				await fetch(`${SERVER}/register/${id}`, {
					method: 'DELETE'
				})
				await load();
			}
		})
	} catch(error) {
		console.warn(error)
	}
}

window.onload = async() => {
	console.log("it started loading")
	
	await load()
	
	const name  = document.getElementById("modelName"  )
	const year  = document.getElementById("modelYear"  )
	const color = document.getElementById("colorpicker")
	
	const register = document.getElementById("register")
	const change    = document.getElementById("change")
	
	register.onclick = async() => {
		try {
			const payload = {
				name : name .value,
				color: color.value,
				year : year. value
			}
			
			await fetch(`${SERVER}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})

			await load()
		} catch(error) {
			console.warn(error)
		}
	}
}