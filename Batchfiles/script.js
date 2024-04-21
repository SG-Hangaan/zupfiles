$(document).ready(function() {
    let containerCount = 1;

    function setupClearButton(containerId) {
        const clearButton = document.getElementById(`clearBtn${containerId}`);
        const inputElement = document.getElementById(`inpFile${containerId}`);

        inputElement.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                clearButton.style.display = 'inline-block';
                this.classList.add('has-files');
            } else {
                clearButton.style.display = 'none';
                this.classList.remove('has-files');
            }
        });

        clearButton.addEventListener('click', function() {
            inputElement.value = ''; // Clear the selected file
            clearButton.style.display = 'none'; // Hide the clear button
            inputElement.classList.remove('has-files');
            inputElement.classList.remove('border-black');
        });
    }

    // Function to handle adding new file containers
    $('.add-file-button').click(function() {
        containerCount++;
        let newContainer = `
        <div class="container-text" id="container${containerCount}">
            <div class="text-box">
                <div class="input-container">
                    <input class="form-control" type="file" id="inpFile${containerCount}" capture="environment">
                    <button class="clear-button" id="clearBtn${containerCount}" style="display: none;">⟳</button>
                </div>
            </div>
            <div class="button-box">
                <button class="btnUpload" id="btnUpload${containerCount}" disabled>Detect Text</button>
                <button class="btnUpload" id="btnViewResult${containerCount}" disabled>View Result</button>
            </div>
        </div>`;
        
        $('.container-text-add').before(newContainer);

        // Add event handlers for new elements
        setupClearButton(containerCount);

        // Add logic to enable/disable buttons based on checkbox
        $('#agree').change(function() {
            $(`#btnUpload${containerCount}`).prop('disabled', !this.checked);
        });

        // Add logic to handle Detect Text and View Result buttons
        $(`#btnUpload${containerCount}`).click(function() {
            // Perform actions when Detect Text button is clicked (e.g., detect text)
            $(`#btnViewResult${containerCount}`).prop('disabled', false); // Enable View Result button
        });
    });

    // Initial event handlers for existing elements
    $('#clearBtn1').click(function() {
        $('#inpFile1').val(''); // Clear file input
    });

    // Initial logic for existing elements
    $('#agree').change(function() {
        $('#btnUpload1').prop('disabled', !this.checked);
    });

    $('#btnUpload1').click(function() {
        // Perform actions when Detect Text button is clicked for the first container
        $('#btnViewResult1').prop('disabled', false); // Enable View Result button for the first container
    });

    // Setup clear button logic for first container
    setupClearButton(1);
});
