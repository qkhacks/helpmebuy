package xyz.helpmebuy.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import xyz.helpmebuy.model.Tree;

import java.util.List;

@Repository
public interface TreeRepository extends MongoRepository<Tree, String> {

    Tree findByKey(String key);

    List<Tree> findByActiveIsTrue();

    Boolean existsByKey(String key);
}
