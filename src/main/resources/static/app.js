function displayError(parent, message) {
    parent.html("<div class='alert alert-danger'>Uh oh, " + message + " :(</div>");
}

function listTrees(success, error) {
    $.ajax({
        url: "/api/v1/trees",
        type: "get",
        dataType: "json",
        contentType: "application/json",
        success: success,
        error: error
    });
}

function traverseTree(key, nodeId, optionChoices, success, error) {
    $.ajax({
        url: "/api/v1/trees/" + key + "/traverse",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            nodeId: nodeId,
            optionChoices: optionChoices
        }),
        success: success,
        error: error
    });
}

const treeListTemplate = Handlebars.compile($("#tree-list-template").html());
const questionTemplate = Handlebars.compile($("#question-template").html());
const productsTemplate = Handlebars.compile($("#products-template").html());

const body = $("body");

let tree = null;
let nodeId = null;
let optionChoices = null;
let multipleOptionChoicesAllowed = false;

function refreshView() {
    $("#message").html("");
    $("#view").hide();
    $("#view").html("");
    traverseTree(tree, nodeId, optionChoices, function (data) {
        if (data.hasOwnProperty("node")) {
            nodeId = data.node.id;

            if (data.node.isLeaf) {
                $("#view").html(productsTemplate({ products: data.products }));
                $("#view").fadeIn(1000);
            } else {
                multipleOptionChoicesAllowed = data.node.multipleOptionChoicesAllowed;
                $("#view").html(questionTemplate({ node: data.node }));
                $("#view").fadeIn(1000);
                optionChoices = null;
            }
        } else {
            displayError($("#message"), data.message);
        }
    }, function (data) {
        displayError($("#message"), data.responseJSON.message);
    });
}

$(document).ready(function () {
    listTrees(function (data) {
        if (data != null) {
            $("#tree-list").append(treeListTemplate({ trees: data }));
        }
    });

    body.on("click", ".tree-selector", function (e) {
        e.preventDefault();
        tree = $(this).data("key");
        nodeId = null;
        let displayName = $(this).data("display-name");
        $("#select-tree-btn").html(displayName);
        refreshView();
    });

    body.on("click", ".option-choice", function (e) {
        e.preventDefault();
        let id = parseInt($(this).data("id"));

        if (optionChoices == null) {
            optionChoices = [];
        }

        if (!multipleOptionChoicesAllowed) {
            $(".option-choice").removeClass("active");
            $(this).addClass("active");
            optionChoices = [id];
        } else {
            let active = $(this).hasClass("active");

            if (active) {
                $(this).removeClass("active");
                optionChoices = optionChoices.filter(function (item) {
                    return item !== id
                })
            } else {
                $(this).addClass("active");
                optionChoices.push(id);
                optionChoices.sort(function (a, b) { return a - b });
            }
        }
    });

    body.on("click", "#next-btn", function (e) {
        e.preventDefault();
        refreshView();
    });
});
