function applyBionicReading(inputText) {
    let words = inputText.split(" ");
    
    let bionicText = words.map(word => {
        if (word.length > 2 && word != "<br>") {
            return `<b>${word.slice(0, Math.ceil(word.length / 2))}</b>${word.slice(Math.ceil(word.length / 2))}`;
        }
        return word;
    }).join(" ");
    return bionicText;
};

function textChanged() {
    let inputText = document.getElementById("userText").value;
    document.getElementById("outputText").innerHTML = applyBionicReading(inputText);    
};




document.getElementById('pdf-upload').addEventListener('change', function(event) {
    document.getElementById("outputText").innerHTML = "Loading document...";
    const file = event.target.files[0];
    const pdfTextContainer = document.getElementById('pdf-text');
    
    const reader = new FileReader();

    reader.onload = function(e) {
        const arrayBuffer = e.target.result;

        // Use PDF.js to load the PDF
        pdfjsLib.getDocument(arrayBuffer).promise.then(function(pdf) {
            let paragraphs = [];
            const numPages = pdf.numPages;

            // Iterate through all pages to extract text and detect paragraphs
            let pagesProcessed = 0;
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                pdf.getPage(pageNum).then(function(page) {
                    page.getTextContent().then(function(text) {
                        let pageTextItems = text.items;

                        // Function to group text items into paragraphs
                        let currentParagraph = [];
                        let lastY = null;
                        let lineThreshold = 20; // Distance threshold between lines (in points)

                        pageTextItems.forEach(function(item) {
                            if (lastY !== null && Math.abs(lastY - item.transform[5]) > lineThreshold) {
                                // When the vertical gap between current item and last item is large, consider as a new paragraph
                                paragraphs.push(currentParagraph.join(' '));
                                currentParagraph = [];
                            }
                            currentParagraph.push(item.str);
                            lastY = item.transform[5]; // The Y position is at transform[5]
                        });

                        // Add the last paragraph
                        if (currentParagraph.length > 0) {
                            paragraphs.push(currentParagraph.join(' '));
                        }

                        // Once all pages are processed, display the paragraphs
                        pagesProcessed++;
                        if (pagesProcessed === numPages) {
                            //pdfTextContainer.textContent = paragraphs.join('\n\n'); // Display paragraphs
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

