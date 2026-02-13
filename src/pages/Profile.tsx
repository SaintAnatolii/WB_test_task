//import styles from './Profile.module.css'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import type { User } from '../types'

import { validateDate, getUserTime } from '../utils/ut.ts'

const apiUrl = 'https://698b6cf66c6f9ebe57bca4e4.mockapi.io/wb-api/profiles'

const Profile = () => {
    const [userData, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [referrals] = useState<number>(() => Math.floor(Math.random() * 100))

    useEffect(() => {
        axios
            .get<User>(
                `${apiUrl}/${new URLSearchParams(window.location.search).get('id')}`,
            )
            .then((res) => {
                setUser(res.data)
                setLoading(false)
            })
            .catch((err) => console.error(err))
    }, [])

    const createInitials = (name: string) => {
        return name ? name[0].toUpperCase() : ''
    }

    return (
        <>
            {loading ? (
                <div id="loading" className="loading">
                    Загрузка данных...
                </div>
            ) : (
                <>
                    <div className="header">
                        <h1>
                            <span id="userNameHeader">{userData?.name}</span>
                        </h1>
                        <div>
                            <NavLink to="/" className="btn btn-back">
                                Назад к списку
                            </NavLink>
                        </div>
                    </div>

                    <div className="profile-card" id="profileCard">
                        <div className="profile-header">
                            <div className="profile-avatar">
                                <span id="userInitials">
                                    {createInitials(userData?.name || '')}
                                </span>
                            </div>
                            <div className="profile-name" id="userFullName">
                                {userData?.name}
                            </div>

                            <div className="profile-stats">
                                <div className="stat-item">
                                    <div className="stat-label">
                                        Всего заказов
                                    </div>
                                    <div
                                        className="stat-value"
                                        id="userTotalOrders"
                                    >
                                        {userData?.buy_count || 0}
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">
                                        Сумма заказов
                                    </div>
                                    <div
                                        className="stat-value"
                                        id="userTotalAmount"
                                    >
                                        {userData?.total_cost || 0} ₽
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">С нами</div>
                                    <div
                                        className="stat-value"
                                        id="userMemberSince"
                                    >
                                        {getUserTime(userData?.date_of_created)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-body">
                            <div className="tabs">
                                <div className="tab active">
                                    Основная информация
                                </div>
                            </div>

                            <div id="tab-info" className="tab-content active">
                                <div className="info-section">
                                    <div className="section-title">
                                        Контактная информация
                                    </div>
                                    <div className="info-grid">
                                        <div className="info-card">
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Email:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userEmail"
                                                >
                                                    {userData?.email}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Телефон:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userPhone"
                                                >
                                                    {userData?.phone}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Возраст:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userAge"
                                                >
                                                    {userData?.age ||
                                                        'не указан'}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Дата рождения:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userBirthday"
                                                >
                                                    {validateDate(
                                                        userData?.date,
                                                    ) || 'Не указана'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="info-card">
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Город:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userCity"
                                                >
                                                    {userData?.city ||
                                                        'не указан'}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Адрес:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userAddress"
                                                >
                                                    {userData?.address ||
                                                        'не указан'}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Индекс:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userZip"
                                                >
                                                    {userData?.post_index ||
                                                        'не указан'}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Страна:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userCountry"
                                                >
                                                    {userData?.country ||
                                                        'не указан'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <div className="section-title">
                                        Платёжная информация
                                    </div>
                                    <div className="info-grid">
                                        <div className="info-card">
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Способ оплаты:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userPaymentMethod"
                                                >
                                                    Visa ****{' '}
                                                    {userData?.card_number}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Статус:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userPaymentStatus"
                                                >
                                                    {userData?.payment_status
                                                        ? 'подтвержден'
                                                        : 'не подтвержден'}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Скидка:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userDiscount"
                                                >
                                                    {userData?.payment_status
                                                        ? userData?.discount
                                                        : 0}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <div className="info-card">
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Бонусные баллы:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userBonus"
                                                >
                                                    {userData?.bonus_count || 0}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Уровень:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userLevel"
                                                >
                                                    {userData?.level == 1
                                                        ? 'Платиновый'
                                                        : userData?.level == 2
                                                          ? 'Золотой'
                                                          : userData?.level == 3
                                                            ? 'Серебряный'
                                                            : 'Бронзовый'}
                                                </span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">
                                                    Рефералов:
                                                </span>
                                                <span
                                                    className="info-value"
                                                    id="userReferrals"
                                                >
                                                    {referrals}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile
