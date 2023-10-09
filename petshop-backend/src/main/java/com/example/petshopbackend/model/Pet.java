package com.example.petshopbackend.model;

import com.example.petshopbackend.model.enums.PetType;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(name = "pets")
@Data
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User owner;

    @NotNull
    private String name;

    @Enumerated(EnumType.STRING)
    private PetType type;

    private String description;
    @NotNull
    private LocalDate dateOfBirth;
    private BigDecimal price;
    private Integer rating; // Only for dogs

    public Pet() {
    }

    // The calculated price is automatically set to the 'price' field of the pet entity
    // during the pre-persistence stage before it is saved to the database.
    @PrePersist
    private void calculatePrice() {
        int ageInYears = Period.between(dateOfBirth, LocalDate.now()).getYears();
        BigDecimal basePrice = BigDecimal.valueOf(ageInYears);

        if (type == PetType.DOG) {
            basePrice = basePrice.add(BigDecimal.valueOf(rating));
        }

        price = basePrice;
    }
}
