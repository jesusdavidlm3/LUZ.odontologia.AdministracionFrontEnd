import { useEffect, useState } from 'react'
import { Input, Button, Tooltip } from 'antd'
import {EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { AddNewUserModal as AddNewUser, DeleteUserModal as DeleteUser } from '../components/Modals'
import { getAllUsers } from '../client/client'
import { searchOnList, identificationList, userTypeList } from '../context/lists'

const UserAdministration = () => {

	//Control de la UI
	const [showList, setShowList] = useState([])
	const [selectedItem, setSelectedItem] = useState('')

	//Control de modals
	const [addNewUserModal, setNewUserModal] = useState(false)
	const [deleteUserModal, setDeleteUserModal] = useState(false)
	const [edituserModal, setEditUserModal] = useState(false)

	//Funciones
	useEffect(() => {
		getUserList()
	}, [])

	async function getUserList() {
		let res = await getAllUsers()
		console.log(res)
		setShowList(res.data)
	}

	return(
		<div className='UserAdministration'>
			<div className='searchBar' >
				<Input.Search placeholder='Ingrese cedula o nombre de algun usuario' />
				<Button variant='solid' color='primary' onClick={() => setNewUserModal(true)}>Agregar usuario</Button>
			</div>
			<div className='listContainer' >
				{ showList.map(item => (
					<div className='listItem' >
						<div className='info'>
							<h4>{searchOnList(identificationList, item.identificationType)}-{item.identification} {item.name} {item.lastname} - {searchOnList(userTypeList, item.type)} </h4>
						</div>
						<div className='buttons'>
							<Tooltip onClick={() => {setSelectedItem(item); setEditUserModal(true)}} title='Editar'><Button shape='circle' variant='solid' color='primary' size='large' icon={<EditOutlined />} /></Tooltip>
							<Tooltip onClick={() => {setSelectedItem(item); setDeleteUserModal(true)}} title='Eliminar'><Button shape='circle' variant='solid' color='danger' size='large' icon={<DeleteOutlined />} /></Tooltip>
						</div>
					</div>
				)) }
			</div>

			<AddNewUser
				open={addNewUserModal}
				onCancel={() => setNewUserModal(false)}
				updateList={() => getUserList()}
			/>

			<DeleteUser
				open={deleteUserModal}
				onCancel={() => setDeleteUserModal(false)}
				updateList={() => getUserList()}
				id={selectedItem.id}
			/>
		</div>
	)
}

export default UserAdministration