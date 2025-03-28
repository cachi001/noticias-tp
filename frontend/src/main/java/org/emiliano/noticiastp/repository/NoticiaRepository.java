package org.emiliano.noticiastp.repository;

import org.emiliano.noticiastp.model.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticiaRepository extends JpaRepository<Noticia, Long> {
}
