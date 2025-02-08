function applyBionicReading() {
    let inputText = document.getElementById("userText").value;
    let words = inputText.split(" ");
    
    let bionicText = words.map(word => {
        if (word.length > 2) {
            return `<b>${word.slice(0, Math.ceil(word.length / 2))}</b>${word.slice(Math.ceil(word.length / 2))}`;
        }
        return word;
    }).join(" ");
    
    document.getElementById("outputText").innerHTML = bionicText;
}
