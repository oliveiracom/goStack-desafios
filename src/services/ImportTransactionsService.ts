import csvParse from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';

interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream('filePath');

    const parsers = csvParse({
      delimiter: ',',
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line =>{
      const { title, type, value, category } = line.map(
        (cell: string) => cell.trim()
      );

      //checa se algum não existir -> pula
      if (!title || !type || !value ) return;

      categories.push(category);

      transactions.push ({
        title,
        type,
        value,
        category
      });

      //checa se chegou no fim do parseCSV
      await new Promise (resolve => parseCSV.on('end', resolve));

      //checar se categorias existem ou não pra mandar pro banco

      //return {categories, transactions };

    })

    
  }
}

export default ImportTransactionsService;
