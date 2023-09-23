export function objectsDifferAtPaths(obj1: NestedObject, obj2: NestedObject, paths: string[]): boolean {
  for (let path of paths) {
      let val1 = getNestedValue(obj1, path);
      let val2 = getNestedValue(obj2, path);
      if (typeof val1 === 'object' && typeof val2 === 'object') {
          if (objectsDiffer(val1, val2)) return true;
      } else if (val1 !== val2) {
          return true;
      }
  }
  return false;
}

type NestedObject = {
  [key: string]: any;
};

function getNestedValue(obj: NestedObject | any[], path: string): any {
  const parts = path.split(/[\.\[\]]/).filter(Boolean);  // Split path on '.' and '[' and filter out empty parts and ']'
  return parts.reduce((acc: any, part: string) => {
      let index = isNaN(Number(part)) ? part : parseInt(part); // Convert array index to integer
      return acc ? acc[index] : undefined; // If acc is undefined at any step, return undefined
  }, obj);
}

function arraysDiffer(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) return true;
  for (let i = 0; i < arr1.length; i++) {
      if (typeof arr1[i] === 'object' && typeof arr2[i] === 'object') {
          if (objectsDiffer(arr1[i], arr2[i])) return true;
      } else if (arr1[i] !== arr2[i]) {
          return true;
      }
  }
  return false;
}

function objectsDiffer(obj1: NestedObject, obj2: NestedObject): boolean {
  for (let key in obj1) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
              if (arraysDiffer(obj1[key], obj2[key])) return true;
          } else if (objectsDiffer(obj1[key], obj2[key])) {
              return true;
          }
      } else if (obj1[key] !== obj2[key]) {
          return true;
      }
  }
  return false;
}
