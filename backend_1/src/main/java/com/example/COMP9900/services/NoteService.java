package com.example.COMP9900.services;

import com.example.COMP9900.dtos.note.NoteGetDto;
import com.example.COMP9900.mappers.NoteMapper;
import com.example.COMP9900.repositories.NotesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NotesRepository notesRepository;
    private final NoteMapper noteMapper;

    public List<NoteGetDto> getAllNotes() {
        return notesRepository.findAll().stream()
                .map(noteMapper::fromEntity)
                .collect(Collectors.toList());
    }

    public List<NoteGetDto> findByNameLike(String name) {
        return notesRepository.findByNoteNameContainingIgnoreCase(name).stream()
                .map(noteMapper::fromEntity)
                .collect(Collectors.toList());
    }
}
