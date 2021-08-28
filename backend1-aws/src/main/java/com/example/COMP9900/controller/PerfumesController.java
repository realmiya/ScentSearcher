package com.example.COMP9900.controller;

import com.example.COMP9900.dtos.note.NoteGetDto;
import com.example.COMP9900.dtos.note.NotePutDto;
import com.example.COMP9900.dtos.perfume.PerfumeGetDto;
import com.example.COMP9900.dtos.review.ReviewGetDto;
import com.example.COMP9900.dtos.review.ReviewPutDto;
import com.example.COMP9900.services.PerfumeService;
import com.example.COMP9900.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfumes")
@RequiredArgsConstructor
public class PerfumesController {
    private final PerfumeService perfumeService;
    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<PerfumeGetDto> getAll(){
        return ResponseEntity.ok(perfumeService.findById((long) 0));
    }

    @GetMapping("/{perfumeid}")
    public ResponseEntity<PerfumeGetDto> getById(@PathVariable String perfumeid){
        return ResponseEntity.ok(perfumeService.findById(Long.valueOf(perfumeid)));
    }

    @GetMapping(value = "/search", params = "perfumename")
    public ResponseEntity<List<PerfumeGetDto>> getPerfumesLike(@RequestParam String perfumename){
        return ResponseEntity.ok(perfumeService.findByNameLike(perfumename));
    }

//    @PostMapping(value = "/search")
//    public ResponseEntity<List<PerfumeGetDto>> getPerfumesByNotes(@RequestBody NotePutDto notePutDto){
//        return ResponseEntity.ok(perfumeService.findByNotes(notePutDto));
//    }

    @PostMapping(value = "/search")
    public ResponseEntity<List<PerfumeGetDto>> getPerfumesByNotesList(@RequestBody NotePutDto notePutDto){
        return ResponseEntity.ok(perfumeService.findByNotesList(notePutDto));
    }

    @PostMapping(value = "/review")
    public ResponseEntity<ReviewGetDto> saveNewReview(@RequestBody ReviewPutDto reviewPutDto) {
        return ResponseEntity.ok(reviewService.createReview(reviewPutDto));
    }
}
