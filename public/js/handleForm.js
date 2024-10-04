//post message
document.addEventListener("DOMContentLoaded", function () {
  const postButton = document.getElementById("post-message-toggle-btn");
  const modal = document.getElementById("postMessageModal");
  const closeBtn = document.getElementById("close-post-btn");

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

//delete message
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
          modal.style.display = "block";
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

//cancel member status
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
      if (event.target === cancelMemberModal) {
        cancelMemberModal.style.display = "none";
      }
    });
  }
});

//join member
document.addEventListener("DOMContentLoaded", () => {
  const joinMemberToggleFormBtn = document.getElementById(
    "join-member-toggle-btn"
  );
  const joinMemberFormModal = document.getElementById(
    "join-member-status-modal"
  );
  const closeBtn = document.getElementById("close-join-btn");
  const cancelJoinMemberBtn = document.getElementById("cancel-join-member-btn");

  const confirmJoinMemberBtn = document.getElementById(
    "confirm-join-member-btn"
  );
  const memberCodeInput = document.getElementById("member_code");
  const errorMessage = document.getElementById("join-member-error-msg");

  if (
    joinMemberToggleFormBtn &&
    joinMemberFormModal &&
    cancelJoinMemberBtn &&
    memberCodeInput &&
    confirmJoinMemberBtn &&
    errorMessage &&
    closeBtn
  ) {
    joinMemberToggleFormBtn.addEventListener("click", () => {
      joinMemberFormModal.style.display = "block";
    });

    cancelJoinMemberBtn.addEventListener("click", () => {
      joinMemberFormModal.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
      joinMemberFormModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === joinMemberFormModal) {
        joinMemberFormModal.style.display = "none";
      }
    });

    confirmJoinMemberBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const response = await fetch("/join-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ member_code: memberCodeInput.value }),
      });

      const result = await response.json();
      if (result.success) {
        window.location.reload();
      } else {
        errorMessage.textContent = result.error;
        errorMessage.style.display = "block";
      }
    });
  }
});

//join admin
document.addEventListener("DOMContentLoaded", () => {
  const adminModal = document.getElementById("join-admin-modal");
  const closeJoinAdminModal = document.getElementById("close-join-admin-btn");
  const confirmJoinAdminBtn = document.getElementById("confirm-join-admin-btn");
  const cancelJoinAdminBtn = document.getElementById("cancel-join-admin-btn");
  const errorMessage = document.getElementById("join-admin-error-msg");
  const adminPwdInput = document.getElementById("admin-pwd");
  const adminToggleBtn = document.getElementById("update-admin-toggle-btn");

  if (
    adminModal &&
    closeJoinAdminModal &&
    confirmJoinAdminBtn &&
    cancelJoinAdminBtn &&
    errorMessage &&
    adminPwdInput &&
    adminToggleBtn
  ) {
    adminToggleBtn.addEventListener("click", () => {
      adminModal.style.display = "block";
    });

    cancelJoinAdminBtn.addEventListener("click", () => {
      adminModal.style.display = "none";
    });

    closeJoinAdminModal.addEventListener("click", () => {
      adminModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === adminModal) {
        adminModal.style.display = "none";
      }
    });

    confirmJoinAdminBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const response = await fetch("/join-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_pwd: adminPwdInput.value }),
      });

      const result = await response.json();
      if (result.success) {
        window.location.reload();
      } else {
        errorMessage.textContent = result.error;
        errorMessage.style.display = "block";
      }
    });
  }
});

//remove admin status
document.addEventListener("DOMContentLoaded", () => {
  const cancelAdminToggleBtn = document.getElementById(
    "cancel-admin-toggle-btn"
  );
  const cancelAdminModal = document.getElementById("cancel-admin-modal");
  const confirmCancelingAdminBtn = document.getElementById(
    "confirm-canceling-admin-btn"
  );
  const cancelCancelingAdminBtn = document.getElementById(
    "cancel-canceling-admin-btn"
  );

  if (
    cancelAdminToggleBtn &&
    cancelAdminModal &&
    confirmCancelingAdminBtn &&
    cancelCancelingAdminBtn
  ) {
    const userIdToUpdate = confirmCancelingAdminBtn.getAttribute("data-id");

    cancelAdminToggleBtn.addEventListener("click", () => {
      cancelAdminModal.style.display = "block";
    });

    cancelCancelingAdminBtn.addEventListener("click", () => {
      cancelAdminModal.style.display = "none";
    });

    confirmCancelingAdminBtn.addEventListener("click", async () => {
      try {
        const response = await fetch(`/cancel-admin/${userIdToUpdate}`, {
          method: "PUT",
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error occurred while canceling membership: ", error);
      }
      cancelAdminModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === cancelAdminModal) {
        cancelAdminModal.style.display = "none";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.getElementById("navbarToggle");
  const navbarLinks = document.getElementById("navbarLinks");

  navbarToggle.addEventListener("click", function () {
    navbarLinks.classList.toggle("active");
    navbarToggle.classList.toggle("toggle-active");
  });
});
