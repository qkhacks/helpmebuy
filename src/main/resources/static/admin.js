function displayError(parent, message) {
    parent.html("<div class='alert alert-danger'>Uh oh, " + message + " :(</div>");
}

function setView() {
    if (localStorage.getItem("adminSecret")) {
        $("#admin-view").show();
        $("#secret-view").hide();
    } else {
        $("#admin-view").hide();
        $("#secret-view").show();
    }
}

$(document).ready(function () {
    setView();
    $("#set-admin-secret-btn").click(function (e) {
        e.preventDefault();
        let secret = $("#set-admin-secret-input").val().trim();

        if (secret === "") {
            displayError($("#set-admin-secret-message"), "Admin secret is required");
            return;
        }

        localStorage.setItem("adminSecret", secret);
        setView();
    });
});
