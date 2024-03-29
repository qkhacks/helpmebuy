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

function listNodeChildren(nodeId, success, error) {
    $.ajax({
        url: "/api/v1/nodes/" + nodeId + "/children",
        type: "get",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function addProduct(type, name, description, imageUrl, attributes, links, success, error) {
    $.ajax({
        url: "/api/v1/products",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        data: JSON.stringify({
            type: type,
            name: name,
            description: description,
            imageUrl: imageUrl,
            attributes: attributes,
            links: links
        }),
        success: success,
        error: error
    });
}

function listProducts(success, error) {
    $.ajax({
        url: "/api/v1/products",
        type: "get",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function deleteProduct(productId, success, error) {
    $.ajax({
        url: "/api/v1/products/" + productId,
        type: "delete",
        dataType: "json",
        contentType: "application/json",
        headers: getHeaders(),
        success: success,
        error: error
    });
}

function listNodeProducts(nodeId, success, error) {
    $.ajax({
        url: "/api/v1/nodes/" + nodeId + "/products",
        type: "get",
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
const optionsTemplate = Handlebars.compile($("#options-template").html());
const routesTemplate = Handlebars.compile($("#routes-template").html());
const parentOptionsInputTemplate = Handlebars.compile($("#parent-options-input-template").html());
const addProductAttributeTemplate = Handlebars.compile($("#add-product-attribute-template").html());
const addProductLinkTemplate = Handlebars.compile($("#add-product-link-template").html());
const productsTemplate = Handlebars.compile($("#products-template").html());
const nodeProductsTemplate = Handlebars.compile($("#node-products-template").html());

let treeKey = null;
let nodeId = null;
let selectedNodeProduct = null;

function renderTrees() {
    listTrees(function (data) {
        $("#trees").html(treesTemplate({ trees: data }));
    });
}

function renderTreeNode(node) {
    $("#prompt").html(node.prompt);
    $("#edit-node-prompt").val(node.prompt);
    $("#options").html(optionsTemplate({ options: node.options }));
    $("#multiple-option-choices-allowed-check").prop("checked", node.multipleOptionChoicesAllowed);
    $("#multiple-option-choices-allowed-message").html("");

    listNodeChildren(node.id, function (data) {
        let nodeToRouteMap = {};

        node.routes.forEach(route => {
            nodeToRouteMap[route["child"]] = route["optionChoices"]
        });

        data.forEach(node => {
            node["parentOptionChoices"] = nodeToRouteMap[node.id];
        });
        $("#routes").html(routesTemplate({ routes: data }));
    });
}

function renderTreeLeaf(node) {
    listNodeProducts(node.id, function (data) {
        $("#node-products").html(nodeProductsTemplate({ products: data }));
    });
}

function renderProducts() {
    listProducts(function (data) {
        $("#products").html(productsTemplate({ products: data }));
    });
}

function setView(target) {
    if (localStorage.getItem("adminSecret")) {
        if (target === "products") {
            displayProductsView();
        } else {
            displayTreesView();
        }
    } else {
        displaySecretView();
    }
}

function displaySecretView() {
    $(".view").hide();
    $("#secret-view").show();
}

function displayTreesView() {
    $(".view").hide();
    $("#trees-view").show();
    renderTrees();
}

function displayTreeView() {
    $(".view").hide();

    if (nodeId == null) {
        $("#root-view").show();
    } else {
        getNode(nodeId, function (data) {
            if (data.isLeaf) {
                $("#leaf-view").show();
                renderTreeLeaf(data);
            } else {
                $("#tree-view").show();
                renderTreeNode(data);
            }
        });
    }
}

function displayProductsView() {
    $(".view").hide();
    $("#products-view").show();
    renderProducts();
}

$(document).ready(function () {
    setView("trees");

    body.on("click", ".tab-btn", function (e) {
        e.preventDefault();
        let target = $(this).data("target");
        setView(target);
    });

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

    $("#add-option-btn").click(function (e) {
        e.preventDefault();

        let text = $("#add-option-text").val();

        if (text === "") {
            displayError($("#add-option-message"), "Option text is required");
            return;
        }

        getNode(nodeId, function (data) {
            if (data.hasOwnProperty("id")) {
                if (data.options == null) {
                    data.options = [];
                }

                data.options.push({
                    text: text
                });

                updateNode(nodeId, data.prompt, data.options, data.multipleOptionChoicesAllowed, data.products, function (data) {
                    if (data.hasOwnProperty("id")) {
                        $("#add-option-modal").modal("toggle");
                        $("#options").html(optionsTemplate({ options: data.options }));
                    } else {
                        displayError($("#add-option-message"), data.message);
                    }
                }, function (data) {
                    displayError($("#add-option-message"), data.responseJSON.message);
                });
            } else {
                displayError($("#add-option-message"), data.message);
            }
        }, function (data) {
            displayError($("#add-option-message"), data.responseJSON.message);
        });
    });

    body.on("click", ".delete-option-modal-btn", function (e) {
        let index = $(this).data("index");
        $("#delete-option-index").val(index);
    });

    $("#delete-option-btn").click(function (e) {
        let index = $("#delete-option-index").val().trim();

        if (index === "") {
            displayError($("#delete-option-message"), "Option is not selected");
            return;
        }

        index = parseInt(index);

        getNode(nodeId, function (data) {
            if (data.hasOwnProperty("id")) {
                let newOptions = [];
                for (let i = 0; i < data.options.length; i++) {
                    if (i == index) {
                        continue;
                    }

                    newOptions.push(data.options[i]);
                }

                updateNode(nodeId, data.prompt, newOptions, data.multipleOptionChoicesAllowed, data.products, function (data) {
                    if (data.hasOwnProperty("id")) {
                        $("#delete-option-modal").modal("toggle");
                        $("#option-" + index).remove();
                    } else {
                        displayError($("#delete-option-message"), data.message);
                    }
                }, function (data) {
                    displayError($("#delete-option-message"), data.responseJSON.message);
                });
            } else {
                displayError($("#delete-option-message"), data.message);
            }
        }, function (data) {
            displayError($("#delete-option-message"), data.responseJSON.message);
        });
    });

    $("#edit-node-btn").click(function (e) {
        e.preventDefault();

        let prompt = $("#edit-node-prompt").val();

        if (prompt === "") {
            displayError($("#edit-node-message"), "Prompt is required");
            return;
        }

        getNode(nodeId, function (data) {
            if (data.hasOwnProperty("id")) {
                updateNode(nodeId, prompt, data.options, data.multipleOptionChoicesAllowed, data.products, function (data) {
                    if (data.hasOwnProperty("id")) {
                        displaySuccess($("#edit-node-message"), "Changes saved successfully");
                        $("#prompt").html(data.prompt);
                    } else {
                        displayError($("#edit-node-message"), data.message);
                    }
                }, function (data) {
                    displayError($("#edit-node-message"), data.responseJSON.message);
                });
            } else {
                displayError($("#edit-node-message"), data.message);
            }
        }, function (data) {
            displayError($("#edit-node-message"), data.responseJSON.message);
        })
    });

    $("#multiple-option-choices-allowed-check").change(function (e) {
        e.preventDefault();
        let multipleOptionChoicesAllowed = $(this).is(":checked");

        getNode(nodeId, function (data) {
            if (data.hasOwnProperty("id")) {
                updateNode(nodeId, data.prompt, data.options, multipleOptionChoicesAllowed, data.products, function (data) {
                    if (data.hasOwnProperty("id")) {
                        let message = "";

                        if (multipleOptionChoicesAllowed) {
                            message = "Enabled multiple option choices";
                        } else {
                            message = "Disabled multiple option choices";
                        }

                        displaySuccess($("#multiple-option-choices-allowed-message"), message);
                    } else {
                        displayError($("#multiple-option-choices-allowed-message"), data.message);
                    }
                }, function (data) {
                    displayError($("#multiple-option-choices-allowed-message"), data.responseJSON.message);
                });
            } else {
                displayError($("#multiple-option-choices-allowed-message"), data.message);
            }
        }, function (data) {
            displayError($("#multiple-option-choices-allowed-message"), data.responseJSON.message);
        });
    });

    $("#add-route-modal-btn").click(function (e) {
        getNode(nodeId, function (data) {
            $("#add-tree-node-parent-options").html(parentOptionsInputTemplate({ options: data.options }));
        });
    });

    $("#add-route-btn").click(function (e) {
        e.preventDefault();

        let prompt = $("#add-tree-node-prompt").val().trim();
        let isLeaf = $("#add-tree-node-is-leaf").is(":checked");

        if (isLeaf) {
            prompt = null;
        } else {
            if (prompt === "") {
                displayError($("#add-route-message"), "Prompt is required");
                return;
            }
        }

        let parentOptions = [];

        $(".add-tree-node-parent-option").each(function () {
            if ($(this).is(":checked")) {
                parentOptions.push(parseInt($(this).data("index")));
            }
        });

        createNode(nodeId, isLeaf, prompt, null, null, null, parentOptions, function (data) {
            if (data.hasOwnProperty("id")) {
                $("#add-route-modal").modal("toggle");
                data["parentOptionChoices"] = parentOptions;
                $("#routes").prepend(routesTemplate({ routes: [data] }));
            } else {
                displayError($("#add-route-message"), data.message);
            }
        }, function (data) {
            displayError($("#add-route-message"), data.responseJSON.message);
        });
    });

    body.on("click", ".go-to-node-btn", function (e) {
        e.preventDefault();
        nodeId = $(this).data("id");
        displayTreeView();
    });

    let addProductAttributesIndex = 1;
    let addProductLinksIndex = 1;
    $("#add-product-attributes").append(addProductAttributeTemplate({ index: addProductAttributesIndex }));
    $("#add-product-links").append(addProductLinkTemplate({ index: addProductLinksIndex }));
    $("#add-product-attribute-btn").click(function (e) {
        e.preventDefault();
        addProductAttributesIndex++;
        $("#add-product-attributes").append(addProductAttributeTemplate({ index: addProductAttributesIndex }));
    });
    $("#add-product-link-btn").click(function (e) {
        e.preventDefault();
        addProductLinksIndex++;
        $("#add-product-links").append(addProductLinkTemplate({ index: addProductLinksIndex }));
    });

    $("#add-product-btn").click(function (e) {
        e.preventDefault();

        let type = $("#add-product-type").val().trim();

        if (type === "") {
            displayError($("#add-product-message"), "Type is required");
            return;
        }

        let name = $("#add-product-name").val().trim();

        if (name === "") {
            displayError($("#add-product-message"), "Name is required");
            return;
        }

        let description = $("#add-product-description").val();
        let imageUrl = $("#add-product-image-url").val().trim();

        if (imageUrl === "") {
            displayError($("#add-product-message"), "Image URL is required");
            return;
        }

        let attributes = {};

        for (let i = 1; i <= addProductAttributesIndex; i++) {
            let key = $("#add-product-attribute-key-" + i).val().trim();
            let value = $("#add-product-attribute-value-" + i).val().trim();

            if (key === "" || value === "") {
                continue;
            }

            attributes[key] = value;
        }

        let links = [];

        for (let i = 1; i <= addProductLinksIndex; i++) {
            let link = $("#add-product-link-link-" + i).val().trim();
            let text = $("#add-product-link-text-" + i).val().trim();
            let icon = $("#add-product-link-icon-" + i).val().trim();

            if (link === "" || text === "" || icon === "") {
                continue;
            }

            links.push({
                link: link,
                text: text,
                icon: icon
            });
        }

        addProduct(type, name, description, imageUrl, attributes, links, function (data) {
            if (data.hasOwnProperty("id")) {
                displaySuccess($("#add-product-message"), "Product added successfully");
                $("#products").prepend(productsTemplate({ products: [data] }));
            } else {
                displayError($("#add-product-message"), data.message);
            }
        }, function (data) {
            displayError($("#add-product-message"), data.responseJSON.message);
        });
    });

    body.on("click", ".delete-product-modal-btn", function (e) {
        let productId = $(this).data("id");
        $("#delete-product-id").val(productId);
    });

    $("#delete-product-btn").click(function (e) {
        e.preventDefault();

        let productId = $("#delete-product-id").val().trim();

        if (productId === "") {
            displayError($("#delete-product-message"), "Product is not selected");
            return;
        }

        let confirmation = $("#delete-product-confirmation").val();

        if (confirmation !== "yes") {
            displayError($("#delete-product-message"), "Please confirm deletion of the product below");
            return;
        }

        deleteProduct(productId, function (data) {
            if (data.hasOwnProperty("id")) {
                $("#delete-product-modal").modal("toggle");
                $("#product-" + productId).remove();
            } else {
                displayError($("#delete-product-message"), data.message);
            }
        }, function (data) {
            displayError($("#delete-product-message"), data.responseJSON.message);
        });
    });

    new Autocomplete("add-node-product-name", {
        onSearch: ({ currentValue }) => {
            const api = `/api/v1/products/search?query=${encodeURI(
                currentValue
            )}`;
            return new Promise((resolve) => {
                fetch(api, { headers: getHeaders() })
                    .then((response) => response.json())
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        },

        onResults: ({ matches }) =>
            matches.map((el) => `<li>${el.name}</li>`).join(""),

        onSelectedItem: ({ index, element, object }) => {
            selectedNodeProduct = object;
        },
    });

    $("#add-node-product-btn").click(function (e) {
        e.preventDefault();

        if (selectedNodeProduct == null) {
            displayError($("#add-node-product-message"), "Product is not selected");
            return;
        }

        getNode(nodeId, function (data) {
            if (data.hasOwnProperty("id")) {
                if (data.products == null) {
                    data.products = [];
                }

                if (!data.products.includes(selectedNodeProduct.id)) {
                    data.products.push(selectedNodeProduct.id);
                }

                updateNode(nodeId, data.prompt, data.options, data.multipleOptionChoicesAllowed, data.products, function (data) {
                    if (data.hasOwnProperty("id")) {
                        displaySuccess($("#add-node-product-message"), "Product added to node successfully");
                        $("#node-products").prepend(nodeProductsTemplate({ products: [selectedNodeProduct] }));
                    } else {
                        displayError($("#add-node-product-message"), data.message);
                    }
                }, function (data) {
                    displayError($("#add-node-product-message"), data.responseJSON.message);
                })
            } else {
                displayError($("#add-node-product-message"), data.message);
            }
        }, function (data) {
            displayError($("#add-node-product-message"), data.responseJSON.message);
        });
    });

    body.on("click", ".delete-node-product-modal-btn", function (e) {
        let productId = $(this).data("id");
        $("#delete-node-product-id").val(productId);
    });

    $("#delete-node-product-btn").click(function (e) {
        e.preventDefault();

        let productId = $("#delete-node-product-id").val().trim();

        if (productId === "") {
            displayError($("#delete-node-product-message"), "Product is not selected");
            return;
        }

        let confirmation = $("#delete-node-product-confirmation").val();

        if (confirmation !== "yes") {
            displayError($("#delete-node-product-message"), "Please confirm deletion of the product below");
            return;
        }

        getNode(nodeId, function (data) {
            if (data.hasOwnProperty("id")) {
                const index = data.products.indexOf(productId);
                if (index > -1) {
                    data.products.splice(index, 1);
                }

                updateNode(nodeId, data.prompt, data.options, data.multipleOptionChoicesAllowed, data.products, function (data) {
                    if (data.hasOwnProperty("id")) {
                        displaySuccess($("#delete-node-product-message"), "Product removed from node successfully");
                        $("#node-product-" + productId).remove();
                    } else {
                        displayError($("#delete-node-product-message"), data.message);
                    }
                }, function (data) {
                    displayError($("#delete-node-product-message"), data.responseJSON.message);
                })
            } else {
                displayError($("#delete-node-product-message"), data.message);
            }
        }, function (data) {
            displayError($("#delete-node-product-message"), data.responseJSON.message);
        });
    });
});
