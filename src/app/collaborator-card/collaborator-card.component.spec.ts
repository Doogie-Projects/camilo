import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorCardComponent } from './collaborator-card.component';

describe('CollaboratorCardComponent', () => {
  let component: CollaboratorCardComponent;
  let fixture: ComponentFixture<CollaboratorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratorCardComponent]
    });
    fixture = TestBed.createComponent(CollaboratorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
