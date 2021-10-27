/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.Reto3.service;

import co.edu.usa.Reto3.Repository.ReservationsRepository;
import co.edu.usa.Reto3.model.Reservation;
import co.edu.usa.Reto3.model.custom.CountClient;
import co.edu.usa.Reto3.model.custom.DescriptionAmount;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Laura
 */
@Service
public class ReservationsService {
    /**
    *Inyeccion de dependencias
    */
     @Autowired
    private ReservationsRepository metodosCrud;

    /**
     * 
     * @return  Reservacion todos
     */
    public List<Reservation> getAll(){
        return metodosCrud.getAll();
    }

    /**
     * 
     * @param reservationId
     * @return  obtiene reservacion
     */
    public Optional<Reservation> getReservations(int reservationId) {
        return metodosCrud.getReservations(reservationId);
    }

    /**
     * 
     * @param reservations
     * @return guarda reservacion
     */
    public Reservation save(Reservation reservations){
        if(reservations.getIdReservation()==null){
            return metodosCrud.save(reservations);
        }else{
            Optional<Reservation> e= metodosCrud.getReservations(reservations.getIdReservation());
            if(e.isEmpty()){
                return metodosCrud.save(reservations);
            }else{
                return reservations;
            }
        }
    }

    /**
     * 
     * @param reservations
     * @return actualiza reservacion
     */
    public Reservation update(Reservation reservations){
        if(reservations.getIdReservation()!=null){
            Optional<Reservation> e= metodosCrud.getReservations(reservations.getIdReservation());
            if(!e.isEmpty()){

                if(reservations.getStartDate()!=null){
                    e.get().setStartDate(reservations.getStartDate());
                }
                if(reservations.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservations.getDevolutionDate());
                }
                if(reservations.getStatus()!=null){
                    e.get().setStatus(reservations.getStatus());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return reservations;
            }
        }else{
            return reservations;
        }
    }

    /**
     * 
     * @param reservationId
     * @return elimina reservacion
     */
    public boolean deleteReservations(int reservationId) {
        Boolean aBoolean = getReservations(reservationId).map(reservations -> {
            metodosCrud.delete(reservations);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    public List<CountClient> getTopClients(){
      return metodosCrud.getTopClients();
    }
    
    public DescriptionAmount getStatusReport(){
        List<Reservation> completed=metodosCrud.getReservationByDescription("completed");
        List<Reservation> cancelled=metodosCrud.getReservationByDescription("cancelled");
        
        DescriptionAmount descAmt=new DescriptionAmount(completed.size(), cancelled.size());
        return descAmt;
    }
    
    public List<Reservation> getReservationPeriod(String d1, String d2){
        
        SimpleDateFormat parser=new SimpleDateFormat("yyy-MM-dd");
        Date dateOne=new Date();
        Date dateTwo=new Date();
         try {
            dateOne=parser.parse(d1);
            dateTwo=parser.parse(d2);
        } catch (ParseException e) {
            e.printStackTrace();
        }
         if(dateOne.before(dateTwo)){
             return metodosCrud.getReservationPeriod(dateOne, dateTwo);
         }else{
             return new ArrayList<>();
         }

    }
}
