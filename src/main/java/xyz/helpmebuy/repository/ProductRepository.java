package xyz.helpmebuy.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import xyz.helpmebuy.model.Product;

import java.util.List;
import java.util.Set;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByIdIn(List<String> ids);

    Integer countByIdIn(Set<String> ids);
}
