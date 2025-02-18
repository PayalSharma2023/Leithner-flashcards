import { REVIEW_INTERVALS } from "../utils/constants";

export const getNextReviewDate = (level) => {
  const daysToAdd = REVIEW_INTERVALS[level] || 1;
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + daysToAdd);
  return nextReview.toISOString().split("T")[0];
};
