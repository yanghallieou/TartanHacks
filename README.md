# TartanHacks

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bionic Reading Tool</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bionic Reading Tool</h1>
        </div>

        <div class="input-container">
            <textarea id="userText" placeholder="Enter your text here..."></textarea>
        </div>

        <div class="button-container">
            <button onclick="textChanged()">Apply Bionic Reading</button>
            <label for="pdf-upload" class="upload-button">Upload PDF</label>
            <input id="pdf-upload" type="file" />
        </div>

        <div class="output-container">
            <p id="outputText"></p>
        </div>

        <div id="loading" class="loading hidden">Processing PDF...</div>
    </div>

    <script src="script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
</body>
</html>
