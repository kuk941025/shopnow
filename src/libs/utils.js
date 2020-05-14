const getLangCode = () => {
    switch (window.navigator.language){
        case "en-US":
            return 0
        default:
            return 1
    }    
}

const langCode = getLangCode();

export const localString = (key) => {
    try {
        return key[langCode];
    } catch (err) {
        return "";
    }
}
