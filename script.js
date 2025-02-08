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

// Function to apply Bionic Reading effect to any text element
function applyBionicReadingForOurTexts() {
    // Apply Bionic Reading to the title as well as other static elements
    const textElements = document.querySelectorAll('h1, p, button');
    
    textElements.forEach(element => {
        let text = element.innerHTML;

        // Apply Bionic Reading to each word
        let modifiedText = text.split(' ').map(word => {
            let boldedPart = word.slice(0, Math.ceil(word.length / 2));  // First part of the word
            let remainingPart = word.slice(Math.ceil(word.length / 2)); // Remaining part of the word

            return `<b>${boldedPart}</b>${remainingPart}`;
        }).join(' ');

        // Update the text with the Bionic Reading applied
        element.innerHTML = modifiedText;
    });
}

// Apply Bionic Reading to the text on page load
window.onload = function() {
    applyBionicReadingForOurTexts();  // Apply to title and other text elements
}
