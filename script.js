function highlightText() {
    let paragraph = document.getElementById("text");
    let words = paragraph.innerText.split(" ");
    let newText = words.map(word => {
        if (word.length > 2) {
            return `<b>${word.slice(0, Math.ceil(word.length / 2))}</b>${word.slice(Math.ceil(word.length / 2))}`;
        }
        return word;
    }).join(" ");
    paragraph.innerHTML = newText;
}
