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
    });
}

function listTrees(success, error) {
    $.ajax({
        url: "/api/v1/trees/all",
        type: "get",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function getTree(key, success, error) {
    $.ajax({
        url: "/api/v1/trees/" + key,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function updateTree(key, displayName, rootNode, success, error) {
    $.ajax({
        url: "/api/v1/trees/" + key,
        type: "put",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        data: JSON.stringify({
            displayName: displayName,
            rootNode: rootNode
        }),
        success: success,
        error: error
    });
}

function deleteTree(key, success, error) {
    $.ajax({
        url: "/api/v1/trees/" + key,
        type: "delete",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function activateTree(key, success, error) {
    $.ajax({
        url: "/api/v1/trees/" + key + "/activate",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function deactivateTree(key, success, error) {
    $.ajax({
        url: "/api/v1/trees/" + key + "/deactivate",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function createNode(parent, isLeaf, prompt, options, multipleOptionChoicesAllowed, products, parentOptionChoices, success, error) {
    $.ajax({
        url: "/api/v1/nodes",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        data: JSON.stringify({
            parent: parent,
            isLeaf: isLeaf,
            prompt: prompt,
            options: options,
            multipleOptionChoicesAllowed: multipleOptionChoicesAllowed,
            products: products,
            parentOptionChoices: parentOptionChoices,
        }),
        success: success,
        error: error
    });
}

function getNode(nodeId, success, error) {
    $.ajax({
        url: "/api/v1/nodes/" + nodeId,
        type: "get",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function updateNode(nodeId, prompt, options, multipleOptionChoicesAllowed, products, success, error) {
    $.ajax({
        url: "/api/v1/nodes/" + nodeId,
        type: "put",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        data: JSON.stringify({
            prompt: prompt,
            options: options,
            multipleOptionChoicesAllowed: multipleOptionChoicesAllowed,
            products: products
        }),
        success: success,
        error: error
    });
}

function deleteNode(nodeId, success, error) {
    $.ajax({
        url: "/api/v1/nodes/" + nodeId,
        type: "delete",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function getHeaders() {
    return {
        Authorization: "AdminSecret " + localStorage.getItem("adminSecret")
    }
}


const body = $("body");

const treesTemplate = Handlebars.compile($("#trees-template").html());
let treeKey = null;
let nodeId = null;

function renderTrees() {
    listTrees(function (data) {
        $("#trees").append(treesTemplate({ trees: data }));
    });
}

function renderTreeNode() {
    getNode(nodeId, function (data) {
        console.log(data);
    });
}

function setView() {
    if (localStorage.getItem("adminSecret")) {
        displayAdminView();
    } else {
        displaySecretView();
    }
}

function displaySecretView() {
    $(".view").hide();
    $("#secret-view").show();
}

function displayAdminView() {
    $(".view").hide();
    $("#admin-view").show();
    renderTrees();
}

function displayTreeView() {
    $(".view").hide();

    if (nodeId == null) {
        $("#root-view").show();
    } else {
        $("#tree-view").show();
        renderTreeNode();
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
                $("#trees").prepend(treesTemplate({ trees: [data] }));
            } else {
                displayError($("#add-tree-message"), data.message);
            }
        }, function (data) {
            displayError($("#add-tree-message"), data.responseJSON.message);
        });
    });

    body.on("click", ".edit-tree-modal-btn", function (e) {
        let treeKey = $(this).data("key");
        getTree(treeKey, function (data) {
            $("#edit-tree-key").val(data.key);
            $("#edit-tree-display-name").val(data.displayName);
        });
    });

    $("#edit-tree-btn").click(function (e) {
        e.preventDefault();
        let key = $("#edit-tree-key").val().trim();
        let displayName = $("#edit-tree-display-name").val().trim();

        if (key === "") {
            displayError($("#edit-tree-message"), "Tree is not selected");
            return;
        }

        if (displayName === "") {
            displayError($("#edit-tree-message"), "Display name is required");
            return;
        }

        updateTree(key, displayName, null, function (data) {
            if (data.hasOwnProperty("id")) {
                displaySuccess($("#edit-tree-message"), "Changes saved successfully");
                $("#tree-display-name-" + data.key).html(data.displayName);
            } else {
                displayError($("#edit-tree-message"), data.message);
            }
        }, function (data) {
            displayError($("#edit-tree-message"), data.responseJSON.message);
        })
    });

    body.on("click", ".delete-tree-modal-btn", function (e) {
        let treeKey = $(this).data("key");
        $("#delete-tree-key").val(treeKey);
    });

    $("#delete-tree-btn").click(function (e) {
        e.preventDefault();

        let key = $("#delete-tree-key").val().trim();

        if (key === "") {
            displayError($("#delete-tree-message"), "Tree is not selected");
            return;
        }

        let confirmation = $("#delete-tree-confirmation").val();

        if (confirmation !== "yes") {
            displayError($("#delete-tree-message"), "Please confirm deletion of the tree below");
            return;
        }

        deleteTree(key, function (data) {
            if (data.hasOwnProperty("id")) {
                displaySuccess($("#delete-tree-message"), "Tree deleted successfully");
                $("#tree-" + key).remove();
            } else {
                displayError($("#delete-tree-message"), data.message);
            }
        }, function (data) {
            displayError($("#delete-tree-message"), data.responseJSON.message);
        });
    });

    body.on("click", ".tree-activation-modal-btn", function (e) {
        let treeKey = $(this).data("key");
        $("#tree-activation-key").val(treeKey);
        getTree(treeKey, function (data) {
            $("#tree-activation-check").prop("checked", data.active);
        });
    });

    $("#tree-activation-check").change(function (e) {
        e.preventDefault();
        let key = $("#tree-activation-key").val().trim();

        if (key === "") {
            displayError($("#tree-activation-message"), "Tree is not selected");
            return;
        }

        let checked = $(this).is(":checked");

        if (checked) {
            activateTree(key, function (data) {
                if (data.hasOwnProperty("id")) {
                    displaySuccess($("#tree-activation-message"), "Tree activated successfully");
                } else {
                    displayError($("#tree-activation-message"), data.message);
                }
            }, function (data) {
                displayError($("#tree-activation-message"), data.responseJSON.message);
            });
        } else {
            deactivateTree(key, function (data) {
                if (data.hasOwnProperty("id")) {
                    displaySuccess($("#tree-activation-message"), "Tree deactivated successfully");
                } else {
                    displayError($("#tree-activation-message"), data.message);
                }
            }, function (data) {
                displayError($("#tree-activation-message"), data.responseJSON.message);
            });
        }
    });

    body.on("click", ".tree-root-btn", function (e) {
        e.preventDefault();
        treeKey = $(this).data("key");
        getTree(treeKey, function (data) {
            nodeId = data.rootNode;
            displayTreeView();
        });
    });

    $("#add-tree-root-btn").click(function (e) {
        e.preventDefault();

        let prompt = $("#add-tree-root-prompt").val().trim();

        if (prompt === "") {
            displayError($("#add-tree-root-message"), "Prompt is required");
            return;
        }

        let isLeaf = $("#add-tree-root-is-leaf").is(":checked");

        createNode(null, isLeaf, prompt, null, null, null, null, function (data) {
            if (data.hasOwnProperty("id")) {
                nodeId = data.id;
                updateTree(treeKey, null, nodeId, function (data) {
                    if (data.hasOwnProperty("id")) {
                        displayTreeView();
                        $("#add-tree-root-modal").modal("toggle");
                    } else {
                        displayError($("#add-tree-root-message"), data.message);
                    }
                }, function (data) {
                    displayError($("#add-tree-root-message"), data.responseJSON.message);
                });
            } else {
                displayError($("#add-tree-root-message"), data.message);
            }
        }, function (data) {
            displayError($("#add-tree-root-message"), data.responseJSON.message);
        });
    });
});
