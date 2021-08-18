interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface Args {
//   dailyTrainingHrs: Array<number>;
//   targetHrs: number;
// }

// const parseArguments = (args: Array<string>): Args => {
//   if (args.length < 4) throw new Error('Not enough arguments');

//   return {
//     dailyTrainingHrs: args.slice(3, args.length).map(Number),
//     targetHrs: Number(args[2])
//   }
// }

export const calculateExercise = (dailyTrainingHrs: Array<number>, targetHrs: number): TrainingResult => {
  const noOfTrainingDays = dailyTrainingHrs.reduce((acc, cur) => cur > 0 ? acc + 1 : acc, 0);
  const average = dailyTrainingHrs.reduce((acc, cur) => acc + cur, 0) / dailyTrainingHrs.length;
  return {
    periodLength: dailyTrainingHrs.length,
    trainingDays: noOfTrainingDays,
    success: average >= targetHrs,
    rating: 2,
    ratingDescription: "to edit",
    target: targetHrs,
    average: average
  };
};

// try {
//   const { dailyTrainingHrs, targetHrs } = parseArguments(process.argv);
//   console.log(calculateExercise(dailyTrainingHrs, targetHrs));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }
