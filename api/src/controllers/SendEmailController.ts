import { 
  Request, 
  Response 
} from "express";

import { 
  getCustomRepository 
} from "typeorm";

import { 
  SurveyRepository 
} from "../repositories/SurveyRepository";

import { 
  SurveyUserRepository 
} from "../repositories/SurveyUserRepository";

import { 
  UsersRepository
} from "../repositories/UsersRepository";

import{ 
  resolve 
} from 'path';

import SendMailService from "../services/SendMailService";

class SendEmailController {

  async execute( request: Request, response: Response ) {

    const {
      email, surveyId
    } = request.body;

    const userRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({
        error: "User doesn't exists"
      });
    }

    const survey = await surveyRepository.findOne({ id: surveyId })

    if (!survey) {
      return response.status(200).json({
        error: "Survey doesn't exists"
      })
    }
    
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      userId: user.id,
      link: process.env.URL_MAIL,
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs'); 

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({ 
      where: [{ userId: user.id }, { value: null }],
      relations: ["user", "survey"],
    });

    if (surveyUserAlreadyExists) {
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    };

    const surveyUser = surveyUserRepository.create({ 
      userId: user.id,
      surveyId
    });

    await surveyUserRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return response.json(surveyUser);
  } 

}

export {
  SendEmailController
}