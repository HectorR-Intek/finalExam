import { flatten, flattenFunctional } from "./flatten";

const oldObj = {
  name: "Sara",
  gender: "Apache Attack Helicopter",
  address: {
    location: {
      city: "SF",
      state: "CA",
    },
    preferredLocation: {
      city: "SF",
      state: ["CA", "MN"],
    },
    other: undefined,
  },
};

console.log(JSON.stringify(flatten(oldObj, "oldObj")));

console.log(JSON.stringify(flattenFunctional(oldObj, "oldObj")));
/**
 *  expected output:
 *  {
 *    oldObj_name: 'Sara',
 *    oldObj_gender: 'Apache Attack Helicopter',
 *    oldObj_address_location_city: 'SF',
 *    oldObj_address_location_state: 'CA',
 *    oldObj_address_preferredLocation_state: 'SF',
 *    oldObj_address_preferredLocation_city: ['CA', 'MN'],
 *    oldObj_address_other: undefined
 *  }
 */
