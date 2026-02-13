//import styles from './MainPage.module.css'

import Table from '../components/Table'
import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import axios, { AxiosError } from 'axios'
import type { User } from '../types'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { openCreateModal, closeModal } from '../store/modalSlice'

const apiUrl = 'https://698b6cf66c6f9ebe57bca4e4.mockapi.io/wb-api/profiles'

const MainPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10
    const dispatch = useDispatch<AppDispatch>()
    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)

    const loadUsers = async () => {
        setLoading(true)
        try {
            const response = await axios.get<User[]>(apiUrl)
            setUsers(response.data)
            setError(null)
        } catch (err) {
            const error = err as AxiosError
            console.error('Ошибка:', error)
            setError(error.message || 'Ошибка при загрузке')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const handleModalClose = () => {
        dispatch(closeModal())
        loadUsers()
    }

    const handleAddUser = () => {
        dispatch(openCreateModal())
    }

    const handleChangePage = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const handleDeleteUser = async (userId: string, userName: string) => {
        const confirmed = window.confirm(
            `Вы уверены, что хотите удалить пользователя "${userName}"?`,
        )
        if (!confirmed) return

        try {
            await axios.delete(`${apiUrl}/${userId}`)
            console.log('Пользователь удален')
            loadUsers()
        } catch (err) {
            const error = err as AxiosError
            console.error('Ошибка при удалении:', error)
            setError(error.message || 'Ошибка при удалении пользователя')
        }
    }

    return (
        <>
            {error && (
                <div id="message" className="message error">
                    {error}
                </div>
            )}
            {loading ? (
                <div className="loading" id="loading">
                    Загрузка данных...
                </div>
            ) : (
                <>
                    <div className="header">
                        <h1>Список пользователей</h1>
                        <button
                            className="btn btn-primary"
                            id="addUserBtn"
                            onClick={handleAddUser}
                        >
                            Добавить пользователя
                        </button>
                    </div>

                    {users && (
                        <>
                            {(() => {
                                const totalPages = Math.ceil(
                                    users.length / itemsPerPage,
                                )
                                const startIndex =
                                    (currentPage - 1) * itemsPerPage
                                const endIndex = startIndex + itemsPerPage
                                const paginatedUsers = users.slice(
                                    startIndex,
                                    endIndex,
                                )

                                return (
                                    <>
                                        <Table
                                            users={paginatedUsers}
                                            onDeleteUser={handleDeleteUser}
                                        />
                                        <div
                                            className="pagination"
                                            id="pagination"
                                        >
                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1,
                                            ).map((pageNumber) => (
                                                <button
                                                    key={pageNumber}
                                                    className={`pagination-btn ${
                                                        pageNumber ===
                                                        currentPage
                                                            ? 'active'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        handleChangePage(
                                                            pageNumber,
                                                        )
                                                    }
                                                >
                                                    {pageNumber}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )
                            })()}
                        </>
                    )}
                    {isModalOpen && <Modal modalClose={handleModalClose} />}
                </>
            )}
        </>
    )
}

export default MainPage
