// interface Details {
//   height: number;
//   weight: number;
// }

// const parseArguments = (args: Array<string>): Details => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }

export const calculateBmi = (height: number, weight: number): string => {
  height = height / 100;
  const bmi: number = weight / (height * height);
  if (bmi < 18.5) {
    return 'Underweight';
  }
  else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal weight';
  }
  else {
    return 'Overweight';
  }
};

// try {
//   const { height, weight } = parseArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }
