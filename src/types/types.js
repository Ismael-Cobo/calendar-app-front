export const types = {
    //Notifications
    addNotification: 'ADD_NOTIFICATION',
    removeNotification: 'REMOVE_NOTIFICATION',

    //UI modal
    openModal: '[UI] Open modal',
    closeModal: '[UI] Close modal',

    //Calendar event

    eventSetActive: '[event] SetActive',
    eventStartNew: '[event] Start new',
    eventAddnew: '[event] Add new',
    eventUpdated: '[event] Updated',
    eventDeleted: '[event] Deleted',
    eventLoader: '[event] Loader',
    eventsReset: '[event] Reset',
    eventsResetActiveEvent: '[event] Reset active event',



    //Auth

    authChecking: '[auth] Checking login state',
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] login',
    authStartRegister: '[auth] Start register',
    authStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',




    
    //Type of message notification
    success: 'SUCCESS',
    error: 'ERROR',
    loading: 'LOADING'
}