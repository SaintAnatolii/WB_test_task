import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types'

interface ModalState {
    isOpen: boolean
    editingUser: User | null
    mode: 'create' | 'edit'
}

const initialState: ModalState = {
    isOpen: false,
    editingUser: null,
    mode: 'create',
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCreateModal: (state) => {
            state.isOpen = true
            state.mode = 'create'
            state.editingUser = null
        },
        openEditModal: (state, action: PayloadAction<User>) => {
            state.isOpen = true
            state.mode = 'edit'
            state.editingUser = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.editingUser = null
            state.mode = 'create'
        },
    },
})

export const { openCreateModal, openEditModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
