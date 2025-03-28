package org.emiliano.noticiastp.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Noticia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El titulo es obligatorio")
    @Column(length = 128, nullable = false)
    private String titulo;

    @NotNull(message = "El resumen es obligatorio")
    @Column(length = 1024, nullable = false)
    private String resumenNoticia;

    @NotNull(message = "El imagen es obligatoria")
    @Column(length = 128, nullable = false)
    private String imagenNoticia;

    @Lob
    @Column(nullable = false)
    @NotNull(message = "El contenido es obligatorio")
    private String contenidoHtml;

    @Column(nullable = false)
    @NotNull(message = "Saber si se publico es obligatorio")
    private boolean publicada; // TRUE == SI o FALSE == NO

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    @NotNull(message = "La fecha de publicacion es obligatoria")
    private Date fechaPublicacion;

    @ManyToOne
    @JoinColumn(name = "id_empresa",nullable = false)
    @JsonBackReference
    private Empresa empresa;
}
