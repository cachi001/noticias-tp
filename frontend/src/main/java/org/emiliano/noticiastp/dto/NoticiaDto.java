package org.emiliano.noticiastp.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoticiaDto {

    private Long id;

    @NotNull(message = "El titulo es obligatorio")
    private String titulo;

    @NotNull(message = "El resumen es obligatorio")
    private String resumenNoticia;

    @NotNull(message = "El imagen es obligatoria")
    private String imagenNoticia;

    @Lob
    @NotNull(message = "El contenido es obligatorio")
    private String contenidoHtml;

    @NotNull(message = "Saber si se publico es obligatorio")
    private boolean publicada; // Y == SI o N == NO

    @NotNull(message = "La fecha de publicacion es obligatoria")
    private Date fechaPublicacion;

    private Long idEmpresa; // Aquí se pasa solo el ID de la empresa
}
