const fullName = "mikolaj piotr kozak";

const result = getNameParts(fullName);
console.log(result);

function getNameParts(fullName) {
  const firstSpace = fullName.indexOf(" ");
  const lastSpace = fullName.lastIndexOf(" ");
  const firstName = capitalize(fullName.substring(0, firstSpace).trim());
  const middleName = capitalize(fullName.substring(firstSpace, lastSpace).trim());
  const lastName = capitalize(fullName.substring(lastSpace).trim());
  return { firstName, middleName, lastName };
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
