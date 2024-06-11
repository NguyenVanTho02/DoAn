import { baseService } from "./baseService";

export class ReportService extends baseService {
  getRevenueByDayOfMonth = (revenueVm) => {
    return this.post(`Report/RevenueByDayOfMonth`, revenueVm);
  };
  getTopMovieByRevenue = () => {
    return this.get(`Report/TopMovieByRevenue`);
  };
}

export const reportService = new ReportService();
