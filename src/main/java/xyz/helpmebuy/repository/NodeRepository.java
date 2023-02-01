package xyz.helpmebuy.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import xyz.helpmebuy.model.Node;

@Repository
public interface NodeRepository extends MongoRepository<Node, String> {

}
