package com.example.COMP9900.repositories;

import com.example.COMP9900.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query("select a from Account a left join fetch a.authorities auths where a.username=:username")
    Account findByUsername(@Param("username") String username);

    @Query("select a from Account a left join fetch a.notes notes where a.username=:username")
    Account findAccountWithNotesByUsername(@Param("username") String username);
}
