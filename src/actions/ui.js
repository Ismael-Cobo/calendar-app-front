import { types } from "../types/types"

export const openModal = () => {
    return{
        type: types.openModal
    }
}

export const CloseModal = () => {
    return{
        type: types.closeModal
    }
}