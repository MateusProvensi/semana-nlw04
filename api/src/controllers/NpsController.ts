import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class NpsController{
  /*
  0 - 6 => Detratores
  7 - 8 => Passivos
  9 - 10 => Promotores

  (numeroProotores - numeroDetratores) / (numeroRespondentes) * 100
  */
  async execute(request: Request, response: Response) {

    const { surveyId } = request.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveysUsers = await surveyUserRepository.find({
      surveyId,
      value: Not(IsNull()),
    })

    const detractor = surveysUsers.filter(
      (survey) => (survey.value >= 0 && survey.value <= 6)
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => (survey.value >= 9 && survey.value <= 10)
    ).length;

    const passive = surveysUsers.filter(
      (survey) => (survey.value >= 7 && survey.value <= 8)
    )

    const totalAnswers = surveysUsers.length;

    const calculate = Number(((promoters - detractor) / totalAnswers * 100).toFixed(2));

    return response.json({
      detractor, 
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    })
  }

};

export {
  NpsController
};