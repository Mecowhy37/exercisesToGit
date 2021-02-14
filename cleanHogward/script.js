"use strict";
window.addEventListener("load", setUp);
async function setUp() {
  const res = await fetch("https://petlatkea.dk/2021/hogwarts/students.json");
  const data = await res.json();
  createList(data);
}
let students = []
const StudentProto = {
  firstName: "",
  midName: "",
  lastName: "",
  nickName: "",
  photo: "",
  house: "",
};
function createList(jsonData) {
  console.log(jsonData);
  jsonData.forEach((jsonObj) => {
    const fullName = jsonObj.fullname.trim().toLowerCase().split(" ");
    const firstName = fullName[0][0].toUpperCase() + fullName[0].slice(1)
    let lastName = fullName[fullName.length - 1][0].toUpperCase() + fullName[fullName.length - 1].slice(1)
    if (lastName.includes("-")) {
      const hyphen = lastName.indexOf("-");
      lastName = lastName.replace(lastName[hyphen + 1], lastName[hyphen + 1].toUpperCase());
    }
    let nickName = "";
    let midName = "";
    if (fullName.length == 3) {
      if (fullName[1].includes('"')) {
        nickName = fullName[1][1].toUpperCase() + fullName[1].slice(2).replace('"', "").replace('"', "")
      } else {
        midName = fullName[1][0].toUpperCase() + fullName[1].slice(1)
      }
    }
    const house = jsonObj.house.toLowerCase().trim()

    let student = Object.create(StudentProto)
    student.firstName = firstName;
    student.midName = midName;
    student.lastName = lastName;
    student.nickName = nickName;
    student.house = house[0].toUpperCase() + house.slice(1)
    students.push(student)
  });
  console.table(students)
}
