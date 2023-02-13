package xyz.helpmebuy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;
import xyz.helpmebuy.embedded.Link;
import xyz.helpmebuy.exception.ClientException;
import xyz.helpmebuy.model.Product;
import xyz.helpmebuy.repository.ProductRepository;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product create(String productType, String name, String description, String imageUrl, Map<String, Object> attributes, List<Link> links) {
        if (nameExists(name)) {
            throw new ClientException("Product " + name + " already exists");
        }

        Product product = new Product(productType, name, description, imageUrl, attributes, links);
        return productRepository.save(product);
    }

    public Product update(String productId, String productType, String name, String description, String imageUrl, Map<String, Object> attributes, List<Link> links) {
        Product product = get(productId);

        if (null != productType && !productType.isBlank()) {
            product.setType(productType);
        }

        if (null != name && !name.isBlank()) {
            product.setName(name);
        }

        product.setDescription(description);
        product.setImageUrl(imageUrl);
        product.setAttributes(attributes);

        if (!links.isEmpty()) {
            product.setLinks(links);
        }

        product.setModifiedOn(new Date());
        return productRepository.save(product);
    }

    public List<Product> list() {
        return productRepository.findAll();
    }

    public Product get(String productId) {
        return productRepository.findById(productId).orElseThrow();
    }

    public List<Product> get(List<String> productIds) {
        return productRepository.findByIdIn(productIds);
    }

    public Product delete(String productId) {
        Product product = get(productId);
        productRepository.delete(product);
        return product;
    }

    public List<Product> search(String query) {
        return productRepository.findAllByOrderByScoreDesc(TextCriteria.forDefaultLanguage().matching(query));
    }

    public Boolean allExist(Set<String> productIds) {
        return productRepository.countByIdIn(productIds) == productIds.size();
    }

    private Boolean nameExists(String name) {
        return productRepository.existsByName(name);
    }
}
