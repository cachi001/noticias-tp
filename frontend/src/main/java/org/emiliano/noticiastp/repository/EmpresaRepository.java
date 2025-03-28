package org.emiliano.noticiastp.repository;

import org.emiliano.noticiastp.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

}
