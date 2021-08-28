package com.example.COMP9900.mappers;

import com.example.COMP9900.dtos.note.NoteGetDto;
import com.example.COMP9900.entities.Notes;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface NoteMapper {
    NoteGetDto fromEntity(Notes notes);
    Notes toEntity(NoteGetDto noteGetDto);
}
