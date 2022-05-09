export const responseMap: Map<number, string> = new Map([
    [-2, 'Strongly Disagree'],
    [-1, 'Disagree'],
    [0, 'Neutral'],
    [1, 'Agree'],
    [2, 'Strongly Agree']
]);
export interface SurveyResponse {
    id: string;
    question_id: string;
    employee_id: string;
    score: number;
}
