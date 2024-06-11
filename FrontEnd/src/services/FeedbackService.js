import { baseService } from "./baseService";

export class FeedbackService extends baseService {
  createFeedback = (feedbackVm) => {
    return this.post(`Feedback/CreateFeedback`, feedbackVm);
  };
  getFeedbacks = (param) => {
    return this.get(`Feedback/Feedbacks?${param}`);
  };
}

export const feedbackService = new FeedbackService();
