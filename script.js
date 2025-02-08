function applyBionicReading(inputText) {
    let words = inputText.split(" ");
    
    let bionicText = words.map(word => {
        if (word.length > 2 && word != "<br>") {
            return `<b>${word.slice(0, Math.ceil(word.length / 2))}</b>${word.slice(Math.ceil(word.length / 2))}`;
        }
        return word;
    }).join(" ");
    return bionicText;
}

function textChanged() {
    let inputText = document.getElementById("userText").value;
    document.getElementById("outputText").innerHTML = applyBionicReading(inputText);
    
    var sliders = document.getElementById('sliders');
    sliders.style.display = 'flex';

    var output = document.getElementById('output');
    output.style.display = 'flex';
}


function updateStyles() {
    let fontSize = document.getElementById("fontSizeSlider").value;
    let lineHeight = document.getElementById("lineHeightSlider").value;

    document.getElementById("outputText").style.fontSize = fontSize + "px";
    document.getElementById("outputText").style.lineHeight = lineHeight;

    document.getElementById("fontSizeValue").textContent = fontSize + "px";
    document.getElementById("lineHeightValue").textContent = lineHeight;
}



document.getElementById('pdf-upload').addEventListener('change', function(event) {
    var sliders = document.getElementById('sliders');
    sliders.style.display = 'flex';

    var output = document.getElementById('output');
    output.style.display = 'flex';

    document.getElementById("outputText").innerHTML = "Loading document...";
    const file = event.target.files[0];
    const pdfTextContainer = document.getElementById('pdf-text');
    
    const reader = new FileReader();

    reader.onload = function(e) {
        const arrayBuffer = e.target.result;

        pdfjsLib.getDocument(arrayBuffer).promise.then(function(pdf) {
            let paragraphs = [];
            const numPages = pdf.numPages;

            let pagesProcessed = 0;
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                pdf.getPage(pageNum).then(function(page) {
                    page.getTextContent().then(function(text) {
                        let pageTextItems = text.items;

                        let currentParagraph = [];
                        let lastY = null;
                        let lineThreshold = 25;

                        pageTextItems.forEach(function(item) {
                            if (lastY !== null && Math.abs(lastY - item.transform[5]) > lineThreshold) {
                    
                                paragraphs.push(currentParagraph.join(' '));
                                currentParagraph = [];
                            }
                            currentParagraph.push(item.str);
                            lastY = item.transform[5]; 
                        });

                        if (currentParagraph.length > 0) {
                            paragraphs.push(currentParagraph.join(' '));
                        }

                        pagesProcessed++;
                        if (pagesProcessed === numPages) {
                            textContent = paragraphs.join(' <br> ');
                            document.getElementById("outputText").innerHTML = applyBionicReading(textContent);
                        }
                    });
                });
            }
        }).catch(function(error) {
            console.error('Error extracting text from PDF:', error);
            pdfTextContainer.textContent = 'Error reading the PDF file.';
        });
    };

    // Read the PDF file as array buffer
    reader.readAsArrayBuffer(file);
});

