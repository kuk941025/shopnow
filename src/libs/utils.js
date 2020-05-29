const getLangCode = () => {
    //get language data from local storage
    let lang = localStorage.getItem("lang");

    //if theres no data, save browser default value to local storage
    if (!lang){
        lang = window.navigator.language;
        localStorage.setItem("lang", lang);
    }

    switch (lang){
        case "en-US":
            return 0
        default:
            return 1
    }    
}

export const langCode = getLangCode();

export const localString = (key) => {
    try {
        return key[langCode];
    } catch (err) {
        return "";
    }
}

export const setLangCode = (idx) => {
    if (idx === 0)
        localStorage.setItem("lang", "en-US");
    else
        localStorage.setItem("lang", "ko");

    window.location.reload();
}