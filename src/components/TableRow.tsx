//import styles from './TableRow.module.css'

import { NavLink } from 'react-router-dom'
import { validateDate } from '../utils/ut.ts'
import type { User } from '../types'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { openEditModal } from '../store/modalSlice'

interface TableRowProps {
    user: User
    onDeleteUser?: (userId: string, userName: string) => Promise<void> | void
}

const TableRow = ({ user, onDeleteUser }: TableRowProps) => {
    const { id, name, email, phone, age, city, date } = user
    const dispatch = useDispatch<AppDispatch>()

    const handleEditClick = () => {
        dispatch(openEditModal(user))
    }

    const handleDeleteClick = () => {
        if (onDeleteUser) {
            onDeleteUser(id, name)
        }
    }

    return (
        <tr>
            <td>{id}</td>
            <td>
                <NavLink to={`/profile?id=${user.id}`}>{name}</NavLink>
            </td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{age}</td>
            <td>{city}</td>
            <td>{validateDate(date)}</td>
            <td>
                <div className="actions">
                    <button className="btn btn-edit" onClick={handleEditClick}>
                        Редактировать
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={handleDeleteClick}
                    >
                        Удалить
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow
