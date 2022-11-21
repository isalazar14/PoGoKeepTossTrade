function x(settings) {
  const { context, canvas, constants: incomingConstants } = settings;
  const output = new Int32Array([4096,1]);
  const _constantTypes = {};
  const _constants = {  };
  for (const p in _constantTypes) {
    if (!_constantTypes.hasOwnProperty(p)) continue;
    const type = _constantTypes[p];
    switch (type) {
      case 'Number':
      case 'Integer':
      case 'Float':
      case 'Boolean':
      case 'Array(2)':
      case 'Array(3)':
      case 'Array(4)':
      case 'Matrix(2)':
      case 'Matrix(3)':
      case 'Matrix(4)':
        if (incomingConstants.hasOwnProperty(p)) {
          console.warn('constant ' + p + ' of type ' + type + ' cannot be resigned');
        }
        continue;
    }
    if (!incomingConstants.hasOwnProperty(p)) {
      throw new Error('constant ' + p + ' not found');
    }
    _constants[p] = incomingConstants[p];
  }
  const kernel = (function() {
  const LOOP_MAX =  1000;;
  
  const _this = this;
    const outputX = _this.output[0];
    const outputY = _this.output[1];
    const result = new Array(outputY);
    
    
    for (let y = 0; y < outputY; y++) {
      const resultX = result[y] = new Array(outputX);
      
    }
  
  return (user_cpLimit, user_pokeForms, user_ivs, user_cpms, user_lastCpmIdx) => {
    
    
        user_pokeForms = user_pokeForms.value;
    user_ivs = user_ivs.value;
    user_cpms = user_cpms.value;

      const outputX = _this.output[0];
    const outputY = _this.output[1];
    for (let y = 0; y < outputY; y++) {
      this.thread.z = 0;
      this.thread.y = y;
      const resultX = result[y];
      
      for (let x = 0; x < outputX; x++) {
        this.thread.x = x;
        debugger;
const user_x=_this.thread.x,user_y=_this.thread.y;
const user_atkBaseIdx=2,user_defBaseIdx=3,user_staBaseIdx=4;
const user_atkIvIdx=1,user_defIvIdx=2,user_staIvIdx=3;
const user_a=(user_pokeForms[(user_y*5)+user_atkBaseIdx]+user_ivs[(user_x*4)+user_atkIvIdx]);
const user_d=(user_pokeForms[(user_y*5)+user_defBaseIdx]+user_ivs[(user_x*4)+user_defIvIdx]);
const user_s=(user_pokeForms[(user_y*5)+user_staBaseIdx]+user_ivs[(user_x*4)+user_staIvIdx]);
const user_calcCpm=Math.sqrt((((user_cpLimit+0.9999999)*10)/((user_a*Math.sqrt(user_d))*Math.sqrt(user_s))));
let user_i=user_lastCpmIdx;
for (let i = 0; i < LOOP_MAX; i++) {if (((user_i>-1)&&(user_calcCpm<user_cpms[(user_i*2)+1]))) {
{
user_i--;}
} else {
break;
}
}

const user_cpm=user_cpms[(user_i*2)+1];
const user_A=(user_a*user_cpm);
const user_D=(user_d*user_cpm);
const user_hp=Math.floor((user_s*user_cpm));
const user_cp=Math.max(10, (((((user_a*Math.sqrt(user_d))*Math.sqrt(user_s))*Math.pow(user_cpm, 2))/10)>>0));
const user_sp=Math.round(((user_A*user_D)*user_hp));
resultX[x] = new Float32Array([user_y, user_x, user_cpms[(user_i*2)+1], user_sp]);
continue;
      }
    }
    return result;
    
  };
  })
    .apply({     constants: _constants,
    context,
    output,
    thread: {x: 0, y: 0, z: 0}, });
  
  return kernel;
}