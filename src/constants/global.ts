export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];
export const manageDepartmentOptions = [
  {
    label: "HR & Admin",
    value: "hr",
  },
  {
    label: "Finance",
    value: "Finance",
  },
  {
    label: "Manager",
    value: "manager",
  },
];

export const bloodGroupOptions = [
  {
    label: "A+",
    value: "a+",
  },
  {
    label: "A-",
    value: "a-",
  },
  {
    label: "B+",
    value: "b+",
  },
  {
    label: "B-",
    value: "b-",
  },
  {
    label: "AB+",
    value: "ab+",
  },
  {
    label: "AB-",
    value: "ab-",
  },
  {
    label: "O+",
    value: "o+",
  },
  {
    label: "O-",
    value: "o-",
  },
];

export const academicDepartmentOptions = [
  {
    label: "Computer Science",
    value: "computer_science",
  },
  {
    label: "Biology",
    value: "biology",
  },
  {
    label: "History",
    value: "history",
  },
  {
    label: "Mathematics",
    value: "mathematics",
  },
  {
    label: "Physics",
    value: "physics",
  },
  {
    label: "Psychology",
    value: "psychology",
  },
  {
    label: "Economics",
    value: "economics",
  },
  {
    label: "English Literature",
    value: "english_literature",
  },
];

export const academicSemesterOptions = [
  {
    label: "Fall Semester",
    value: "fall",
  },
  {
    label: "Spring Semester",
    value: "spring",
  },
  {
    label: "Summer Semester",
    value: "summer",
  },
  {
    label: "Winter Semester",
    value: "winter",
  },
];

export const academicFacultyOptions = [
  {
    label: "Faculty of Science",
    value: "science",
  },
  {
    label: "Faculty of Arts and Humanities",
    value: "arts_humanities",
  },
  {
    label: "Faculty of Engineering",
    value: "engineering",
  },
  {
    label: "Faculty of Business and Economics",
    value: "business_economics",
  },
  {
    label: "Faculty of Social Sciences",
    value: "social_sciences",
  },
  {
    label: "Faculty of Health Sciences",
    value: "health_sciences",
  },
  {
    label: "Faculty of Education",
    value: "education",
  },
  {
    label: "Faculty of Law",
    value: "law",
  },
];

export const semesterOptions = [
  {
    label: "Autumn",
    value: "Autumn",
  },
  {
    label: "Summer",
    value: "Summer",
  },
  {
    label: "Fall",
    value: "Fall",
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = months.map((month) => {
  return {
    label: month,
    value: month,
  };
});

const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];

export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});

const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];

export const semesterRegistrationStatusOptions = semesterRegistrationStatus.map(
  (status: string) => {
    return {
      label: status,
      value: status,
      disabled: false,
    };
  }
);

export enum ExamType {
  FINAL = "FINAL",
  MIDTERM = "MIDTERM",
}
