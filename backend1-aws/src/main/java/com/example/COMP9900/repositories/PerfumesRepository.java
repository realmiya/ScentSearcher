package com.example.COMP9900.repositories;

import com.example.COMP9900.entities.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PerfumesRepository extends JpaRepository<Perfume, Long> {
    List<Perfume> findByPerfumeNameContainingIgnoreCase(String perfumeName);
    List<Perfume> findPerfumesByNotesNoteNameIgnoreCase(String NoteName);

    @Query(value = "SELECT p FROM Perfume p LEFT JOIN p.notes n GROUP BY p"
            + " HAVING SUM(CASE WHEN LOWER(n.noteName) IN (:notesList) THEN 1 ELSE 0 END) = :noteListSize")
    List<Perfume> findByNotes(@Param("notesList") List<String> notesList,
                            @Param("noteListSize") long noteListSize);
}
