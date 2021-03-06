import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// Models
import { Event } from 'src/app/models/Event';
import { Volunteer } from 'src/app/models/Volunteer';

// Static Data
import { EVENT_TYPES } from 'src/app/data/event-type-data';
import { VOLUNTEER_TYPES } from 'src/app/data/volunteer-type-data';

// Services
import { EventsService } from 'src/app/services/events.service';
import { VolunteersService } from 'src/app/services/volunteers.service';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  headerTitle = 'Add Events Page';
  headerColor = 'accent';
  headerIcon = 'event_available';

  // Properties for tracking event status
  eventIsFull: boolean = false;
  prBarCounter: number = 0;
  currentEventType: string;
  eventDate: number;

  // Properties for finding matching family members
  matchingFamilyID: String;
  matchingFamilyArray: Volunteer[];
  familyNameArray = [];

  // Properties for Duplicates
  hasDuplicates: boolean;
  hasDuplicateLector: boolean;
  hasDuplicateEMoHC: boolean;
  hasDuplicateServer: boolean;
  hasDuplicateUsher: boolean;
  hasDuplicateRosary: boolean;
  hasDuplicateTech: boolean;

  // Properties for Event Approval Exceptions
  duplicateVolunteerApproval: boolean = false;
  incompleteEventApproval: boolean = false;
  checkForMatchingFamily: boolean = false;

  // All Observables for future filtering by event date.
  allVolunteers$: Observable<Volunteer[]>;
  onlyCantors$: Observable<any>;
  onlyLectors$: Observable<any>;
  onlyServers$: Observable<any>;
  onlyUshers$: Observable<any>;
  onlyGifts$: Observable<any>;
  onlyGiftsChild$: Observable<any>;
  onlyRosarys$: Observable<any>;
  onlyTechs$: Observable<any>;
  onlyEMoHCs$: Observable<any>;
  onlyMassCoords$: Observable<any>;
  selectedVolunteer$: Observable<any>;
  selectedFamilyMembers$: Observable<any>;

  // Observables for Date Specific Form Inputs
  cantorsByDate$: Observable<any>;
  lectorsByDate$: Observable<any>;
  serversByDate$: Observable<any>;
  ushersByDate$: Observable<any>;
  giftsByDate$: Observable<any>;
  childGiftsByDate$: Observable<any>;
  rosarysByDate$: Observable<any>;
  techsByDate$: Observable<any>;
  eMoHCsByDate$: Observable<any>;
  massCoordsByDate$: Observable<any>;

  // Observable for Event Date
  allEvents$: Observable<Event[]>;
  eventsArray: Event[];

  addEventForm: FormGroup;
  eventDateArray = [];
  eventDateToAdd: number;

  panel1Complete: boolean = false;
  panel2Complete: boolean = false;
  panel3Complete: boolean = false;
  panel4Complete: boolean = false;

  eventTypes = EVENT_TYPES;
  volunteerTypes = VOLUNTEER_TYPES;

  constructor(
    private eventsService: EventsService,
    private volunteersService: VolunteersService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.addEventForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      isFull: [false, Validators.required],
      cantor: ['', Validators.required],
      lector1: ['', Validators.required],
      lector2: ['', Validators.required],
      eMoHC1: ['', Validators.required],
      eMoHC2: ['', Validators.required],
      eMoHC3: ['', Validators.required],
      eMoHC4: ['', Validators.required],
      eMoHC5: ['', Validators.required],
      eMoHC6: ['', Validators.required],
      eMoHC7: ['', Validators.required],
      gifts: ['', Validators.required],
      giftsChild: ['', Validators.required],
      rosary1: ['', Validators.required],
      rosary2: ['', Validators.required],
      usher1: ['', Validators.required],
      usher2: ['', Validators.required],
      usher3: ['', Validators.required],
      usher4: ['', Validators.required],
      usher5: ['', Validators.required],
      massCord: ['', Validators.required],
      server1: ['', Validators.required],
      server2: ['', Validators.required],
      server3: ['', Validators.required],
      tech1: ['', Validators.required],
      tech2: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.disableFormInputs();
    this.loadAllVolunteers();
    this.allEvents$ = this.eventsService.getEvents();
    this.allEvents$.subscribe((eventData) => {
      this.eventsArray = eventData;
      this.getEventDates(this.eventsArray);
    });
  }

  getEventDates(data: Event[]) {
    this.eventDateArray = [];
    data.map((el) => {
      let dateToStore = '';
      dateToStore = el.date;
      this.eventDateArray.push(dateToStore);
    });
  }

  // Get All Volunteers then filter by ministry
  loadAllVolunteers() {
    this.allVolunteers$ = this.volunteersService.getVolunteers();

    this.onlyCantors$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isCantor === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyLectors$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isLector === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyServers$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isServer === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyUshers$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isUsher === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyGifts$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isGifts === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyGiftsChild$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isGiftsChild === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyRosarys$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isRosary === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyTechs$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isTech === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyEMoHCs$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isEMoHC === true && volunteer.isAvailable === true
        )
      )
    );

    this.onlyMassCoords$ = this.allVolunteers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer) =>
            volunteer.isMassCoord === true && volunteer.isAvailable === true
        )
      )
    );
  }

  // Get event form controls reference for use in template
  get f() {
    return this.addEventForm.controls;
  }

  setEventDate(e: any) {
    this.eventDate = Math.floor(e.target.value);
    this.getDateAvailableVolunteers(this.currentEventType, this.eventDate);
  }

  // Used by DatePicker
  dayAllowedFilter = (d: Date): boolean => {
    const day = d.getDay();
    if (this.currentEventType === 'Weekday') {
      // Only allow weekdays to be selected.
      return day !== 0 && day !== 6;
    } else if (this.currentEventType === 'Saturday') {
      // Only allow Saturday to be selected.
      return (
        day !== 0 &&
        day !== 1 &&
        day !== 2 &&
        day !== 3 &&
        day !== 4 &&
        day !== 5
      );
    } else {
      // Only allow Sunday to be selected.
      return (
        day !== 1 &&
        day !== 2 &&
        day !== 3 &&
        day !== 4 &&
        day !== 5 &&
        day !== 6
      );
    }
  };

  getDateAvailableVolunteers(eventType: string, eventDate: number) {
    let dayToCheck: string;

    if (eventType === 'Saturday') {
      dayToCheck = 'isSaturday';
    } else if (eventType === 'Sunday-Early') {
      dayToCheck = 'isSundayEarly';
    } else if (eventType === 'Sunday-Late') {
      dayToCheck = 'isSundayLate';
    } else {
      dayToCheck = 'isWeekday';
    }

    this.cantorsByDate$ = this.onlyCantors$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.lectorsByDate$ = this.onlyLectors$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.serversByDate$ = this.onlyServers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.ushersByDate$ = this.onlyUshers$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.giftsByDate$ = this.onlyGifts$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.childGiftsByDate$ = this.onlyGiftsChild$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.rosarysByDate$ = this.onlyRosarys$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.techsByDate$ = this.onlyTechs$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.eMoHCsByDate$ = this.onlyEMoHCs$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );

    this.massCoordsByDate$ = this.onlyMassCoords$.pipe(
      map((volunteers) =>
        volunteers.filter(
          (volunteer: Volunteer) =>
            !volunteer.dateUnAvailable.includes(eventDate) &&
            volunteer[dayToCheck] === true
        )
      )
    );
  }

  updateUI(e) {
    // Update staffing level after input change
    this.checkStaffingLevel(this.currentEventType);
    this.checkPanelStatus();

    /* If "Check for Matching Family" checkbox is checked
     return matching FamilyID. */
    if (this.checkForMatchingFamily) {
      const selectedVolunteer$ = this.allVolunteers$.pipe(
        map((volunteers) =>
          volunteers.filter(
            (volunteers) =>
              volunteers.firstName + ' ' + volunteers.lastName === e.value
          )
        )
      );

      selectedVolunteer$.subscribe((volData) => {
        this.matchingFamilyID = volData.shift().familyID;
        const selectedFamilyMembers$ = this.allVolunteers$.pipe(
          map((volunteers) =>
            volunteers.filter(
              (volunteers) =>
                volunteers.familyID === this.matchingFamilyID.toString()
            )
          )
        );

        selectedFamilyMembers$.subscribe((volData) => {
          this.matchingFamilyArray = volData;
          this.processFamilyID(this.matchingFamilyArray);
        });
      });
    }
  }

  /* Create new array of only family member names
      that match the familyID and display
      them in a SnackBar
  */
  processFamilyID(data: Volunteer[]) {
    data.map((el) => {
      let firstNameMatch = 'firstName';
      let lastNameMatch = 'lastName';
      let fullName = '';
      firstNameMatch = el.firstName;
      lastNameMatch = el.lastName;
      fullName = firstNameMatch + ' ' + lastNameMatch;
      this.familyNameArray.push(fullName);
    });
    // Create a string from array to use in snackBar
    const snackbarResult = this.familyNameArray.join(' , ');
    this.manualDismissSnackBar(
      `All family members include: ${snackbarResult}`,
      'OK'
    );
    this.familyNameArray = [];
  }

  // Disable all inputs until Event Type is selected
  disableFormInputs() {
    this.volunteerTypes.forEach((el) => {
      this.f[el.value].disable();
    });
  }

  /*
  Enable all inputs prior to setting only
  the inputs required based on the Event Type
  */
  enableFormInputs() {
    this.volunteerTypes.forEach((el) => {
      this.f[el.value].enable();
    });
  }

  setValueFormInputs() {
    this.volunteerTypes.forEach((el) => {
      this.f[el.value].setValue('');
    });
  }

  /* When event type is changed, disable and
  clear fields as needed based on the event type
  choosen
  */
  onEventTypeChanged(e) {
    this.resetPanels();
    this.f.date.setValue('');
    this.disableFormInputs();
    this.setValueFormInputs();
    this.currentEventType = e.value;
    if (this.currentEventType === 'Weekday') {
      // Enable required fields
      this.f.lector1.enable();
      this.f.eMoHC1.enable();
      this.f.server1.enable();
      this.checkStaffingLevel(this.currentEventType);
    } else if (this.currentEventType === 'Sunday-Early') {
      // Enable required fields
      this.f.cantor.enable();
      this.f.lector1.enable();
      this.f.lector2.enable();
      this.f.eMoHC1.enable();
      this.f.eMoHC2.enable();
      this.f.usher1.enable();
      this.f.usher2.enable();
      this.f.server1.enable();
      this.f.server2.enable();
      this.f.tech1.enable();
      this.f.tech2.enable();
      this.checkStaffingLevel(this.currentEventType);
    } else {
      // Enable required fields
      this.enableFormInputs();
      this.checkStaffingLevel(this.currentEventType);
    }
  }

  resetDuplicates() {
    this.hasDuplicateUsher = false;
    this.hasDuplicateLector = false;
    this.hasDuplicateServer = false;
    this.hasDuplicateEMoHC = false;
    this.hasDuplicateRosary = false;
    this.hasDuplicateTech = false;
  }

  checkForDuplicates() {
    this.resetDuplicates();
    /*  If Incomplete Event Approval is checked
        do not check for duplicates. */
    if (!this.incompleteEventApproval) {
      if (this.currentEventType === 'Weekday') {
        return;
      } else if (this.currentEventType === 'Sunday-Early') {
        // Check for duplicate Lectors
        if (this.f.lector1.value === this.f.lector2.value) {
          return (this.hasDuplicateLector = true);
        }

        // Check for duplicate Servers
        if (this.f.server1.value === this.f.server2.value) {
          return (this.hasDuplicateServer = true);
        }

        // Check for duplicate Eucharstic Ministers
        if (
          this.f.eMoHC1.value === this.f.eMoHC2.value ||
          this.f.eMoHC1.value === this.f.eMoHC3.value ||
          this.f.eMoHC2.value === this.f.eMoHC3.value
        ) {
          return (this.hasDuplicateEMoHC = true);
        }

        // Check for duplicate Tech
        if (this.f.tech1.value === this.f.tech2.value) {
          return (this.hasDuplicateTech = true);
        }

        // Check for duplicate Ushers
        if (
          this.f.usher1.value === this.f.usher2.value ||
          this.f.usher1.value === this.f.usher3.value ||
          this.f.usher2.value === this.f.usher3.value
        ) {
          return (this.hasDuplicateUsher = true);
        }
      } else {
        // Saturday & Sunday Late Duplicate Checking
        // Check for duplicate Lectors
        if (this.f.lector1.value === this.f.lector2.value) {
          return (this.hasDuplicateLector = true);
        }

        // Check for duplicate Servers
        if (
          this.f.server1.value === this.f.server2.value ||
          this.f.server1.value === this.f.server3.value ||
          this.f.server2.value === this.f.server3.value
        ) {
          return (this.hasDuplicateServer = true);
        }

        // Check for duplicate Eucharstic Ministers
        if (
          this.f.eMoHC1.value === this.f.eMoHC2.value ||
          this.f.eMoHC1.value === this.f.eMoHC3.value ||
          this.f.eMoHC1.value === this.f.eMoHC4.value ||
          this.f.eMoHC1.value === this.f.eMoHC5.value ||
          this.f.eMoHC1.value === this.f.eMoHC6.value ||
          this.f.eMoHC1.value === this.f.eMoHC7.value ||
          this.f.eMoHC2.value === this.f.eMoHC3.value ||
          this.f.eMoHC2.value === this.f.eMoHC4.value ||
          this.f.eMoHC2.value === this.f.eMoHC5.value ||
          this.f.eMoHC2.value === this.f.eMoHC6.value ||
          this.f.eMoHC2.value === this.f.eMoHC7.value ||
          this.f.eMoHC3.value === this.f.eMoHC4.value ||
          this.f.eMoHC3.value === this.f.eMoHC5.value ||
          this.f.eMoHC3.value === this.f.eMoHC6.value ||
          this.f.eMoHC3.value === this.f.eMoHC7.value ||
          this.f.eMoHC4.value === this.f.eMoHC5.value ||
          this.f.eMoHC4.value === this.f.eMoHC6.value ||
          this.f.eMoHC4.value === this.f.eMoHC7.value ||
          this.f.eMoHC5.value === this.f.eMoHC6.value ||
          this.f.eMoHC5.value === this.f.eMoHC7.value ||
          this.f.eMoHC6.value === this.f.eMoHC7.value
        ) {
          return (this.hasDuplicateEMoHC = true);
        }

        // Check for duplicate Tech
        if (this.f.tech1.value === this.f.tech2.value) {
          return (this.hasDuplicateTech = true);
        }

        // Check for duplicate Ushers
        if (
          this.f.usher1.value === this.f.usher2.value ||
          this.f.usher1.value === this.f.usher3.value ||
          this.f.usher1.value === this.f.usher4.value ||
          this.f.usher1.value === this.f.usher5.value ||
          this.f.usher2.value === this.f.usher3.value ||
          this.f.usher2.value === this.f.usher4.value ||
          this.f.usher2.value === this.f.usher5.value ||
          this.f.usher3.value === this.f.usher4.value ||
          this.f.usher3.value === this.f.usher5.value ||
          this.f.usher4.value === this.f.usher5.value
        ) {
          return (this.hasDuplicateUsher = true);
        }

        // Check for duplicate Rosary
        if (this.f.rosary1.value === this.f.rosary2.value) {
          return (this.hasDuplicateRosary = true);
        }
      }
    }
    return;
  }

  resetPanels() {
    this.panel1Complete = false;
    this.panel2Complete = false;
    this.panel3Complete = false;
    this.panel4Complete = false;
  }

  checkPanelStatus() {
    this.resetPanels();
    if (this.currentEventType === 'Weekday') {
      this.panel3Complete = true;
      this.panel4Complete = true;
      if (this.f.lector1.value !== '' && this.f.server1.value !== '') {
        this.panel1Complete = true;
      }

      if (this.f.eMoHC1.value !== '') {
        this.panel2Complete = true;
      }
    } else if (
      this.currentEventType === 'Saturday' ||
      this.currentEventType === 'Sunday-Late'
    ) {
      if (
        this.f.cantor.value !== '' &&
        this.f.lector1.value !== '' &&
        this.f.lector2.value !== '' &&
        this.f.server1.value !== '' &&
        this.f.server2.value !== '' &&
        this.f.server3.value !== ''
      ) {
        this.panel1Complete = true;
      }

      if (
        this.f.eMoHC1.value !== '' &&
        this.f.eMoHC2.value !== '' &&
        this.f.eMoHC3.value !== '' &&
        this.f.eMoHC4.value !== '' &&
        this.f.eMoHC5.value !== '' &&
        this.f.eMoHC6.value !== '' &&
        this.f.eMoHC7.value !== '' &&
        this.f.tech1.value !== '' &&
        this.f.tech2.value !== ''
      ) {
        this.panel2Complete = true;
      }

      if (
        this.f.usher1.value !== '' &&
        this.f.usher2.value !== '' &&
        this.f.usher3.value !== '' &&
        this.f.usher4.value !== '' &&
        this.f.usher5.value !== '' &&
        this.f.massCord.value !== ''
      ) {
        this.panel3Complete = true;
      }

      if (
        this.f.rosary1.value !== '' &&
        this.f.rosary1.value !== '' &&
        this.f.gifts.value !== '' &&
        this.f.giftsChild.value !== ''
      ) {
        this.panel4Complete = true;
      }
    } else {
      this.panel4Complete = true;
      if (
        this.f.cantor.value !== '' &&
        this.f.lector1.value !== '' &&
        this.f.lector2.value !== '' &&
        this.f.server1.value !== '' &&
        this.f.server2.value !== ''
      ) {
        this.panel1Complete = true;
      }

      if (
        this.f.eMoHC1.value !== '' &&
        this.f.eMoHC2.value !== '' &&
        this.f.tech1.value !== '' &&
        this.f.tech2.value !== ''
      ) {
        this.panel2Complete = true;
      }

      if (this.f.usher1.value !== '' && this.f.usher2.value !== '') {
        this.panel3Complete = true;
      }
    }
  }

  checkStaffingLevel(e) {
    this.prBarCounter = 0;
    let eventTypeMultiplier = 0;
    if (e === 'Weekday') {
      eventTypeMultiplier = 33.4;
    } else if (e === 'Sunday-Early') {
      eventTypeMultiplier = 9.1;
    } else {
      eventTypeMultiplier = 4;
    }

    this.volunteerTypes.forEach((el) => {
      if (this.f[el.value].value !== '') {
        this.prBarCounter = this.prBarCounter + eventTypeMultiplier;
      }
    });

    if (this.prBarCounter >= 100) {
      this.prBarCounter = 100;
      this.eventIsFull = true;
      this.addEventForm.controls['isFull'].patchValue(true);
    } else {
      this.eventIsFull = false;
    }
  }

  onSubmit({ value, valid }: { value: Event; valid: boolean }) {
    let newValue = value;
    this.eventDateToAdd = Math.floor(value.date);
    newValue.date = this.eventDateToAdd;

    if (!valid && !this.incompleteEventApproval) {
      // Show Error Message
      this.autoDismissSnackBar('Form Invalid', '');
    } else if (!this.duplicateVolunteerApproval) {
      this.checkForDuplicates();
      if (this.hasDuplicateLector) {
        this.manualDismissSnackBar('You have duplicate lectors!', 'OK');
        return;
      }

      if (this.hasDuplicateEMoHC) {
        this.manualDismissSnackBar('You have duplicate EMoHCs!', 'OK');
        return;
      }

      if (this.hasDuplicateServer) {
        this.manualDismissSnackBar('You have duplicate servers!', 'OK');
        return;
      }

      if (this.hasDuplicateUsher) {
        this.manualDismissSnackBar('You have duplicate ushers!', 'OK');
        return;
      }

      if (this.hasDuplicateRosary) {
        this.manualDismissSnackBar('You have duplicate rosary!', 'OK');
        return;
      }

      if (this.hasDuplicateTech) {
        this.manualDismissSnackBar('You have duplicate technology!', 'OK');
        return;
      }

      this.processSubmit(value);
    } else {
      this.processSubmit(value);
    }
  }

  processSubmit(value) {
    console.log('Process Submit');
    if (!this.incompleteEventApproval)
      this.checkStaffingLevel(this.currentEventType);
    if (this.prBarCounter < 100) {
      this.eventIsFull = false;
      this.addEventForm.controls['isFull'].patchValue(false);
    } else {
      this.eventIsFull = true;
      this.addEventForm.controls['isFull'].patchValue(true);
    }

    this.eventsService.addEvent(value);
    this.autoDismissSnackBar('Event Added!', '');
    this.router.navigate(['/events']);
  }

  manualDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
    });
  }

  autoDismissSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
