package xyz.helpmebuy.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.helpmebuy.auth.AuthenticatedAdminController;
import xyz.helpmebuy.model.Product;
import xyz.helpmebuy.request.ProductCreationRequest;
import xyz.helpmebuy.request.ProductUpdateRequest;
import xyz.helpmebuy.service.ProductService;

@RestController
@RequestMapping(value = "/api/v1")
public class ProductController extends AuthenticatedAdminController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(value = "/products")
    public Product create(@Valid @RequestBody ProductCreationRequest productCreationRequest) {
        return productService.create(productCreationRequest.getType(),
                productCreationRequest.getName(),
                productCreationRequest.getDescription(),
                productCreationRequest.getImageUrl(),
                productCreationRequest.getAttributes(),
                productCreationRequest.getLinks());
    }

    @GetMapping(value = "/products/{productId}")
    public Product get(@PathVariable String productId) {
        return productService.get(productId);
    }

    @PutMapping(value = "/products/{productId}")
    public Product update(@PathVariable String productId, @Valid @RequestBody ProductUpdateRequest productUpdateRequest) {
        return productService.update(productId,
                productUpdateRequest.getType(),
                productUpdateRequest.getName(),
                productUpdateRequest.getDescription(),
                productUpdateRequest.getImageUrl(),
                productUpdateRequest.getAttributes(),
                productUpdateRequest.getLinks());
    }

    @DeleteMapping(value = "/products/{productId}")
    public Product delete(@PathVariable String productId) {
        return productService.delete(productId);
    }
}
