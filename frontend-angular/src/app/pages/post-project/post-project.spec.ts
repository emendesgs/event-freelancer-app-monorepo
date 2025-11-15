import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProject } from './post-project';

describe('PostProject', () => {
  let component: PostProject;
  let fixture: ComponentFixture<PostProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
