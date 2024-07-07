import { ICourseMarks, IResult } from "./enrolledCourse.interface";

export const calculateTotalMarks = (marks: ICourseMarks): number => {
  return marks.classTest1 + marks.midTerm + marks.classTest2 + marks.finalTerm;
};

export const calculatePercentage = (totalMarks: number): number => {
  const maxTotalMarks = 20 + 60 + 40 + 90;
  return (totalMarks / maxTotalMarks) * 100;
};

export const calculateGradeAndPoint = (percentage: number): IResult => {
  if (percentage >= 95) {
    return { grade: "A+", gradePoint: 4.0 };
  } else if (percentage >= 90) {
    return { grade: "A", gradePoint: 4.0 };
  } else if (percentage >= 85) {
    return { grade: "A-", gradePoint: 3.7 };
  } else if (percentage >= 80) {
    return { grade: "B+", gradePoint: 3.3 };
  } else if (percentage >= 75) {
    return { grade: "B", gradePoint: 3.0 };
  } else if (percentage >= 70) {
    return { grade: "B-", gradePoint: 2.7 };
  } else if (percentage >= 65) {
    return { grade: "C+", gradePoint: 2.3 };
  } else if (percentage >= 60) {
    return { grade: "C", gradePoint: 2.0 };
  } else if (percentage >= 55) {
    return { grade: "C-", gradePoint: 1.7 };
  } else if (percentage >= 50) {
    return { grade: "D", gradePoint: 1.0 };
  } else {
    return { grade: "F", gradePoint: 0.0 };
  }
};
