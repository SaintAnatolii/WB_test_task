//import styles from './Table.module.css'

import TableRow from './TableRow'
import type { User } from '../types'

interface TableProps {
    users: User[]
    onDeleteUser?: (userId: string, userName: string) => Promise<void> | void
}

const Table = ({ users, onDeleteUser }: TableProps) => {
    return (
        <>
            <div className="table-container">
                <table id="usersTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Телефон</th>
                            <th>Возраст</th>
                            <th>Город</th>
                            <th>Дата рождения</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody">
                        {users.map((user: User) => (
                            <TableRow
                                key={user.id}
                                user={user}
                                onDeleteUser={onDeleteUser}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table
