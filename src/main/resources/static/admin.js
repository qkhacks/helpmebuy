function displayError(parent, message) {
    parent.html("<div class='alert alert-danger'>Uh oh, " + message + " :(</div>");
}

function displaySuccess(parent, message) {
    parent.html("<div class='alert alert-success'>" + message + "</div>");
}

function createTree(key, displayName, rootNode, success, error) {
    $.ajax({
        url: "/api/v1/trees",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        data: JSON.stringify({
            key: key,
            displayName: displayName,
            rootNode: rootNode
        }),
        success: success,
        error: error
    })
}

function getHeaders() {
    return {
        Authorization: "AdminSecret " + localStorage.getItem("adminSecret")
    }
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

    $("#add-tree-btn").click(function (e) {
        e.preventDefault();

        let key = $("#add-tree-key").val().trim();
        let displayName = $("#add-tree-display-name").val().trim();

        if (key === "") {
            displayError($("#add-tree-message"), "Key is required");
            return;
        }

        if (displayName === "") {
            displayError($("#add-tree-message"), "Display name is required");
            return;
        }

        createTree(key, displayName, null, function (data) {
            if (data.hasOwnProperty("id")) {
                displaySuccess($("#add-tree-message"), "Tree added successfully");
            } else {
                displayError($("#add-tree-message"), data.message);
            }
        }, function (data) {
            displayError($("#add-tree-message"), data.responseJSON.message);
        });
    });
});
