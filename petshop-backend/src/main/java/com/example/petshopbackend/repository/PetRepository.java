package com.example.petshopbackend.repository;

import com.example.petshopbackend.model.Pet;
import com.example.petshopbackend.model.enums.PetType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    @Query(
            value = "SELECT pet FROM Pet pet " +
                    " where ( :hasOwner=false or pet.owner is null ) " +
                    " and ( :name is null or (lower(pet.name) like concat('%', lower(:name), '%')) ) " +
                    " and ( :type is null or pet.type=:type ) " +
                    " and ( :price is null or pet.price <= :price ) "
    )
    Page<Pet> searchPets(
            @Param("pageable") Pageable pageable,
            @Param("hasOwner") Boolean hasOwner,
            @Param("name") String name,
            @Param("type") PetType type,
            @Param("price") BigDecimal price
    );

    List<Pet> findAllByOwnerId(Long id);
}
