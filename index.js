let selectTag = document.querySelectorAll("select");
let inputText = document.getElementById("frominput");
let outputText = document.getElementById("fromoutput");
let translatebutton = document.getElementById("submit");
let exchangeicon = document.getElementById("exchange");
let copyicons = document.querySelectorAll(".fa-copy");
let speakicons = document.querySelectorAll(".fa-volume-up");

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