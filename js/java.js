document.addEventListener("DOMContentLoaded", function () {
    // assign file upload to a var
    const imageUpload = document.getElementById("file-upload");
    const gridItems = document.querySelectorAll('.grid-item');
    const errorContainer = document.querySelector(".error-message");
    const downloadButton = document.getElementById('button');

    // color picker variabls
    const colorPickers = [
        document.getElementById('colorPicker1'),
        document.getElementById('colorPicker2'),
        document.getElementById('colorPicker3'),
        document.getElementById('colorPicker4')
    ];

    // var for color picker div
    const colorContainers = document.querySelectorAll('.color');

    // dictates that colorContainers background is assigned to the color picker value NOT WORKING
    function updateColorContainers() {
        
        colorPickers.forEach((picker, index) => {
            const color = picker.value;
            colorContainers[index].style.background = color;
        });
      
    }


    // function for file load, defines a minimum of 6 with error handling if not maintained
    function handleImageUpload(event) {
        const files = event.target.files;

        // Check if the number of selected files is less than 5
        if (files.length < 6) {
            errorContainer.textContent = "Please select at 6 photos.";

            return; // Exit the function
        }

        // If there are at least 5 files, clear the error message
        errorContainer.textContent = "";


        // file reader object creator to read loaded files on load
        // funvtion to dictate loaded files to grid item to achieve layout

        for (let i = 0; i < Math.min(files.length, gridItems.length); i++) {
            const reader = new FileReader();

            reader.onload = function (e) {
                gridItems[i].style.backgroundImage = `url(${e.target.result})`;
                gridItems[i].style.backgroundSize = 'cover';
            };

            reader.readAsDataURL(files[i]);
        }
        
       
    }



    // download moodfunction that downloads the entire grid
    function downloadMoodboard() {
        const grid = document.querySelector('.grid');

        // color containers are to be updated NOT WORKING

        colorPickers.forEach((picker, index) => {
            picker.style.display = "none";
        });
      
        // Use html2canvas to capture the grid content as an image
        html2canvas(grid).then(canvas => {
            // Converts the canvas to png url


            const imageDataUrl = canvas.toDataURL('image/png');

            // creates a download link for the ecport button,
            const downloadLink = document.createElement('a');
            downloadLink.href = imageDataUrl;
            downloadLink.download = 'moodboard.png'; // Set the file name for the download
            downloadLink.click();
            
        }).then(() => {
            colorPickers.forEach((picker, index) => {
                picker.style.display = "block";
            });
        });
 
    }

    colorPickers.forEach(picker => {
        picker.addEventListener('input', updateColorContainers);
    });

    downloadButton.addEventListener('click', function() {
       
        downloadMoodboard(); // Trigger the download function to save the moodboard as an image
    });

    imageUpload.addEventListener("change", handleImageUpload);
    
});
