using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.ShowModel
{
    public class ShowInfoResult
    {
        public MovieInfomation MovieInfo { get; set; }
        public List<ShowSeatViewModel> listShowSeat { get; set; }

    }
    public class MovieInfomation
    {
        public int ShowID { get; set; }
        public DateTime ShowDate { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string CinemaName { get; set; }
        public string TheaterName { get; set; }
        public string CinemaAddress { get; set; }
        public string MovieName { get; set; }
    }
    public class ShowSeatViewModel
    {
        public int ShowSeatID { get; set; }
        public int ShowID { get; set; }
        public int SeatID { get; set; }
        public string SeatName { get; set; }
        public string? SeatType { get; set; }
        public int? BookingID { get; set; }
        public int SeatStatus { get; set; }
        public int Price { get; set; }
    }
}
