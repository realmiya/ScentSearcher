package com.example.COMP9900.controller;


import com.example.COMP9900.dtos.note.NoteGetDto;
import com.example.COMP9900.services.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NotesController {
    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<List<NoteGetDto>> getAll(){
        return ResponseEntity.ok(noteService.getAllNotes());
    }

    @GetMapping(value = "/search", params = "notename")
    public ResponseEntity<List<NoteGetDto>> getNotesLike(@RequestParam String notename){
        return ResponseEntity.ok(noteService.findByNameLike(notename));
    }
}
