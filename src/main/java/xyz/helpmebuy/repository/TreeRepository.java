package xyz.helpmebuy.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import xyz.helpmebuy.model.Tree;

@Repository
public interface TreeRepository extends MongoRepository<Tree, String> {

}
