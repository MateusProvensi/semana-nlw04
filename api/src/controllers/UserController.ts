import {
  Request,
  Response
} from "express";

import {
  getCustomRepository
} from "typeorm";

import {
  UsersRepository
} from "../repositories/UsersRepository";

import * as yup from 'yup';

class UserController {

  async create(request: Request, response: Response) {
    const {
      name,
      email
    } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome is required"),
      email:yup.string().email().required("Email incorreted"),
    })

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({
        error: err,
      })
    }

    const userRepository = getCustomRepository(UsersRepository);

    const userAlredyExists = await userRepository.findOne({ email })

    if (userAlredyExists) {
      return response.status(400).json({
        error: "User alredy exists!",
      })
    }

    const user = userRepository.create({
      name,
      email
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  };

  async show(request: Request, response: Response) {
    const userRepository = getCustomRepository(UsersRepository);
    
    const all = await userRepository.find();

    response.status(200).json(all);
  }
}

export {
  UserController
};