document.addEventListener("DOMContentLoaded", function () {
  const postButton = document.getElementById("post-message-toggle-btn");
  const modal = document.getElementById("postMessageModal");
  const closeBtn = document.querySelector(".close-btn");

  postButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // When the user clicks outside the modal content, close the modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const deleteButtons = document.querySelectorAll(".delete-btn");
//   const modal = document.getElementById("deleteConfirmationModal");
//   const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
//   const cancelBtn = document.getElementById("cancelBtn");

//   let messageIdToBeDelete = null;

//   deleteButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       messageIdToBeDelete = button.getAttribute("data-id");
//       modal.style.display = "block";
//     });
//   });

//   confirmDeleteBtn.addEventListener("click", async () => {
//     if (messageIdToBeDelete) {
//       try {
//         const response = await (fetch(`/delete-msg/${messageIdToBeDelete}`),
//         { method: DELETE });
//         if (response.ok) {
//           window.location.reload();
//         }
//         console.log("click");
//       } catch (err) {
//         console.error("Error deleting message:", err);
//       }
//     }
//     modal.style.display = "none";
//   });

//   cancelBtn.addEventListener("click", () => {
//     modal.style.display = "none";
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const modal = document.getElementById("deleteConfirmationModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  let messageIdToDelete = null;

  // Handle click event on delete buttons
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      messageIdToDelete = button.getAttribute("data-id");
      modal.style.display = "flex"; // Show the modal
    });
  });

  // Handle the confirmation click (OK button)
  confirmDeleteBtn.addEventListener("click", async () => {
    if (messageIdToDelete) {
      try {
        // Send a DELETE request to your server
        const response = await fetch(`/delete-msg/${messageIdToDelete}`, {
          method: "DELETE",
        });
        console.log("delete success");
        console.log(response);
        if (response.ok) {
          window.location.reload(); // Reload the page after successful deletion
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
    modal.style.display = "none"; // Hide the modal
  });

  // Handle the cancel click
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
  });
});
