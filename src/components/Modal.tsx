//import styles from './Modal.module.css'

import { useState, useEffect } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import axios from 'axios'
import type { User } from '../types'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { closeModal } from '../store/modalSlice'

const apiUrl = 'https://698b6cf66c6f9ebe57bca4e4.mockapi.io/wb-api/profiles'

interface ModalProps {
    modalClose: () => void
}

const Modal = ({ modalClose }: ModalProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { isOpen, editingUser, mode } = useSelector(
        (state: RootState) => state.modal,
    )

    const initialFormData = {
        name: '',
        email: '',
        phone: '',
        age: '' as unknown as string | number,
        city: '',
        date: '',
        address: '',
        post_index: '' as unknown as string | number,
        country: '',
        buy_count: 0,
        total_cost: 0,
        card_number: '',
        payment_status: true,
        discount: 0,
        bonus_count: 0,
        level: 1,
        referals: 0,
        id: '',
        date_of_created: '',
    }

    const [formData, setFormData] = useState(initialFormData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Инициализация формы при открытии модального окна
    useEffect(() => {
        if (editingUser && mode === 'edit') {
            setFormData({
                id: editingUser.id,
                name: editingUser.name,
                email: editingUser.email,
                phone: editingUser.phone,
                age: editingUser.age || '',
                city: editingUser.city || '',
                date: editingUser.date || '',
                address: editingUser.address || '',
                post_index: editingUser.post_index || '',
                country: editingUser.country || '',
                buy_count: Number(editingUser.buy_count),
                total_cost: Number(editingUser.total_cost),
                card_number: editingUser.card_number,
                payment_status: editingUser.payment_status,
                discount: Number(editingUser.discount),
                bonus_count: Number(editingUser.bonus_count),
                level: Number(editingUser.level),
                referals: Number(editingUser.referals),
                date_of_created: editingUser.date_of_created,
            })
        }
    }, [editingUser, mode])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { id, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        setFormData((prev) => ({
            ...prev,
            [id]:
                type === 'checkbox'
                    ? checked
                    : type === 'number'
                      ? value === ''
                          ? ''
                          : Number(value)
                      : value,
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const statusElement = document.getElementById(
                'status',
            ) as HTMLSelectElement

            const submitData: User = {
                ...formData,
                age: formData.age === '' ? null : Number(formData.age),
                post_index:
                    formData.post_index === ''
                        ? null
                        : Number(formData.post_index),
                buy_count: Number(formData.buy_count),
                total_cost: Number(formData.total_cost),
                discount: Number(formData.discount),
                bonus_count: Number(formData.bonus_count),
                level: Number(formData.level),
                referals: Number(formData.referals),
                status: statusElement?.value || '',
                id: formData.id,
                date_of_created:
                    formData.date_of_created || new Date().toISOString(),
            } as unknown as User

            if (mode === 'edit' && formData.id) {
                // Отправка PUT запроса при редактировании
                await axios.put(`${apiUrl}/${formData.id}`, submitData)
                console.log('Пользователь обновлен:', submitData)
            } else {
                // Отправка POST запроса при создании
                await axios.post(apiUrl, submitData)
                console.log('Пользователь создан:', submitData)
            }

            dispatch(closeModal())
            modalClose()
        } catch (err: unknown) {
            const axiosError = err as
                | { response?: { data?: { message?: string } } }
                | Error
            let errorMessage = 'Ошибка при сохранении данных'

            if (
                'response' in axiosError &&
                axiosError.response?.data?.message
            ) {
                errorMessage = axiosError.response.data.message
            } else if ('message' in axiosError) {
                errorMessage = axiosError.message
            }

            setError(errorMessage)
            console.error('Ошибка:', err)
        } finally {
            setLoading(false)
        }
    }

    const modalHendlerClose = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        if (
            target.id === 'userModal' ||
            target.id === 'closeModalBtn' ||
            target.id === 'cancelBtn'
        ) {
            setError(null)
            dispatch(closeModal())
            modalClose()
        }
    }

    if (!isOpen) return null

    const modalTitle =
        mode === 'edit'
            ? `Редактировать пользователя: ${formData.name}`
            : 'Добавить пользователя'

    return (
        <div className="modal" id="userModal" onClick={modalHendlerClose}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 id="modalTitle">{modalTitle}</h2>
                    <button
                        className="close-btn"
                        id="closeModalBtn"
                        onClick={modalHendlerClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {error && (
                        <div id="message" className="message error">
                            {error}
                        </div>
                    )}
                    <form id="userForm" onSubmit={handleSubmit}>
                        <input type="hidden" id="userId" value={formData.id} />

                        <div className="form-group">
                            <label htmlFor="name">Имя *</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Телефон *</label>
                            <input
                                type="tel"
                                id="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Возраст *</label>
                            <input
                                type="number"
                                id="age"
                                className="form-control"
                                min="1"
                                max="120"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">Город *</label>
                            <input
                                type="text"
                                id="city"
                                className="form-control"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Дата рождения</label>
                            <input
                                type="date"
                                id="date"
                                className="form-control"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Адрес</label>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="post_index">
                                    Почтовый индекс
                                </label>
                                <input
                                    type="number"
                                    id="post_index"
                                    className="form-control"
                                    value={formData.post_index}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="country">Страна</label>
                                <input
                                    type="text"
                                    id="country"
                                    className="form-control"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="buy_count">
                                    Кол-во покупок
                                </label>
                                <input
                                    type="number"
                                    id="buy_count"
                                    className="form-control"
                                    min="0"
                                    value={formData.buy_count}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="total_cost">
                                    Сумма покупок (₽)
                                </label>
                                <input
                                    type="number"
                                    id="total_cost"
                                    className="form-control"
                                    min="0"
                                    step="0.01"
                                    value={formData.total_cost}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_number">Номер карты</label>
                            <input
                                type="text"
                                id="card_number"
                                className="form-control"
                                placeholder="Visa, Mastercard..."
                                value={formData.card_number}
                                onChange={handleChange}
                            />
                        </div>

                        <div
                            className="form-group"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <input
                                type="checkbox"
                                id="payment_status"
                                checked={formData.payment_status}
                                onChange={handleChange}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <label
                                htmlFor="payment_status"
                                style={{ marginBottom: 0 }}
                            >
                                Платёжное средство подтверждено
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="discount">Скидка (%)</label>
                                <input
                                    type="number"
                                    id="discount"
                                    className="form-control"
                                    min="0"
                                    max="100"
                                    value={formData.discount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="bonus_count">
                                    Бонусные баллы
                                </label>
                                <input
                                    type="number"
                                    id="bonus_count"
                                    className="form-control"
                                    min="0"
                                    value={formData.bonus_count}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="level">Уровень</label>
                                <select
                                    id="level"
                                    className="form-control"
                                    value={formData.level}
                                    onChange={handleChange}
                                >
                                    <option value={1}>Платиновый (1)</option>
                                    <option value={2}>Золотой (2)</option>
                                    <option value={3}>Серебряный (3)</option>
                                    <option value={4}>Бронзовый (4+)</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor="referals">Рефералы</label>
                                <input
                                    type="number"
                                    id="referals"
                                    className="form-control"
                                    min="0"
                                    value={formData.referals}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Статус</label>
                            <select id="status" className="form-control">
                                <option value="active">Активный</option>
                                <option value="inactive">Неактивный</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn"
                        id="cancelBtn"
                        onClick={modalHendlerClose}
                        disabled={loading}
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        form="userForm"
                        className="btn btn-success"
                        id="saveUserBtn"
                        disabled={loading}
                    >
                        {loading
                            ? 'Сохранение...'
                            : mode === 'edit'
                              ? 'Обновить'
                              : 'Создать'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
