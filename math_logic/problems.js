// 6.1 The Heavy Pill
// You have 20 bottles of pills. 19 bottles have 1.0 gram pills, but one has pills of weight 1.1 grams.
// Given a scale that provides an exact measurement, how would you find the heavy bottle? 
// You can only use the scale once. 

// Assuming we know the measurements of the bottles (or that they are all the same), we can load the
// bottles on one at a time, until we load a bottle on that increases the weight by more than expected.
// That should be the heavy bottle.

// 6.2 Basketball
// You have a basketball hoop and someone says that you can play one of two games.
//     Game 1: You get one shot to make the hoop.
//     Game 2: You get three shots and you have to make two of three shots.
// If p is the probability of making a particular shot, for which values of p should you pick one game or the other ?
 
// Basically, we have to calculate the probability of missing 0 or 1 balls. That's fairly simple: (1-p) per ball, 
// so p(1-p)2 for missing 1 ball and (1-p)3 for missing all the balls. Then, we need to find when that is greater
// than p. When we plot the resultant equation, 1 - 3p + p2, on a graph, we find that y is greater than 0 when 
// p is less than 0.382. Therefore, if p < 0.382, we should take the three shots.

