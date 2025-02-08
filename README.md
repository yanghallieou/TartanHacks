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














@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
    font-family: 'Inter', sans-serif;
    background-color: rgba(245, 245, 245, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 40px 24px;
}

.container {
    width: calc(100% - 48px);
    max-width: 700px;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
    font-size: 48px;
    font-weight: 700;
    color: rgba(30, 30, 30, 1);
    text-align: center;
    letter-spacing: -2%;
}

.input-container textarea {
    width: 100%;
    height: 100px;
    padding: 12px;
    font-size: 16px;
    border: 1px solid rgba(217, 217, 217, 1);
    border-radius: 8px;
    resize: none;
    outline: none;
}

.button-container {
    display: flex;
    flex-direction: row;
    column-gap: 12px;
    align-items: center;
    justify-content: center;
}

button, .upload-button {
    background-color: rgba(44, 44, 44, 1);
    color: rgba(245, 245, 245, 1);
    font-size: 16px;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover, .upload-button:hover {
    background-color: rgba(30, 30, 30, 1);
}

.upload-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(44, 44, 44, 1);
    cursor: pointer;
}

input[type="file"] {
    display: none;
}

.output-container {
    width: 100%;
    padding: 12px;
    background-color: rgba(245, 245, 245, 1);
    border-radius: 8px;
    border: 1px solid rgba(217, 217, 217, 1);
    min-height: 50px;
    font-size: 18px;
    color: rgba(30, 30, 30, 1);
}

.hidden {
    display: none;
}

.loading {
    font-size: 18px;
    font-weight: 700;
    color: rgba(30, 30, 30, 1);
}
