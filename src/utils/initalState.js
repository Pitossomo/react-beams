const x0 = Math.random()*2
export const initialState = {
  // Properties
  length: 10,
  young: 25,
  width: 0.14,
  height: 0.30,
  
  // Design Properties
  fck: 20,
  cover: 0.02,
  loadIncrease: 1.4,
  
  // Supports
  supports: [0, 3.3, 6.7, 10],
  
  // Loads
  distributedLoads: [{
    startValue: Math.random()*10,
    endValue: Math.random()*10,
    x0: x0,
    xf: Math.min(x0 + Math.random()*10,10) 
  }],
  punctualLoads: [{
    value: Math.random()*10,
    x: Math.random()*10
  }]
}