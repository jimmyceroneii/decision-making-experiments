import * as fs from 'fs';
import { shuffleList } from './randomizer';

const main = async () => {
  const filePath: string = 'src/movies.txt'

  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    const movies: string[] = fileContent.split('\n')

    const randomMovie = shuffleList(movies)[0];

    console.log('Movie: ', randomMovie);
  } catch (error) {
    console.error(`Error with the random movie: ${error}`)
  }
}

main()