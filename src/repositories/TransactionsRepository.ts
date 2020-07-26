<<<<<<< HEAD
import { EntityRepository, Repository } from 'typeorm';

=======
>>>>>>> 110070b3af89db9a459809cf0e5f7658610300f6
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

<<<<<<< HEAD
@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const { income, outcome } = transactions.reduce((acc, transaction) => {
      switch(transaction.type) {
        case 'income':
          acc.income += Number(transaction.value);
          break;
        case 'outcome':
          acc.outcome += Number(transaction.value);
          break;

        default: break;
      }

      return acc;
    } , {
      income: 0,
      outcome: 0,
      total: 0,
    });

    const total = income - outcome;

    return {income, outcome, total};
=======
interface ShowTransaction {
  transactions: Transaction[],
  balance: Balance
}

interface NewTrasanctionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ReduceBalance {
  income: number;
  outcome: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ShowTransaction {
    const balance = this.getBalance()
    const allTransactions = {
      transactions: this.transactions,
      balance,
    }

    return allTransactions;
  }

  public getBalance(): Balance {
    let sum = {
      'income': 0,
      'outcome': 0,
      'total':0
    }
    // TODO
    /*function groupTransactions( objArray: Transaction[], prop:string){
      return objArray.reduce(function (acc, item):ReduceBalance  {

        let key = item[prop];
        sum[key] += Number(item['value']);

        console.log(sum);
        return sum;
      }, {});
    }

    let types = groupTransactions(this.transactions, 'type');

    const balance:Balance = {
      income: types['income'],
      outcome: types['outcome'],
      total: types['income'] - types['outcome']
    } */

    const result = this.transactions.map(item => {
      if(item['type'] === 'income') {
        sum['income'] += Number(item['value']);
      } else {
        sum['outcome'] += Number(item['value']);
      }
    });

    sum['total'] = sum['income'] - sum['outcome'];
    return sum;
  }

  public create({title, value, type}:NewTrasanctionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
>>>>>>> 110070b3af89db9a459809cf0e5f7658610300f6
  }
}

export default TransactionsRepository;
