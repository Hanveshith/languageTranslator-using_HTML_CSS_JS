let selectTag = document.querySelectorAll("select");
let inputText = document.getElementById("frominput");
let outputText = document.getElementById("fromoutput");
let translatebutton = document.getElementById("submit");
let exchangeicon = document.getElementById("exchange");
let copyicons = document.querySelectorAll(".fa-copy");
let speakicons = document.querySelectorAll(".fa-volume-up");
const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

selectTag.forEach((t,id)=>{
    for(const country in countries){
        let select;
        if(id==0 && country == "en-GB"){
            select = "selected";
        }
        else if(id == 1 && country == "te-IN"){
            select = "selected";
        }
        let option = `<option value="${country}" ${select}>${countries[country]}</option>`;
        t.insertAdjacentHTML('beforeend',option);
    }
})
translatebutton.addEventListener("click",()=>{
    let tempinput = inputText.value;
    let translatefrom = selectTag[0].value;
    let translateto = selectTag[1].value;
    let url = `https://api.mymemory.translated.net/get?q=${tempinput}&langpair=${translatefrom}|${translateto}`;
    fetch(url).then(res => res.json().then(data =>{
        outputText.value = data.responseData.translatedText;
    }))
})

exchangeicon.addEventListener("click",()=>{
    tempbox1_input = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempbox1_input;
    temptranslate_from = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = temptranslate_from;
})

copyicons.forEach(icon=>{
    icon.addEventListener("click",()=>{
        if(icon.id == "copy-1"){
            navigator.clipboard.writeText(inputText.value);
        }
        if(icon.id == "copy-2"){
            navigator.clipboard.writeText(outputText.value);
        }
    })
})

speakicons.forEach(icon=>{
    icon.addEventListener("click",()=>{
        let text;
        if(icon.id == "speak-1"){
            text = new SpeechSynthesisUtterance(inputText.value);
        }
        if(icon.id == "speak-2"){
            text = new SpeechSynthesisUtterance(outputText.value);
        }
        speechSynthesis.speak(text);
    })
})
