/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package co.edu.usa.Reto3.CrudRepository;

import co.edu.usa.Reto3.model.Reservation;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Laura
 */
public interface ReservationsCrudRepository extends CrudRepository<Reservation, Integer> {
    @Query("select c.client, COUNT(c.client) from Reservation AS c group by c.client order by COUNT(c.client)desc")
    
    public List<Object[]> countTotalReservationByClient();
    
   public List<Reservation> findByStartDateAfterAndStartDateBefore(Date dateOne,Date dateTwo); 
   
    public List<Reservation> findAllByDescription (String description);
}
