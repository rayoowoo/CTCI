// 6.1 The Heavy Pill
// You have 20 bottles of pills. 19 bottles have 1.0 gram pills, but one has pills of weight 1.1 grams.
// Given a scale that provides an exact measurement, how would you find the heavy bottle? 
// You can only use the scale once. 

// Assuming we know the measurements of the bottles (or that they are all the same), we can load the
// bottles on one at a time, until we load a bottle on that increases the weight by more than expected.
// That should be the heavy bottle.

