package xyz.helpmebuy.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import xyz.helpmebuy.model.Node;

import java.util.List;

@Repository
public interface NodeRepository extends MongoRepository<Node, String> {

    List<Node> findByIdIn(List<String> ids);
}
