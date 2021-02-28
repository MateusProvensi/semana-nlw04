import { json, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { AppError } from "../__tests__/errors/AppError";

class AnswerController {
  
  //http://localhost:3333/answers/2?u=fbf4ff98-ab4a-4524-9784-8a7b75ff5e66
  
  async execute(request: Request, response: Response){
    const { value } = request.params;
    const { u } = request.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey User doesn't exists");
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return response.json(surveyUser);
  }

}

export {
  AnswerController
}