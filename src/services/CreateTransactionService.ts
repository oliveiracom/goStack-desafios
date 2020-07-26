<<<<<<< HEAD
import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    //checa balance antes de criar
    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enought balance');
    }

    //check if category already exists
    // exist - get id
    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category,
      }
    });
    
    // dont exist -> create category
    if(!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category
      });

      await categoryRepository.save(transactionCategory);
    }
    

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await transactionsRepository.save(transaction);

    return transaction;
    
=======
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string,
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}:Request): Transaction {
    //faz validações de regras de negócio se tiver e manda pro repository fazer o que precisa
    if (!title || !value || !type) {
      throw Error('All values are required');
    }

    if(type === 'outcome'){
      const hasMoney = this.transactionsRepository.getBalance();
      if (hasMoney.total < value) {
        throw Error('Insuficient Funds... Go get some money first!');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });
    return transaction;
>>>>>>> 110070b3af89db9a459809cf0e5f7658610300f6
  }
}

export default CreateTransactionService;
