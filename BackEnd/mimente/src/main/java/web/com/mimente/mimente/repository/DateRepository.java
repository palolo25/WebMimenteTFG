package web.com.mimente.mimente.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.com.mimente.mimente.entity.DateEntity;

public interface DateRepository extends JpaRepository<DateEntity,Long> {

}
