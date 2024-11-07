import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { WeightEntriesList } from 'src/app/shared/models/weight-entries-list';
import { WeightEntry } from 'src/app/shared/models/weight-entry';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public storedObject: WeightEntriesList;

  constructor(private readonly storage: LocalStorageService) {}

  ngOnInit() {
    this.storedObject =
      this.storage.get<WeightEntriesList>(GlobalConstants.localStorageKey) ||
      ({ entries: [] } as WeightEntriesList);
  }

  public storeEntry(weightEntry: WeightEntry) {
    const existingEntry = this.storedObject.entries.find(
      (entry) => entry.date === weightEntry.date
    );
    if (existingEntry) {
      existingEntry.weight = weightEntry.weight;
    } else {
      this.storedObject.entries.push(weightEntry);
    }

    this.storage.set<WeightEntriesList>(
      GlobalConstants.localStorageKey,
      this.storedObject
    );
  }
}
