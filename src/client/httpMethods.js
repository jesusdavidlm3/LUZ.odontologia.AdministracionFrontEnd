import axios from 'axios'

const url = 'http://localhost:3000'

export class httpMethods {
	constructor(){
	}

	async get(apiAddress, token, value){
		try{
			if(value){
				let res = await axios.get(`${url}/${apiAddress}/${value}`, {headers: {'Authorization': `Bearer ${token}`}})
				return res
			}else if(value == null){
				let res = await axios.get(`${url}/${apiAddress}/`, {headers: {'Authorization': `Bearer ${token}`}})
				return res
			}
		}catch(err){
			return(err)
		}	
	}

	async post(apiAddress, token, data){
		try{
			if(token){
				let res = await axios.post(`${url}/${apiAddress}`, data, {headers: {'Authorization': `Bearer ${token}`}})
				return res
			}else if(token == null){
				let res = await axios.post(`${url}/${apiAddress}`, data)
				return res
			}
		}catch(err){
			return(err)
		}
	}

	async put(apiAddress, token, data){
		try{
			let res = await axios.put(`${url}/${apiAddress}`, {headers: {'Authorization': `Bearer ${token}`}})
			return res
		}catch(err){
			return(err)
		}
	}

	async patch(apiAddress, token, data){
		try{
			let res = await axios.patch(`${url}/${apiAddress}`, {headers: {'Authorization': `Bearer ${token}`}})
			return res
		}catch(err){
			return(err)
		}
	}

	async delete(apiAddress, token, value){
		try{
			let res = await axios.delete(`${url}/${apiAddress}/${value}`, {headers: {'Authorization': `Bearer ${token}`}})
			return res
		}catch(err){
			return(err)
		}
	}
}