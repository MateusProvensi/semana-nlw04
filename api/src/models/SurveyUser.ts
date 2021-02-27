import { Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn 
} from "typeorm";

import { 
  v4 as uuid 
} from "uuid"

import { 
  User 
} from './User';

import {
  Survey
} from './Survey';

@Entity("surveys_users")
class SurveyUser {

  @PrimaryColumn()
  readonly id: string;
  
  @Column({ name: "survey_id" })
  surveyId: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: "survey_id" })
  survey: Survey;

  @Column({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  value: Number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { 
  SurveyUser 
}