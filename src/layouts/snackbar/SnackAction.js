export const SnackActionType = {
    "show": "ShowSnackMessage",
    "hide": "HideSnackMessage"
}

export const showMessage = msg => dispatch => {
    dispatch({ type: SnackActionType.show, data:msg });
}

export const closeMessage = msg => dispatch => {
    dispatch({ type: SnackActionType.hide, msg })
}
