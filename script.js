function applyBionicReading(inputText) {
    //let inputText = document.getElementById("userText").value;
    let words = inputText.split(" ");
    
    let bionicText = words.map(word => {
        if (word.length > 2 && word != "<br>") {
            return `<b>${word.slice(0, Math.ceil(word.length / 2))}</b>${word.slice(Math.ceil(word.length / 2))}`;
        }
        return word;
    }).join(" ");
    return bionicText;
    
    //document.getElementById("outputText").innerHTML = bionicText;
};

function textChanged() {
    let inputText = document.getElementById("userText").value;
    document.getElementById("outputText").innerHTML = applyBionicReading(inputText);
};


/* 
function extractTextAndDetectParagraphs()  {
    document.getElementById("outputText").innerHTML = "Loading document...";

    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();

        fileReader.onload = function() {
            const typedArray = new Uint8Array(this.result);
            // Load the PDF document
            pdfjsLib.getDocument(typedArray).promise.then(function(pdf) {
                let textContent = '';
                const numPages = pdf.numPages;

                // Loop through each page of the PDF
                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    pdf.getPage(pageNum).then(function(page) {
                        page.getTextContent().then(function(text) {
                            // Concatenate the text of the current page
                            text.items.forEach(function(item) {
                                textContent += item.str + '';
                            });

                            // If this is the last page, display the extracted text
                            if (pageNum === numPages) {
                                document.getElementById("outputText").innerHTML = applyBionicReading(textContent);
                            }
                        });
                    });
                }
            }).catch(function(error) {
                console.error('Error loading PDF: ' + error);
            });
        };

        // Read the PDF file
        fileReader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a valid PDF file.');
    }
};*/


function textMode() {
    // Get the elements by their IDs
    var textBox = document.getElementById('userText');

    // Toggle the 'hidden' class on each element to hide or show it
    textBox.style.display = 'block';
}

function pdfMode() {
    var textBox = document.getElementById('userText');
    textBox.style.display = 'none';

    var container = document.getElementById('containers');
    container.style.display = 'none';

    //var leftElement = document.getElementById('leftElement');
    //leftElement.style.display = 'none'; 

    //var leftContainer = document.getElementById('leftContainer');
    //leftContainer.classList.add('hidden');
}


document.getElementById('pdf-upload').addEventListener('change', function(event) {

    pdfMode();

    document.getElementById("outputText_pdf").innerHTML = "Loading document...";
    const file = event.target.files[0];
    const pdfTextContainer = document.getElementById('pdf-text');
    
    //if (fileInput.files.length === 0) {
    //    alert('Please select a PDF file first!');
    //    return;
    //}

    //const file = fileInput.files[0];
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
                            document.getElementById("outputText_pdf").innerHTML = applyBionicReading(textContent);
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
    //document.getElementById("outputText").innerHTML = bionicText;
//}
/*
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
    */
