document.addEventListener("DOMContentLoaded", function () {
  const postButton = document.getElementById("post-message-toggle-btn");
  const modal = document.getElementById("postMessageModal");
  const closeBtn = document.querySelector(".close-btn");

  if (postButton && modal && closeBtn) {
    postButton.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const modal = document.getElementById("delete-confirmation-modal");
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  if (modal && confirmDeleteBtn && cancelBtn) {
    let messageIdToDelete = null;

    deleteButtons.forEach((button) => {
      if (button) {
        button.addEventListener("click", () => {
          messageIdToDelete = button.getAttribute("data-id");
          modal.style.display = "flex";
        });
      }
    });

    confirmDeleteBtn.addEventListener("click", async () => {
      if (messageIdToDelete) {
        try {
          const response = await fetch(`/delete-msg/${messageIdToDelete}`, {
            method: "DELETE",
          });
          if (response.ok) {
            window.location.reload();
          }
        } catch (error) {
          console.error("Error deleting message:", error);
        }
      }
      modal.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cancelToggleMemberBtn = document.getElementById(
    "cancel-member-toggle-btn"
  );
  const cancelMemberModal = document.getElementById(
    "cancel-member-status-modal"
  );
  const confirmCanceling = document.getElementById(
    "confirm-canceling-member-btn"
  );
  const cancelCancellingMemberBtn = document.getElementById(
    "cancel-canceling-member-btn"
  );

  if (
    cancelToggleMemberBtn &&
    cancelMemberModal &&
    confirmCanceling &&
    cancelCancellingMemberBtn
  ) {
    const userIdToUpdate = confirmCanceling.getAttribute("data-id");

    cancelToggleMemberBtn.addEventListener("click", () => {
      cancelMemberModal.style.display = "block";
    });

    cancelCancellingMemberBtn.addEventListener("click", () => {
      cancelMemberModal.style.display = "none";
    });

    confirmCanceling.addEventListener("click", async () => {
      try {
        const response = await fetch(`/cancel-member/${userIdToUpdate}`, {
          method: "PUT",
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error occurred while canceling membership: ", error);
      }
      cancelMemberModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});
