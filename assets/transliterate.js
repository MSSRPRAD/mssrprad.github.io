import './sanscript.js';

// Default target scheme
var defaultTargetScheme = "devanagari";
var defaultSourceScheme = "hk"

// Function to get the selected scheme from local storage
function getSelectedScheme() {
    var storedScheme = localStorage.getItem("selectedScheme");
    return storedScheme || defaultTargetScheme;
}

// Function to set the selected scheme in local storage
function setSelectedScheme(scheme) {
    localStorage.setItem("selectedScheme", scheme);
}

var targetScheme = getSelectedScheme();

document.addEventListener("DOMContentLoaded", function () {
    // Function to transliterate text for a specific element
    function transliterateText(element, toScheme) {
        var originalText = element.innerHTML;

        // Check if a visible <p> element already exists and remove it
        var visibleElement = element.nextElementSibling;
        if (visibleElement && visibleElement.tagName === "P") {
            visibleElement.remove();
        }

        // Create a new visible <p> element
        visibleElement = document.createElement("p");
        visibleElement.classList.add("transliterated_text");
        visibleElement.classList.add("card");
        element.parentElement.insertBefore(visibleElement, element.nextSibling);

        // Replace '<br>' with a placeholder (e.g., '<<br>>')
        var textWithPlaceholder = originalText.replace(/<br>/g, '##<<br>>##');

        // Split the text by line breaks
        var parts = textWithPlaceholder.split('\n').filter(Boolean);

        var converted = [];

        for (var j = 0; j < parts.length; j++) {
            converted.push(Sanscript.t(parts[j], defaultSourceScheme, toScheme));
        }

        // Join the parts with '<<br>>' elements
        var transliteratedText = converted.join('');

        // Replace '<<br>>' with '<br>' to restore line breaks
        transliteratedText = transliteratedText.replace(/<<br>>/g, '<br>');

        // Set the HTML content of the visible element
        visibleElement.innerHTML = transliteratedText;

        // Remove the hidden class from the original element
        element.classList.remove("hidden");
    }

    // Update the scheme when the user changes the dropdown
    document.getElementById("transliterationDropdown").addEventListener("change", function () {
        targetScheme = this.value;
        setSelectedScheme(targetScheme); // Save the selected scheme to local storage
        console.log('-----------Transliterating-----------');
        console.log('to: ' + targetScheme);
        var elements = document.getElementsByClassName("sanscript");
        for (var i = 0; i < elements.length; i++) {
            transliterateText(elements[i], targetScheme);
        }
    });

    // Initialize the dropdown with the stored target scheme
    var dropdown = document.getElementById("transliterationDropdown");
    for (var i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value === targetScheme) {
            dropdown.selectedIndex = i;
            break;
        }
    }

    // Initial transliteration for all elements
    var elements = document.getElementsByClassName("sanscript");
    for (var i = 0; i < elements.length; i++) {
        transliterateText(elements[i], targetScheme);
    }
});