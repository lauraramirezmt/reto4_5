/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.Reto3.Repository;

import co.edu.usa.Reto3.model.Reservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import co.edu.usa.Reto3.CrudRepository.ReservationsCrudRepository;
import co.edu.usa.Reto3.model.Client;
import co.edu.usa.Reto3.model.custom.CountClient;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Laura
 */
@Repository
public class ReservationsRepository {
    
    @Autowired
    private ReservationsCrudRepository crud4;
    public List<Reservation> getAll(){
        return (List<Reservation>) crud4.findAll();
    }
    public Optional<Reservation> getReservations(int id){
        return crud4.findById(id);
    }

    public Reservation save(Reservation reservations){
        return crud4.save(reservations);
    }
    public void delete(Reservation reservations){
        crud4.delete(reservations);
    }  
    
    public List<Reservation> getReservationByStatus (String status){
        return crud4.findAllByStatus(status);
    }
    
    public List<Reservation> getReservationPeriod(Date dateOne, Date dateTwo){
        return crud4.findByStartDateAfterAndStartDateBefore(dateOne, dateTwo);
        
    }
    
    public List<CountClient> getTopClients(){
        List<CountClient> res=new ArrayList<>();
        
        List<Object[]> report=crud4.countTotalReservationByClient();
        for(int i=0;i<report.size();i++){
            Client cat=(Client)report.get(i)[0];
            Long cantidad=(Long) report.get(i)[1];
            CountClient cc=new CountClient(cantidad, cat);
            res.add(cc);
            
        }
        
        return res;
    }
}
    

