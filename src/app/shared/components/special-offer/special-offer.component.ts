import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-offer',
  templateUrl: './special-offer.component.html',
  styleUrls: ['./special-offer.component.scss']
})
export class SpecialOfferComponent implements OnInit {
  ngOnInit(): void {
    this.getsetTimeout();
  }

  getsetTimeout() {
    function updateTimer() {
      
      const daysElement: any = document.querySelector('.time[aria-label="days"]');
      const hoursElement: any = document.querySelector('.time[aria-label="hours"]');
      const minutesElement: any = document.querySelector('.time[aria-label="minutes"]');
      const secondsElement: any = document.querySelector('.time[aria-label="seconds"]');

      let days = parseInt(daysElement.textContent);
      let hours = parseInt(hoursElement.textContent);
      let minutes = parseInt(minutesElement.textContent);
      let seconds = parseInt(secondsElement.textContent);

      const countdownInterval = setInterval(() => {
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 23;

              if (days > 0) {
                days--;
              } else {
             
                clearInterval(countdownInterval);
              }
            }
          }
        }

        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
      }, 1000); 
    }

    
    setTimeout(updateTimer, 1000);
  }
}
