package com.example.COMP9900.services;

import com.example.COMP9900.dtos.note.NoteGetDto;
import com.example.COMP9900.dtos.note.NotePutDto;
import com.example.COMP9900.dtos.perfume.PerfumeGetDto;
import com.example.COMP9900.entities.Account;
import com.example.COMP9900.entities.Notes;
import com.example.COMP9900.mappers.PerfumeMapper;
import com.example.COMP9900.repositories.NotesRepository;
import com.example.COMP9900.repositories.PerfumesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PerfumeService {
    private final PerfumesRepository perfumesRepository;
    private final PerfumeMapper perfumeMapper;

    public List<PerfumeGetDto> getAllPerfumes() {
        return perfumesRepository.findAll().stream()
                .map(perfumeMapper::fromEntity)
                .collect(Collectors.toList());
    }

    public PerfumeGetDto findById(Long accountId) {
        PerfumeGetDto perfumeGetDto = perfumeMapper.fromEntity(perfumesRepository.getById(accountId));
        return perfumeGetDto;
    }

    public List<PerfumeGetDto> findByNameLike(String name) {
        return perfumesRepository.findByPerfumeNameContainingIgnoreCase(name).stream()
                .map(perfumeMapper::fromEntity)
                .collect(Collectors.toList());
    }

    public List<PerfumeGetDto> findByNotes(NotePutDto notePutDto) {
//        return perfumeMapper.fromEntity(perfumesRepository.findPerfumesByNotesNoteName(notePutDto.getIncludingNoteName().get(0)));
        return perfumesRepository.findPerfumesByNotesNoteNameIgnoreCase(notePutDto.getIncludingNoteName().get(0)).stream()
                .map(perfumeMapper::fromEntity)
                .collect(Collectors.toList());
    }
    public List<PerfumeGetDto> findByNotesList(NotePutDto notePutDto) {
        List<String> includingList = notePutDto.getIncludingNoteName();
        List<String> excludingList = notePutDto.getExcludingNoteName();

        ListIterator<String> includingIterator = includingList.listIterator();
        while (includingIterator.hasNext())
        {
            includingIterator.set(includingIterator.next().toLowerCase());
        }
        ListIterator<String> excludingIterator = excludingList.listIterator();
        while (excludingIterator.hasNext())
        {
            excludingIterator.set(excludingIterator.next().toLowerCase());
        }

        List<PerfumeGetDto> includingPerfumeList = perfumesRepository.findByNotes(includingList, includingList.size()).stream()
                .map(perfumeMapper::fromEntity)
                .collect(Collectors.toList());
        Set<PerfumeGetDto> includingPerfumeSet = new HashSet<>(includingPerfumeList);
        Set<String> excludingSet = new HashSet<>(excludingList);
        for (PerfumeGetDto perfume : includingPerfumeList) {
            Set<String> perfumeNotes = new HashSet<>();
            for (NoteGetDto note : perfume.getNotes()) {
                perfumeNotes.add(note.getNoteName().toLowerCase());
            }
            perfumeNotes.retainAll(excludingSet);
            if (perfumeNotes.size() != 0){
                includingPerfumeSet.remove(perfume);
            }
        }
//        Set<PerfumeGetDto> includingPerfumeSet = new HashSet<PerfumeGetDto>(includingPerfumeList);
//        if (notePutDto.getExcludingNoteName().size() != 0) {
//            ListIterator<String> excludingIterator = excludingList.listIterator();
//            while (excludingIterator.hasNext())
//            {
//                excludingIterator.set(excludingIterator.next().toLowerCase());
//            }
//            List<PerfumeGetDto> excludingPerfumeList = perfumesRepository.findByNotes(excludingList, excludingList.size()).stream()
//                    .map(perfumeMapper::fromEntity)
//                    .collect(Collectors.toList());
//            Set<PerfumeGetDto> excludingPerfumeSet = new HashSet<PerfumeGetDto>(excludingPerfumeList);
//            includingPerfumeSet.removeAll(excludingPerfumeSet);
//        }
        return new ArrayList<>(includingPerfumeSet);
    }
}
