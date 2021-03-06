import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
import { LoadingService } from 'src/app/services/loading.service';

// RXJS
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  headerTitle = 'Edit Event Page';
  headerColor = 'accent';
  headerIcon = 'edit_calendar';

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

  // Properties for Initial Editing Setup
  initialEditEventType: string;
  tempEditDate: Date;
  tempCalcDate: number;

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
  event$: Observable<Event>;

  eventEditForm: FormGroup;
  eventDateToAdd: number;
  id: string;

  panel1Complete: boolean = false;
  panel2Complete: boolean = false;
  panel3Complete: boolean = false;
  panel4Complete: boolean = false;

  eventTypes = EVENT_TYPES;
  volunteerTypes = VOLUNTEER_TYPES;

  constructor(
    private eventsService: EventsService,
    private volunteersService: VolunteersService,
    public loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventEditForm = this.fb.group({
      id: '',
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
    this.disableFormInputs();
    this.loadAllVolunteers();
  }

  loadAllVolunteers() {
    this.event$ = this.eventsService
      .getEvent(this.id)
      .pipe(tap((event) => this.eventEditForm.patchValue(event)));

    // Get All Volunteers then filter by ministry
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
    this.event$.subscribe(() => this.updateAfterLoad());
  }

  get f() {
    return this.eventEditForm.controls;
  }

  updateAfterLoad() {
    this.loadingService.loadingOn();
    setTimeout(() => {
      this.currentEventType = this.f.type.value;
      let tempDate = new Date(this.f.date.value);
      this.f.date.patchValue(tempDate);
      this.updateUI(this.currentEventType);
      this.setEventDate(this.f.date.value);
      this.setInputs();
      this.loadingService.loadingOff();
    }, 2000);
    this.onEventTypeChanged();
  }

  setEventDate(e: any) {
    this.eventDate = Math.floor(e);
    this.getDateAvailableVolunteers(this.currentEventType, this.eventDate);
  }

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

  processFamilyID(data: Volunteer[]) {
    /* Create new array of only family member names
        that match the familyID and display
        them in a SnackBar
    */
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

  enableFormInputs() {
    this.volunteerTypes.forEach((el) => {
      this.f[el.value].enable();
    });
  }

  onUpdateEventType(e) {
    this.currentEventType = e.value;
    this.onEventTypeChanged();
  }

  // Disable all inputs until Event Type is selected
  disableFormInputs() {
    this.volunteerTypes.forEach((el) => {
      this.f[el.value].disable();
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
  onEventTypeChanged() {
    this.f.date.setValue('');
    this.disableFormInputs();
    this.setValueFormInputs();
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
      this.checkStaffingLevel(this.currentEventType);
    } else {
      // Enable required fields
      this.enableFormInputs();
      this.checkStaffingLevel(this.currentEventType);
    }
  }

  setInputs() {
    if (this.currentEventType === 'Weekday') {
      this.f.cantor.disable();
      this.f.lector2.disable();
      this.f.eMoHC2.disable();
      this.f.eMoHC3.disable();
      this.f.eMoHC4.disable();
      this.f.eMoHC5.disable();
      this.f.eMoHC6.disable();
      this.f.eMoHC7.disable();
      this.f.server2.disable();
      this.f.server3.disable();
      this.f.gifts.disable();
      this.f.giftsChild.disable();
      this.f.rosary1.disable();
      this.f.rosary2.disable();
      this.f.usher1.disable();
      this.f.usher2.disable();
      this.f.usher3.disable();
      this.f.usher4.disable();
      this.f.usher5.disable();
      this.f.massCord.disable();
      this.f.tech1.disable();
      this.f.tech2.disable();
    } else if (this.currentEventType === 'Sunday-Early') {
      this.f.eMoHC3.disable();
      this.f.eMoHC4.disable();
      this.f.eMoHC5.disable();
      this.f.eMoHC6.disable();
      this.f.eMoHC7.disable();
      this.f.server3.disable();
      this.f.gifts.disable();
      this.f.giftsChild.disable();
      this.f.rosary1.disable();
      this.f.rosary2.disable();
      this.f.usher3.disable();
      this.f.usher4.disable();
      this.f.usher5.disable();
      this.f.massCord.disable();
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
    //  If Incomplete Event Approval is checked
    //  Do not check for duplicates.
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

      if (this.f.eMoHC1.value !== '' && this.f.eMoHC2.value !== '') {
        this.panel2Complete = true;
      }

      if (this.f.usher1.value !== '' && this.f.usher2.value !== '') {
        this.panel3Complete = true;
      }
    }
  }

  checkStaffingLevel(e) {
    this.prBarCounter = 0;
    var eventTypeMultiplier = 0;
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
      this.eventEditForm.controls['isFull'].patchValue(true);
    } else {
      this.eventIsFull = false;
      this.eventEditForm.controls['isFull'].patchValue(false);
    }
  }

  onSubmit({ value, valid }: { value: Event; valid: Boolean }) {
    let newValue = value;
    this.eventDateToAdd = Math.floor(value.date);
    newValue.date = this.eventDateToAdd;

    if (!valid && !this.incompleteEventApproval) {
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
      this.eventEditForm.controls['isFull'].patchValue(false);
    } else {
      this.eventIsFull = true;
      this.eventEditForm.controls['isFull'].patchValue(true);
    }
    this.eventsService.updateEvent(value);
    this.autoDismissSnackBar('Event Updated!', '');
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
