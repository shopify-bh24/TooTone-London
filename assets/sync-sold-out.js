document.addEventListener("DOMContentLoaded", function () {
  function logSelectedValue(event) {
    let selectedOption = null;

    if (event) {
      const target = event.target;

      if (target.matches("input[type='radio'][name^='option']")) {
        selectedOption = target.value;
      } else if (target.matches("select")) {
        selectedOption = target.value;
      }
    }

    if (selectedOption) {
      console.log("Selected Option Value:", selectedOption);
      toggleLeaveEmailForm(selectedOption);
      updateSubmitButtonState(selectedOption);
      resetProductFormState(); // Ensure form updates correctly
    }
  }

  function toggleLeaveEmailForm(value) {
    const leaveEmailForm = document.querySelector(".leave_email_form");
    if (leaveEmailForm) {
      if (value && value.includes("Unavailable")) {
        leaveEmailForm.classList.remove("hidden");
      } else { 
        leaveEmailForm.classList.add("hidden");
      }
    }
  }

  function updateSubmitButtonState(value) {
    const submitButton = document.querySelector(".product-form__submit");
    const submitText = document.querySelector(".product-form__submit span"); // Updated selector

    if (!submitButton || !submitText) {
      console.warn("Submit button or text span not found.");
      return;
    }

    setTimeout(() => {
      if (value && value.includes("Unavailable")) {
        submitButton.setAttribute("disabled", "disabled");
        submitText.textContent = "Sold Out";
      } else {
        submitButton.disabled = false;
        submitButton.removeAttribute("disabled");
        submitText.textContent = "Add to bag";
      }
    }, 500); // Adjust time if needed

  }



  function resetProductFormState() {
    const productForm = document.querySelector(".product-form");

    if (!productForm) {
      console.warn("Product form not found.");
      return;
    }

    if (typeof productForm.toggleSubmitButton === "function") {
      productForm.toggleSubmitButton();
    } else {
      console.warn("toggleSubmitButton() is not defined on productForm.");
    }
  }

  // Event delegation for dynamically added elements
  document.body.addEventListener("change", function (event) {
    if (event.target.matches("input[type='radio'][name^='option'], select")) {
      logSelectedValue(event);
    }
  });

  // Function to check and update on page load or redirect
  function checkInitialSelection() {
    let selectedOption = null;
    const initialSelectedRadio = document.querySelector("input[type='radio'][name^='option']:checked");
    if (initialSelectedRadio) {
      selectedOption = initialSelectedRadio.value;
    }

    document.querySelectorAll("select").forEach(select => {
      if (select.value) {
        selectedOption = select.value;
      }
    });

    if (selectedOption) {
      console.log("Selected Option Value:", selectedOption);
      toggleLeaveEmailForm(selectedOption);
      updateSubmitButtonState(selectedOption);
      resetProductFormState(); // Ensure form updates correctly on load
    }
  }

  // Run check on load and after a short delay for redirects
  checkInitialSelection();
  setTimeout(checkInitialSelection, 500);
});
